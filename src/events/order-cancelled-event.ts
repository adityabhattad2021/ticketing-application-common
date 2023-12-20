import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
    subject:Subjects.OrderCancelled;
    data:{
        id:string;
        status:string;
        userId:string;
        expiresAt:string;
        ticket:{
            id:string;
            price:number;
        }
    }
}