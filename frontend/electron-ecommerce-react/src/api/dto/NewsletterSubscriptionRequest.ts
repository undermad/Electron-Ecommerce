export type NewsletterSubscriptionRequest = {
    email: string,
}

export type NewsletterSubscriptionRequestError = NewsletterSubscriptionRequest & {
    message: string,
}

export const newsletterSubscriptionRequestErrorDefault: NewsletterSubscriptionRequestError = {
    email: '',
    message: '',
}

