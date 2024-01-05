import { JetStreamClient } from "nats";
import { Subjects } from "./subjects";


interface Event {
    subject:Subjects;
    data:any;
}

export abstract class Publisher<T extends Event>{
    abstract subject: T['subject'];
    protected jsClient: JetStreamClient; 

    constructor(jsClient: JetStreamClient) { 
        this.jsClient = jsClient;
    }

    async publish(data: T['data']): Promise<void> {
        await this.jsClient.publish(`gittix.${this.subject}`, JSON.stringify(data));
        console.log('Event published to subject:', this.subject);
    }
}