export type Product = {
    id: string;
    stock: number;
    leadTime: number;
}

export interface IProductService {
    getProduct(id: string): Product
}