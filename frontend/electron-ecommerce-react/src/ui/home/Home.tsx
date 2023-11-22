import headphones from '../../assets/images/headphones_white.png';
import {Link} from "react-router-dom";

export const Home = () => {


    return (
        <section className={"px-responsive-electron w-full max-w-[1440px]"}>

            <div className={"mt-[16px] h-[352px] rounded-3xl bg-electron-primary-dark-blue overflow-hidden relative"}>
                <div
                    className={"absolute w-[210px] h-[145px] blur-[100px] -rotate-[135deg] bg-gradient-to-t from-electron-gradient-light-blue to-electron-gradient-eye-blue"}/>
                <div
                    className={"absolute -right-0 w-[445px] h-[308px] blur-[100px] -rotate-[135deg] bg-gradient-to-t from-electron-gradient-light-blue to-electron-gradient-eye-blue"}/>
                <img className={"absolute w-[552px] -top-[80px] right-[29px] "} src={headphones}
                     alt={"transparent headphones image"}/>

                <div className={"absolute top-[59px] left-[93px] text-[28px] text-electron-primary-white flex flex-col gap-7"}>
                    <p className={"flex flex-col"}>
                        <span>Journey Into Sound</span>
                        <span className={"text-[62px]"}>Airpods Max</span>
                    </p>
                    <Link to={'/'}>
                        <span className={"text-[20px] bg-electron-button-bg-blue py-4 px-8 rounded-[24px]"}>25% OFF</span>
                    </Link>
                </div>

            </div>


        </section>
    )
}