export class LocalStore {
    private listeners = new Set<() => void>();

    subscribe(listener: () => void) {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    protected notify() {
        this.listeners.forEach((listener) => {
            listener();
        });
    }
}