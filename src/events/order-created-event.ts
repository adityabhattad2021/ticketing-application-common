import { OrderStatus } from "./order-status";
import { Subjects } from "./subjects";

export interface OrderCreatedEvent {
    subject:Subjects.OrderCreated;
    data:{
        id:string;
        status:OrderStatus;
        userId:string;
        expiresAt:string;
        version:number;
        ticket:{
            id:string;
            price:number;
        }
    }
}