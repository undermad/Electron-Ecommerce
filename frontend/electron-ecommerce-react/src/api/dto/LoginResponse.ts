export class LoginResponse {
    token: string;
    tokenType: string;
    roles: string[];
    accountStatus: string;

    constructor(token: string, tokenType: string, roles: string[], accountStatus: string) {
        this.token = token;
        this.tokenType = tokenType;
        this.roles = roles;
        this.accountStatus = accountStatus;
    }
}