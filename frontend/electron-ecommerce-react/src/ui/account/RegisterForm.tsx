import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import React, {useRef, useState} from "react";
import {RegisterRequest} from "../../api/dto/RegisterRequest.ts";
import {AxiosResponse} from "axios";
import {axiosRegistration, REGISTER_API_PATH} from "../../api/axios.ts";
import {RegisterResponse} from "../../api/dto/RegisterResponse.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {REGISTRATION_SUCCESSFUL} from "../../constants/Messages.ts";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";


export const RegisterForm = () => {

    const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        reEnteredPassword: '',
        newsletterSubscription: false,
    })
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = useRef<HTMLParagraphElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const messageScreen = useMessageScreen();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setRegisterFormData((prevState) => ({
            ...prevState,
            [name]: inputValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(registerFormData);
        axiosRegistration.post(REGISTER_API_PATH, registerFormData)
            .then((response: AxiosResponse<RegisterResponse>) => {
                console.log(response.data.message);
                messageScreen(REGISTRATION_SUCCESSFUL);
            })
            .catch((error) => {
                console.log(error?.response);
                setLoading(false);
                setErrorMessage(error?.response?.data?.message);
            })
    }


    return (





                    <form className={"mt-[35px] flex flex-col"}
                          onSubmit={handleSubmit}>

                        <p ref={errorRef}
                           className={errorMessage ? "text-electron-error text-xl" : ""}>
                            {errorMessage}
                        </p>

                        <MultiInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"firstName"}>First name</Label>
                                <input
                                    className={"input-electron"}
                                    id={"firstName"}
                                    required={true}
                                    type={"text"}
                                    name={"firstName"}
                                    value={registerFormData.firstName}
                                    onChange={handleInputChange}
                                    autoComplete={"given-name"}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"lastName"}>Last name</Label>
                                <input
                                    className={"input-electron"}
                                    id={"lastName"}
                                    required={true}
                                    type={"text"}
                                    name={"lastName"}
                                    onChange={handleInputChange}
                                    autoComplete={"family-name"}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"email"}>Email Address</Label>
                                <input
                                    className={"input-electron"}
                                    id={"email"}
                                    required={true}
                                    type={"text"}
                                    name={"email"}
                                    onChange={handleInputChange}
                                    autoComplete={"email"}
                                />
                            </LabelInputHolder>

                            <LabelInputHolder>
                                <Label htmlFor={"password"}>Password</Label>
                                <input name="abc" type="text" style={{display: 'none'}}/>
                                <input
                                    className={"input-electron"}
                                    id={"password"}
                                    placeholder={"At least six characters"}
                                    required={true}
                                    type={"password"}
                                    name={"password"}
                                    onChange={handleInputChange}
                                    autoComplete={"new-password"}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"re-enter-password"}>Re-enter password</Label>
                                <input name="abc" type="text" style={{display: 'none'}}/>
                                <input
                                    className={"input-electron"}
                                    id={"re-enter-password"}
                                    required={true}
                                    type={"password"}
                                    name={"reEnteredPassword"}
                                    onChange={handleInputChange}
                                    autoComplete={"new-password"}
                                />
                            </LabelInputHolder>
                            <LabelCheckboxHolder>
                                <input type={"checkbox"}
                                       id={"persist"}
                                       name={"newsletter"}
                                       onChange={handleInputChange}
                                       autoComplete={"off"}
                                />
                                <CheckboxLabel htmlFor={"persist"}>
                                    Would you like to sign for the newsletter?
                                </CheckboxLabel>
                            </LabelCheckboxHolder>
                        </MultiInputHolder>


                        <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                            <button className={loading ? "button-electron-disabled" : "button-electron"}
                                    type={"submit"}>
                                Register
                            </button>
                        </div>

                    </form>
    )
}