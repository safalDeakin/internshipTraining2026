export type DataChange<T, ID> =
    { type: "created"; data: T }
    | { type: "updated"; data: T }
    | { type: "deleted"; id: ID };


export type DataChangeListener<T, ID> =
    (change: DataChange<T, ID>) => void;

export interface IDataSource<T, ID = string> {
    getAll(): Promise<T[]>;
    getById(id: ID): Promise<T | null>;

    create(data: T): Promise<boolean>;
    update(id: ID, changes: Partial<T>): Promise<boolean>;
    delete(id: ID): Promise<boolean>;
    subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void>;

}