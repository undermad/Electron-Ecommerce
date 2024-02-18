import {ElectronLogoSvg} from "../../assets/images/ElectronLogoSvg.tsx";

export const ElectronLogoHero = () => {


    return (
        <div className={"relative"}>
            <div className={"scale-[2] mb-[200px] flex justify-center"}>
                <ElectronLogoSvg dark={true}/>
            </div>
            <p className={"tracking-wider text-electron-primary-dark-blue absolute top-3/4 left-1/2 translate-y-3/4 -translate-x-1/2 text-center text-[14px] font-[400]"}>
                A TECH SOLUTION FOR EVERY DEVICE
            </p>
        </div>
    )
}