import {Bold} from "../reusable/Bold.tsx";

type ProductDescriptionProps = {
    description: string
}


export const ProductDescription = ({description}: ProductDescriptionProps) => {

    return (
        <div
            className={"text-[16px] text-electron-input-ash-blue pt-[40px] border-t border-electron-product-listing-bg flex flex-col gap-[24px]"}>

            <div className="rounded-md bg-electron-light-grey flex max-w-max px-[12px] py-[16px] ">
                <Bold weight={600} textSize={20}>Product Description</Bold>
            </div>

            {description}

            <br/><br/>
            <Bold weight={600} textSize={22}>
                Good to know
            </Bold>

            <ul>
                <li>- Go crazy with 16 GB of DDR5 RAM – it's super-fast, so you can multitask your heart
                    out
                </li>
                <li>- 1 TB of SSD storage means you can keep a nice games library and load it up super
                    quick
                </li>
                <li>- Put that GPU to use in creative workflows and you'll love the wide 100% sRGB colour
                    gamut
                </li>
                <li>- With support for WiFi 7, you'll be ready for the feature of wireless connectivity</li>
                <li>- The keyboard has both style and substance - 4-zone RGB backlighting and
                    anti-ghosting
                </li>
                <li>- For Discord streams or work calls, you'll look nice and clear on the Full HD webcam
                </li>
                <li>- Breeze through log-ins with just a smile using Windows Hello</li>
                <li>- With HDMI 2.1 you can hook up 8K screens or dual 4K monitors</li>
            </ul>
            <br/>
        </div>
    )
}