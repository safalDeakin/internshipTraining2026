
import { useCallback, useEffect, useState } from "react";
import { type DataChangeListener } from "../utils/repo/models/DataSource"


export interface QueryService<T, ID> {
    getAll(): Promise<T[]>;

    subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void>;
}

export function useSubscription<T, ID>(
    queryService: QueryService<T, ID>
) {
    const [data, setDataList] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const refresh = useCallback(async () => {
        try {
            const result = await queryService.getAll();
            setDataList(result);
            setError(null);
        } catch (err) {
            setError(err);
            throw err;
        }
    }, [queryService]);

    useEffect(() => {
        let active = true;
        let unsubscribe: (() => void) | undefined;

        async function setup() {
            setLoading(true);

            try {
                // Subscribe first to avoid missing changes during loading.
                const cleanup = await queryService.subscribe(() => {
                    if (active) {
                        void refresh().catch(() => {
                            // Error state is already set by refresh().
                        });
                    }
                });

                if (!active) {
                    cleanup();
                    return;
                }

                unsubscribe = cleanup;

                const result = await queryService.getAll();

                if (active) {
                    setDataList(result);
                    setError(null);
                }
            } catch (err) {
                if (active) {
                    setError(err);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void setup();

        return () => {
            active = false;
            unsubscribe?.();
        };
    }, [queryService, refresh]);

    return {
        data,
        loading,
        error,
        refresh
    };
}