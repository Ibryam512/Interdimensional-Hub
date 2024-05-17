export interface ListResponse<T> {
    info: Info;
    results: T[];
}

interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}