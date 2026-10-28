import { Repository } from "../../utils/repo/Repository";

class CommandService<T extends object, ID> {
    constructor(
        private readonly source: Repository<T, ID>
    ) { }

    async create(data: T): Promise<boolean> {
        console.log("Cmd Service Processing")
        return this.source.create(data);
    }

    async update(
        id: ID,
        changes: Partial<T>
    ): Promise<boolean> {
        console.log("Cmd Service Processing")
        return this.source.update(id, changes);
    }

    async delete(id: ID): Promise<boolean> {
        console.log("Cmd Service Processing")
        return this.source.delete(id);
    }
}

export default CommandService;