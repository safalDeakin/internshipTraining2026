import type { DataChange, IDataSource, DataChangeListener } from "../models/DataSource";

export class InMemoryDataSource<
    T extends object,
    ID = string
> implements IDataSource<T, ID> {
    private readonly items = new Map<ID, T>();
    private readonly listeners = new Set<
        (change: DataChange<T, ID>) => void
    >();

    constructor(
        private readonly getId: (item: T) => ID,
        initialData: T[] = []
    ) {
        for (const item of initialData) {
            const id = this.getId(item);

            if (this.items.has(id)) {
                throw new Error("Duplicate entity ID in initial data");
            }

            this.items.set(id, { ...item });
        }
    }

    async getAll(): Promise<T[]> {
        return [...this.items.values()].map(item => ({ ...item }));
    }

    async getById(id: ID): Promise<T | null> {
        const item = this.items.get(id);
        return item ? { ...item } : null;
    }

    async create(data: T): Promise<boolean> {
        const id = this.getId(data);
        if (this.items.has(id)) {
            throw new Error("Entity already exists");
        }

        const saved = { ...data };
        this.items.set(id, saved);
        this.notify({ type: "created", data: { ...saved } });
        console.log(this.items.size)
        return true;
    }

    async update(
        id: ID,
        changes: Partial<T>
    ): Promise<boolean> {
        const existing = this.items.get(id);

        if (!existing) {
            throw new Error("Entity not found");
        }

        const updated = { ...existing, ...changes };

        if (this.getId(updated) !== id) {
            throw new Error("Updating an entity ID is not allowed");
        }

        this.items.set(id, updated);
        this.notify({
            type: "updated",
            data: { ...updated }
        });

        return true;
    }

    async delete(id: ID): Promise<boolean> {
        if (!this.items.has(id)) {
            throw new Error("Entity not found");
        }

        this.items.delete(id);
        console.log(this.items.size)
        this.notify({ type: "deleted", id });
        return true;
    }



    async subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void> {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify(change: DataChange<T, ID>): void {
        for (const listener of this.listeners) {
            try {
                listener(change);
            } catch (error) {
                console.error("Data change listener failed:", error);
            }

        }
    }
}