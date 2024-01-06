export class LoginResponse {
    token: string;
    tokenType: string;
    roles: string[];

    constructor(token: string, tokenType: string, roles: string[]) {
        this.token = token;
        this.tokenType = tokenType;
        this.roles = roles;
    }
}