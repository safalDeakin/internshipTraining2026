export class SubscriptionFailed extends Error {
    readonly code = "SUBSCRIPTION_FAILED";

    constructor(
        message = "The provided data is invalid.",
        options?: ErrorOptions
    ) {
        super(message, options);
    }
}