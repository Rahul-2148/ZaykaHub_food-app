export type CheckoutSessionRequest = {
    cartItems:{
        menuId:string;
        name:string;
        image:string;
        price:string;
        quantity:string;
    }[];
    deliveryDetails:{
        name:string;
        email:string;
        contact:string;
        address:string;
        city:string;
        country:string;
        postalCode:string;
    },
    restaurantId:string;
    totalAmount: number;
    orderedDate: Date;
}
export interface Orders extends CheckoutSessionRequest {
    _id:string;
    status:string;
    totalAmount:number;
    orderedDate:Date;
    expectedDeliveryTime:string;
}
export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;
}