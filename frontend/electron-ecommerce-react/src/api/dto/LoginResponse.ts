export class LoginResponse {
    accessToken: string;
    tokenType: string;
    roles: string[];

    constructor(accessToken: string, tokenType: string, roles: string[]) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.roles = roles;
    }
}