import type { DataChangeListener, IDataSource } from "./models/DataSource";
import { InMemoryDataSource } from "./adapter/InMemoryDataSource";
import { HttpDataSource } from "./adapter/HttpDataSource";

export interface RepositoryConfig<T, ID> {
    sourceType: 'InMemoryLocal' | 'HttpApi' | 'GraphQLApi';
    remoteSourceType?: 'HttpApi' | 'GraphQLApi';
    getId: (item: T) => ID;
    domain: string;
    tenantId: string;
    initialData?: T[];
    baseUrl?: string;
    eventsUrl?: string;
}

export interface DomainContext {
    domain: string;
    tenantId?: string;
}

export class Repository<T extends object, ID> {
    private readonly source: IDataSource<T, ID>;
    private readonly config: RepositoryConfig<T, ID>;

    constructor(config: RepositoryConfig<T, ID>) {
        this.config = config;
        switch (this.config.sourceType) {
            case 'InMemoryLocal':
                this.source = new InMemoryDataSource<T, ID>(
                    config.getId,
                    config.initialData ?? []
                );
                break;

            case 'HttpApi':
                if (!this.config.baseUrl) {
                    throw new Error(
                        "baseUrl is required for HttpApi"
                    );
                }
                this.source = new HttpDataSource<T, ID>({
                    baseUrl: config.baseUrl!,
                    eventsUrl: config.eventsUrl!
                });
                break;

            case 'GraphQLApi':
                throw new Error(
                    "GraphQLApi has not been implemented yet"
                );

            default: {
                const exhaustiveCheck: never = this.config.sourceType;
                throw new Error(
                    `Unsupported data source: ${exhaustiveCheck}`
                );
            }
        }
    }

    async getAll(): Promise<T[]> {
        console.log("Error Source: Repository GET* function^")
        return this.source.getAll();
    }

    async getById(id: ID): Promise<T | null> {
        try {
            const data = await this.source.getById(id);
            return data
        } catch (error) {
            console.log("Error Source: Repository GET function^")
            console.log(error)
            throw error;
        }
    }

    async create(data: T): Promise<boolean> {
        try {
            const result = await this.source.create(data);
            return result
        } catch (error) {
            console.log("Error Source: Repository create function^")
            console.log(error)
            throw error;
        }
    }

    async update(id: ID, changes: Partial<T>): Promise<boolean> {
        try {
            const result = await this.source.update(id, changes);
            return result
        } catch (error) {
            console.log("Error Source: Repository Update function^")
            console.log(error)
            throw error;
        }

    }

    async delete(id: ID): Promise<boolean> {
        try {
            const result = await this.source.delete(id);
            return result
        } catch (error) {
            console.log("Error Source: Repository delete function^")
            console.log(error)
            throw error;
        }
    }

    async subscribe(
        listener: DataChangeListener<T, ID>
    ): Promise<() => void> {
        try {
            return await this.source.subscribe(listener);
        } catch (error) {
            console.log("Error Source: Repository subscribe function^")
            console.log(error)

            throw error;
        }
    }

}