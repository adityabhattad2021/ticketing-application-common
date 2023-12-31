import { Subjects } from "./subjects";

export interface PaymentCreatedEvent {
    subject:Subjects.PaymentCreated;
    data:{
        orderId:string,
        price:number
    }
}