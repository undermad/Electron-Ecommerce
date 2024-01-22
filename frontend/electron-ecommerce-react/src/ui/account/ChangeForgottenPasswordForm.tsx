import {useParams} from "react-router-dom";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import React, {useState} from "react";
import {ChangeForgottenPasswordRequest} from "../../api/dto/ChangeForgottenPasswordRequest.ts";
import {axiosAuth, CHANGE_FORGOTTEN_PASSWORD_API_PATH} from "../../api/axios.ts";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";

export const ChangeForgottenPasswordForm = () => {
    const params = useParams();
    const token = params.token;
    const messageScreen = useMessageScreen();

    const [loading, setLoading] = useState<boolean>(false);
    const [changeForgottenPasswordData, setChangeForgottenPasswordData] = useState<ChangeForgottenPasswordRequest>({
        newPassword: '',
        reNewPassword: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setChangeForgottenPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data = new ChangeForgottenPasswordRequest(
            changeForgottenPasswordData.newPassword,
            changeForgottenPasswordData.reNewPassword);

        axiosAuth.put(CHANGE_FORGOTTEN_PASSWORD_API_PATH + `/${token}`, data)
            .then((response) => {
                messageScreen(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })

    }

    return (
        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>
            <MultiInputHolder>

                <LabelInputHolder>
                    <LabelInputHolder>
                        <Label htmlFor={"newPassword"}>New Password</Label>
                        <input className={"input-electron"}
                               id={"newPassword"}
                               name={"newPassword"}
                               type={"password"}
                               onChange={handleInputChange}
                               autoComplete={"new-password"}
                        />
                    </LabelInputHolder>
                </LabelInputHolder>
                <LabelInputHolder>
                    <LabelInputHolder>
                        <Label htmlFor={"reNewPassword"}>New Password</Label>
                        <input className={"input-electron"}
                               id={"reNewPassword"}
                               name={"reNewPassword"}
                               type={"password"}
                               onChange={handleInputChange}
                               autoComplete={"new-password"}
                        />
                    </LabelInputHolder>
                </LabelInputHolder>
            </MultiInputHolder>

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