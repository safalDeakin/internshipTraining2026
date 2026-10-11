export interface ObservableRepository {
    subscribe(
        listener: () => void
    ): () => void;
}