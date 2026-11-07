
/**
 * The requested entity does not exist.
 */
export class IdNotFoundError extends Error {
    readonly code = "ID_NOT_FOUND";

    constructor(
        public readonly entity: string,
        public readonly id: unknown
    ) {
        super(`${entity} with ID '${String(id)}' was not found.`);
    }
}
