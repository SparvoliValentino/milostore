export interface IProducto {
    id: string;
    productName: string;
    price: number;
    images: string[];
    category?:string;
    descripcion?:string;
    cantidad?:number;
    stock?:boolean;
}