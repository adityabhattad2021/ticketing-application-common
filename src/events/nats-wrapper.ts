import nats from "nats";


export class NatsWrapper{
    private _client?: nats.NatsConnection;
    private _jsClient?: nats.JetStreamClient;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting.');
        }
        return this._client;
    }

    get jsClient() {
        if (!this._jsClient) {
            throw new Error('Cannot access JetStream client before connecting.');
        }
        return this._jsClient;
    }


    connect(url: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this._client = await nats.connect({ servers: url });

                this._jsClient = this.client.jetstream();

                console.log('Successfully connected to NATS and initialized JetStream.');
                resolve();
            } catch (err) {
                console.error('Error in NATS connection: ', err);
                reject(err);
            }
        });
    }
}