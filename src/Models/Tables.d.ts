export interface IColumnType<T> {
    key: string;
    title: string;
    width?: number | string;
    render?: (column: IColumnType<T>, item: T) => void;
    path?: string[];
    className?: string;
    tdClassName?: string;
    sortable?: boolean;
    defaultValue?: string;
    colSpan?: number;
    secondaryTitle?: string;
}
  
export interface IData {
    fullName: string;
    role: string;
    tags: string[];
    position?: object;
}
  