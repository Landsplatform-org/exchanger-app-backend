"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeBankAccounts = void 0;
function mergeBankAccounts(data) {
    let accounts = [];
    for (const item of data) {
        accounts.push(item.account);
    }
    const result = Object.assign(Object.assign({}, data[0]), { account: accounts });
    return result;
}
exports.mergeBankAccounts = mergeBankAccounts;
