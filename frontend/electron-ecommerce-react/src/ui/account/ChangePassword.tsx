import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import React, {useState} from "react";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {FormErrorMessage} from "../reusable/FormErrorMessage.tsx";
import {
    NewPasswordRequest,
    newPasswordRequestDefault,
    NewPasswordRequestError,
    newPasswordRequestErrorDefault
} from "../../api/dto/auth/NewPasswordRequest.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {AUTH_API_PATH, CHANGE_PASSWORD_API_PATH} from "../../api/axios.ts";


export const ChangePassword = () => {
    const messageScreen = useMessageScreen();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState<boolean>(false);
    const [newPasswordData, setNewPasswordData] = useState<NewPasswordRequest>(newPasswordRequestDefault);
    const [responseError, setResponseError] = useState<NewPasswordRequestError>(newPasswordRequestErrorDefault);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEqual(newPasswordData.newPassword, newPasswordData.reNewPassword)) {
            setLoading(true);
            const data: NewPasswordRequest = {
                oldPassword: newPasswordData.oldPassword,
                newPassword: newPasswordData.newPassword,
                reNewPassword: newPasswordData.reNewPassword,
            };

            axiosPrivate.put(AUTH_API_PATH + CHANGE_PASSWORD_API_PATH, data)
                .then((response) => {
                    messageScreen(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                    setResponseError({...error.response.data})
                    setLoading(false);
                })
        } else {
            setResponseError({...responseError, newPassword: "Passwords must be same"})
        }
    }

    const isEqual = (firstVal: string, secondVal: string): boolean => {
        if (firstVal !== secondVal) return false;
        return true;
    }

    return (
        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>
            <MultiInputHolder>
                <FormErrorMessage errorMessage={responseError.message}/>
                <LabelInputHolder>
                    <Label errorMessage={responseError.reNewPassword} htmlFor={"oldPassword"}>Old Password</Label>
                    <TextInput id={"oldPassword"}
                               name={"oldPassword"}
                               type={"password"}
                               callback={handleInputChange}
                               autoComplete={"new-password"}
                    />
                </LabelInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={responseError.newPassword} htmlFor={"newPassword"}>New Password</Label>
                    <TextInput id={"newPassword"}
                               name={"newPassword"}
                               type={"password"}
                               callback={handleInputChange}
                               autoComplete={"new-password"}
                    />
                </LabelInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={responseError.reNewPassword} htmlFor={"reNewPassword"}>New Password</Label>
                    <TextInput id={"reNewPassword"}
                               name={"reNewPassword"}
                               type={"password"}
                               callback={handleInputChange}
                               autoComplete={"new-password"}
                    />
                </LabelInputHolder>
            </MultiInputHolder>

            <ElectronButton loading={loading}>Submit</ElectronButton>
        </form>

    )
}