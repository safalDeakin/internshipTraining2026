import type { DataChange, IDataSource, DataChangeListener } from "../models/DataSource";

export interface HttpDataSourceOptions {
    baseUrl: string;
    eventsUrl?: string;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
}



export class HttpDataSource<
    T extends object,
    ID = string
> implements IDataSource<T, ID> {
    private readonly listeners = new Set<
        (change: DataChange<T, ID>) => void
    >();

    private eventSource: EventSource | null = null;
    private connectionPromise: Promise<void> | null = null;

    constructor(
        private readonly options: HttpDataSourceOptions,
        private readonly fetcher: typeof fetch = fetch
    ) { }

    private url(id?: ID): string {
        const base = this.options.baseUrl.replace(/\/+$/, "");

        return id === undefined
            ? base
            : `${base}/${encodeURIComponent(String(id))}`;
    }

    private async request<R>(
        url: string,
        init: RequestInit = {}
    ): Promise<R> {
        const response = await this.fetcher(url, {
            ...init,
            credentials:
                init.credentials ?? this.options.credentials,
            headers: {
                Accept: "application/json",
                ...this.options.headers,
                ...init.headers
            }
        });

        if (!response.ok) {
            const message = await response.text();

            throw new Error(
                `HTTP ${response.status}: ${message || response.statusText}`
            );
        }

        if (response.status === 204) {
            return undefined as R;
        }

        return response.json() as Promise<R>;
    }

    async getAll(): Promise<T[]> {
        return this.request<T[]>(this.url());
    }

    async getById(id: ID): Promise<T | null> {
        return this.request<T | null>(this.url(id));
    }

    async create(data: T): Promise<boolean> {
        const saved = await this.request<T>(this.url(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        this.publish({ type: "created", data: saved });

        return true;
    }

    async update(
        id: ID,
        changes: Partial<T>
    ): Promise<boolean> {
        const updated = await this.request<T>(this.url(id), {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changes)
        });

        this.publish({ type: "updated", data: updated });

        return true;
    }

    async delete(id: ID): Promise<boolean> {
        await this.request<void>(this.url(id), {
            method: "DELETE"
        });

        this.publish({ type: "deleted", id });
        return true;
    }

    async subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void> {
        this.listeners.add(listener);

        try {
            await this.connectEvents();
        } catch (error) {
            this.listeners.delete(listener);

            if (this.listeners.size === 0) {
                this.eventSource?.close();
                this.eventSource = null;
                this.connectionPromise = null;
            }

            throw error;
        }

        let subscribed = true;

        return () => {
            if (!subscribed) return;
            subscribed = false;

            this.listeners.delete(listener);

            if (this.listeners.size === 0) {
                this.eventSource?.close();
                this.eventSource = null;
                this.connectionPromise = null;
            }
        };
    }

    private async connectEvents(): Promise<void> {
        if (!this.options.eventsUrl) {
            throw new Error(
                "eventsUrl is required for HTTP event subscriptions"
            );
        }

        if (typeof EventSource === "undefined") {
            throw new Error(
                "EventSource is not supported in this environment"
            );
        }

        if (this.eventSource?.readyState === EventSource.OPEN) {
            return;
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        const eventSource = new EventSource(
            this.options.eventsUrl,
            {
                withCredentials:
                    this.options.credentials === "include"
            }
        );

        this.eventSource = eventSource;

        this.connectionPromise = new Promise<void>((resolve, reject) => {
            const cleanupHandlers = () => {
                eventSource.removeEventListener("open", handleOpen);
                eventSource.removeEventListener("error", handleInitialError);
            };

            const handleOpen = () => {
                cleanupHandlers();
                resolve();
            };

            const handleInitialError = () => {
                if (eventSource.readyState === EventSource.CONNECTING) {
                    // EventSource may retry automatically. Keep waiting
                    // for the initial connection to open.
                    return;
                }

                cleanupHandlers();
                eventSource.close();

                if (this.eventSource === eventSource) {
                    this.eventSource = null;
                    this.connectionPromise = null;
                }

                reject(new Error("Failed to establish SSE connection"));
            };

            eventSource.addEventListener("open", handleOpen);
            eventSource.addEventListener("error", handleInitialError);

            eventSource.onmessage = event => {
                try {
                    const change = JSON.parse(
                        event.data
                    ) as DataChange<T, ID>;

                    this.publish(change);
                } catch (error) {
                    console.error("Invalid repository event", error);
                }
            };
        });

        return this.connectionPromise;
    }


    private publish(change: DataChange<T, ID>): void {
        for (const listener of this.listeners) {
            try {
                listener(change);
            } catch (error) {
                console.error(
                    "HTTP datasource listener failed",
                    error
                );
            }
        }
    }
}