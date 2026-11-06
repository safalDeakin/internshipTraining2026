export class InvalidDataError extends Error {
    readonly code = "INVALID_DATA";

    constructor(
        message = "The provided data is invalid.",
        options?: ErrorOptions
    ) {
        super(message, options);
    }
}