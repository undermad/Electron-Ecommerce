import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {Container} from "../reusable/Container.tsx";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import React, {useState} from "react";
import {axiosBase, SUBSCRIBE_NEWSLETTER_API_PATH} from "../../api/axios.ts";
import {
    NewsletterSubscriptionRequest,
    NewsletterSubscriptionRequestError, newsletterSubscriptionRequestErrorDefault
} from "../../api/dto/NewsletterSubscriptionRequest.ts";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";

export const NewsletterBanner = () => {

    const messageScreen = useMessageScreen();
    const [email, setEmail] = useState<string>('');
    const [validationError, setValidationError] =
        useState<NewsletterSubscriptionRequestError>(newsletterSubscriptionRequestErrorDefault);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data: NewsletterSubscriptionRequest = {
            email: email,
        }
        console.log(data)

        axiosBase.post(SUBSCRIBE_NEWSLETTER_API_PATH, data)
            .then(response => {
                messageScreen(response.data.message);
                setValidationError(newsletterSubscriptionRequestErrorDefault)
                setEmail('')
            })
            .catch(error => {
                console.log(error)
                setValidationError(error.response?.data);
            })
    }

    return (

        <article className={"w-full py-[48px] bg-electron-bg-grey flex justify-center"}>
            <Container>
                <div className={"flex flex-col md:flex-row md:items-center gap-[18px] md:gap-[100px]"}>
                    <figure className={"flex flex-col gap-[8px]"}>
                        <Bold textSize={20} weight={600}>Join newsletter</Bold>
                        <ParagraphSmall>We'll send you a letters with promotion and discount.</ParagraphSmall>
                    </figure>
                    <form id="subscribeForm"
                          onSubmit={handleSubmit}
                          className={"flex flex-col md:flex-row items-end gap-[16px]"}>
                        <div className="w-full">
                        <LabelInputHolder>
                            <Label errorMessage={validationError.email} htmlFor={"subscriptionEmail"}/>
                            <TextInput
                                id={"subscriptionEmail"}
                                placeholder={"Enter your email"}
                                value={email}
                                callback={handleInputChange}/>
                        </LabelInputHolder>
                        </div>
                        <div className="w-full">
                            <ElectronButton form="subscribeForm" rounded="xl" width={115}>Subscribe</ElectronButton>
                        </div>
                    </form>
                </div>
            </Container>

        </article>
    )
}