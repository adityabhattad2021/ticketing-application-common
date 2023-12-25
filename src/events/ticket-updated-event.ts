import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
    subject:Subjects.TicketUpdated;
    data:{
        id:string;
        title:string;
        userId:string;
        price:number;
        version:number;
        orderId:string|undefined;
    }
}