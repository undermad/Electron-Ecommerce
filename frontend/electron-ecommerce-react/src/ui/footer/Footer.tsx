import {Container} from "../reusable/Container.tsx";
import {ElectronLogoSvg} from "../../assets/images/ElectronLogoSvg.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {FooterColumn} from "./FooterColumn.tsx";
import {HOME_ROUTE, SEARCH_ROUTE} from "../../constants/Routes.ts";
import {FaLinkedin} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


export const Footer = () => {

    const productsColumn: Map<string, string> = new Map();
    productsColumn.set('Graphic cards', SEARCH_ROUTE + "/gpu")
    productsColumn.set('Memory', SEARCH_ROUTE + "/memory")
    productsColumn.set('Monitors', SEARCH_ROUTE + "/monitors")
    productsColumn.set('Headphones', SEARCH_ROUTE + "/headphones")

    const companyLinks: Map<string, string> = new Map();
    companyLinks.set('About', HOME_ROUTE);
    companyLinks.set('Careers', HOME_ROUTE);
    companyLinks.set('News', HOME_ROUTE);
    companyLinks.set('Contact', HOME_ROUTE);

    const socialLinks: Map<string, string> = new Map();
    socialLinks.set('LinkedIn', 'https://www.linkedin.com/in/dominik-tworek-850b4b25a')
    socialLinks.set('Github', 'https://www.github.com/undermad')
    socialLinks.set('Twitter', 'https://twitter.com/TworekDominik')

    const terms: Map<string, string> = new Map();
    terms.set('Terms', HOME_ROUTE);
    terms.set('Privacy', HOME_ROUTE);
    terms.set('Cookies', HOME_ROUTE);
    terms.set('Licenses', HOME_ROUTE);




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
                        <FooterColumn name={"Product"} links={productsColumn} applicationLinks={true}/>
                        <FooterColumn name={"Company"} links={companyLinks} applicationLinks={true}/>
                        <FooterColumn name={"Social"} links={socialLinks} applicationLinks={false}/>
                        <FooterColumn name={"Company"} links={terms} applicationLinks={true}/>
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