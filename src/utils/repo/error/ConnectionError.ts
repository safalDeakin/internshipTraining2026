export class ConnectionError extends Error {
    readonly code = "CONNECTION_ERROR";

    constructor(
        message = "The data source is currently unavailable.",
        options?: ErrorOptions
    ) {
        super(message, options);
    }
}