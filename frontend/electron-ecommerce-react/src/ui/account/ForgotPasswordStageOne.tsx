import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {SyntheticEvent, useState} from "react";
import {PasswordRecoveryRequest} from "../../api/dto/PasswordRecoveryRequest.ts";
import {axiosAuth, FORGOT_PASSWORD_API_PATH} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";

export const ForgotPasswordStageOne = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const messageScreene = useMessageScreen();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new PasswordRecoveryRequest(email);
        axiosAuth.post(FORGOT_PASSWORD_API_PATH, data)
            .then((response) => {
                messageScreene(response.data.message);
            })
            .catch((error) => {
                messageScreene(error.data.message);
            })

    }

    return (
        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>
            <LabelInputHolder>
                <LabelInputHolder>
                    <Label htmlFor="email">Email address</Label>
                    <input className={"input-electron"}
                           id={"email"}
                           type={"text"}
                           placeholder={"Enter your email address"}
                            onChange={(event) => setEmail(event.target.value)}
                    />
                </LabelInputHolder>
            </LabelInputHolder>

            <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                <button
                    className={loading ? "button-electron-disabled" : "button-electron"}
                    disabled={loading}>
                    Next
                </button>
            </div>
        </form>
    )
}