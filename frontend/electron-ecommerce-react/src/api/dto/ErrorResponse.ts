export class ErrorResponse {
    message: string;
    date: string;
    description: string;

    constructor(message: string, date: string, description: string) {
        this.message = message;
        this.date = date;
        this.description = description;
    }
}