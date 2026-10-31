
import { type DataChangeListener } from "../../utils/repo/models/DataSource";
import { Repository } from "../../utils/repo/Repository";

class QueryService<T extends object, ID> {

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