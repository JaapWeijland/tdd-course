import { OrderService } from "./order.service";
import type {IProductService} from "./product.service";

const mockGetStock = jest.fn().mockReturnValue(25);
const mockGetRestockLevel = jest.fn().mockReturnValue(24);
const mockStockService = { getStock: mockGetStock, getRestockLevel: mockGetRestockLevel }

const mockSend = jest.fn();
const mockNotificationService = { send: mockSend }

const mockGetProduct = jest.fn().mockImplementation((id: string) => ({ id, stock: 25, leadTime: 14 }))
const mockProductService: IProductService = {
    getProduct: mockGetProduct
}

describe('buy a guitar', () => {

    let orderService: OrderService;
    let orderResult: boolean;

    beforeEach(() => {
        jest.clearAllMocks()
        orderService = new OrderService(mockProductService, mockNotificationService);
        orderResult = orderService.placeOrder({ id: "811", quantity: 1 });
    })

    it('should successfully place order', () =>{
        expect(orderResult).toBe(true)
    });

    it('should get stock', () =>{
        expect(mockGetProduct).toBeCalled()
    });

    it('should trigger notification when falling under restock level', () => {
        expect(mockSend).toBeCalledWith("Please order more of product 811")
    });

    describe('when not falling under the restock level', () => {
        beforeEach(() => {
            jest.clearAllMocks()
            mockGetProduct.mockReturnValue({ id: "811", stock: 26 })
            orderService = new OrderService(mockProductService, mockNotificationService);
            orderResult = orderService.placeOrder({ id: "811", quantity: 1 });
        })

        it('should not trigger notification when not falling under restock level', () => {
            expect(mockSend).not.toBeCalled()
        })
    })

});

describe("when a restock level is requested", () => {

    let orderService: OrderService;
    let orderResult: boolean;

    beforeEach(() => {
        jest.clearAllMocks()
        orderService = new OrderService(mockProductService, mockNotificationService);
        orderService.getRestockLevel("811");
    })

    it("should return the average sale level of the last 30 days", () => {
        const leadTime = 14;
        const averageSales = 15;

        const restockLevel = orderService.getRestockLevel("811");

        expect(restockLevel).toBe(7)
    });

    it("should return ", () => {

    })
})