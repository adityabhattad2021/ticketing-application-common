import { Subjects } from "./subjects";

export interface OrderCreatedEvent {
    subject:Subjects.OrderCreated;
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