export class ChangeForgottenPasswordRequest {
    newPassword: string;
    reNewPassword: string;

    constructor(newPassword: string, reNewPassword: string) {
        this.newPassword = newPassword;
        this.reNewPassword = reNewPassword;
    }
}