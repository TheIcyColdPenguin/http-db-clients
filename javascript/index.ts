import fetch from 'node-fetch';

interface ServerRes {
    name: string;
    data: string;
}

class Database {
    readonly dbUrl: string;
    readonly token: string;
    public data: any;

    constructor(dbUrl: string, token: string) {
        this.dbUrl = dbUrl.endsWith('/') ? dbUrl : dbUrl + '/';
        this.token = token;
        this.data = null;
    }

    private assembleRequest(type: 'get' | 'put') {
        return `${this.dbUrl}${type === 'get' ? 'data' : 'update'}?token=${this.token}`;
    }

    async fetchData() {
        const res = await fetch(this.assembleRequest('get'));
        if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}: ${await res.text()}`);
        }
        const resBody = (await res.json()) as ServerRes;

        this.data = JSON.parse(resBody.data);

        return this.data;
    }

    async updateData() {
        console.log({ data: this.data });

        const res = await fetch(this.assembleRequest('put'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: JSON.stringify(this.data) }),
        });

        if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}: ${await res.text()}`);
        }
    }
}
