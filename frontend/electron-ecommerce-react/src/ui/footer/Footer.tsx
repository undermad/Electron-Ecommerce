import {Container} from "../reusable/Container.tsx";
import {ElectronLogoSvg} from "../../assets/images/ElectronLogoSvg.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {FooterColumn} from "./FooterColumn.tsx";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";
import {FaLinkedin} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


export const Footer = () => {

    const items: Map<string, string> = new Map();
    items.set('Graphic cards', SEARCH_ROUTE + "/gpu")
    items.set('Memory', SEARCH_ROUTE + "/memory")
    items.set('Monitors', SEARCH_ROUTE + "/monitors")
    items.set('Headphones', SEARCH_ROUTE + "/headphones")


    return (
        <Container>
            <main className={"w-full pt-[64px] pb-[48px] flex flex-col gap-[64px]"}>
                <article className={"flex flex-col md:flex-row gap-[64px]"}>
                    <figure className="flex flex-col gap-[32px]">
                        <ElectronLogoSvg dark={true}/>
                        <ParagraphSmall>A biggest electronic e-commerce in the world, with many
                            discount</ParagraphSmall>
                    </figure>
                    <figure className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px] justify-between"}>
                        <FooterColumn name={"Product"} links={items}/>
                        <FooterColumn name={"Product"} links={items}/>
                        <FooterColumn name={"Product"} links={items}/>
                        <FooterColumn name={"Product"} links={items}/>
                    </figure>
                </article>
                <article className="flex flex-col md:flex-row gap-[12px]">
                    <span className={"text-[14px] text-electron-other-page leading-6"}>
                        © 2077 Electron. All rights reserved.
                    </span>
                    <div className="flex md:ml-auto gap-[24px]">
                        <a href="https://www.linkedin.com/in/dominik-tworek-850b4b25a">
                            <FaLinkedin size={24}/>
                        </a>
                        <a href="https://www.github.com/undermad">
                            <FaGithub size={24}/>
                        </a>
                        <a href="https://twitter.com/TworekDominik">
                            <FaXTwitter size={24}/>
                        </a>
                    </div>


                </article>
            </main>
        </Container>
    )
}