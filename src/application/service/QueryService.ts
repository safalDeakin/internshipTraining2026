
import { DataChangeListener } from "../../infra/models/DataSource";
import { Repository } from "../../infra/Repository";

class QueryService<T extends Object, ID> {

    constructor(private readonly source: Repository<T, ID>) { };

    async getByID(entityId: ID): Promise<T | null> {
        return this.source.getById(entityId);
    }

    async getAll(): Promise<T[]> {
        return this.source.getAll();
    }

    async subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void> {
        return this.source.subscribe(listener);
    }

}

export default QueryService;