import fetch from 'node-fetch';
export class Database {
    constructor(dbUrl, token) {
        this.dbUrl = dbUrl.endsWith('/') ? dbUrl : dbUrl + '/';
        this.token = token;
        this.data = null;
    }
    assembleRequest(type) {
        return `${this.dbUrl}${type === 'get' ? 'data' : 'update'}?token=${this.token}`;
    }
    async fetchData() {
        const res = await fetch(this.assembleRequest('get'));
        if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}: ${await res.text()}`);
        }
        const resBody = (await res.json());
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
