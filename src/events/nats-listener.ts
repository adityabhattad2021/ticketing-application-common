import { JSONCodec, JetStreamClient, JsMsg, consumerOpts } from "nats";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event>{
    abstract subject: T['subject']
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: JsMsg): void;
    protected jsClient: JetStreamClient;
    protected ackWait = 5 * 1000;

    constructor(jsClient: JetStreamClient) {
        this.jsClient = jsClient;
    }


    subscriptionOptions() {
        let consumerOptions = consumerOpts()
            .manualAck()
            .ackWait(this.ackWait)
            .durable(this.queueGroupName)
            .deliverGroup(this.queueGroupName)
            .deliverTo(this.queueGroupName)
            .deliverNew();
        return consumerOptions;
    }

    async listen() {
        const subscription = await this.jsClient.subscribe(`gittix.${this.subject}`, this.subscriptionOptions());


        for await (const msg of subscription) {
            console.log(`Message received: ${this.subject}/${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        }
    }

    parseMessage(msg: JsMsg) {
        const data = msg.data;
        return String(data);
    }
}