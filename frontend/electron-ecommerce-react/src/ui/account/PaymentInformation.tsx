import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Bold} from "../reusable/Bold.tsx";

export const PaymentInformation = () => {


    return (
        <div className="flex flex-col gap-5">
            <Header3>Maybe next time</Header3>
            <div className="w-2/3">
                <ParagraphSmall>
                    This application has been created in educational purposes and I do not want to store your payment
                    information. Hopefully you enjoy exploring my application and if you wish you can contact with me
                    by social media (links are in the footer) or email.
                </ParagraphSmall>
            </div>
            <Bold weight={400} textSize={20}>dtworek94@gmail.com</Bold>
        </div>
    )
}