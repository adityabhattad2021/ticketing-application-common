import { JetStreamClient, JSONCodec } from "nats";
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
        const codec = JSONCodec();
        await this.jsClient.publish(this.subject, codec.encode(data));
        console.log('Event published to subject:', this.subject);
    }
}