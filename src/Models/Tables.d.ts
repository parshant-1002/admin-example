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

export interface ColumnData {
    title?: string;
    fieldName?: string;
    isTruncated?: boolean;
    sortable?: boolean;
    sortType?: string;
    render?: (
      row: ProductResponsePayload,
      val: string | number
    ) => JSX.Element[] | string | JSX.Element | string[];
  }
  
export interface IData {
    fullName: string;
    role: string;
    tags: string[];
    position?: object;
}
  