
export interface Book {
    id: string,
    name: string,
    price: number
}

declare var Book: {
    new (value?: any): Object
    (): any;
    (value: any): any;
}
