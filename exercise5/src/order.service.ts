import type {IProductService} from "./product.service";

interface INotificationService {
    send(message: string): boolean;
}

export interface IOrderService {
    getRestockLevel(id: string): number;
}

export class OrderService implements IOrderService {
    constructor(private productService: IProductService, private notificationService: INotificationService) {}

    placeOrder(sale: { id: string; quantity: number; }) {
        const getStock = this.productService.getProduct(sale.id).stock;
        if ((getStock - sale.quantity) <= this.getRestockLevel(sale.id)) {
            this.notificationService.send("Please order more of product " + sale.id);
        }
        return true 
    }

    getRestockLevel(id: string): number {
        return 7;
    }
}