var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
class Database {
    constructor(dbUrl, token) {
        this.dbUrl = dbUrl.startsWith('/') ? dbUrl : dbUrl + '/';
        this.token = token;
    }
    assembleRequest(type) {
        return `${this.dbUrl}${type === 'get' ? 'data' : 'update'}?token=${this.token}`;
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.assembleRequest('get'));
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}: ${yield res.text()}`);
            }
            const resBody = (yield res.json());
            this.data = JSON.parse(resBody.data);
            return this.data;
        });
    }
    updateData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ data: this.data });
            const res = yield fetch(this.assembleRequest('put'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: JSON.stringify(this.data) }),
            });
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}: ${yield res.text()}`);
            }
        });
    }
}
