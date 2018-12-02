export interface Log {
    hide_logs(): void;
    show_logs(): void;
    error(object: string, message: any, throwE?: boolean): void;
    warning(object: string, message: any): void;
    info(object: string, message: any): void;
}