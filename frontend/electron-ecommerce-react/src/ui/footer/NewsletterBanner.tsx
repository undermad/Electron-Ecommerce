import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {Container} from "../reusable/Container.tsx";

export const NewsletterBanner = () => {

    return (

        <article className={"w-full py-[48px] bg-electron-bg-grey flex justify-center"}>
            <Container>
                <div className={"flex flex-col md:flex-row md:items-center gap-[18px] md:gap-[100px]"}>
                    <figure className={"flex flex-col gap-[8px]"}>
                        <Bold textSize={20} weight={600}>Join newsletter</Bold>
                        <ParagraphSmall>We'll send you a letters with promotion and discount.</ParagraphSmall>
                    </figure>
                    <form className={"flex flex-col md:flex-row gap-[16px]"}>
                        <TextInput
                            placeholder={"Enter your email"}
                            callback={() => console.log('callback')}/>
                        <div className="">
                            <ElectronButton rounded="xl" width={115}>Subscribe</ElectronButton>
                        </div>
                    </form>
                </div>
            </Container>

        </article>
    )
}