import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import React, {useRef, useState} from "react";
import {RegisterRequest, RegisterRequestValidationError} from "../../api/dto/auth/RegisterRequest.ts";
import {AxiosResponse} from "axios";
import {axiosRegistration, REGISTER_API_PATH} from "../../api/axios.ts";
import {RegisterResponse} from "../../api/dto/auth/RegisterResponse.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {REGISTRATION_SUCCESSFUL} from "../../constants/Messages.ts";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {FormErrorMessage} from "../reusable/FormErrorMessage.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {FormSubmitButton} from "../reusable/FormSubmitButton.tsx";
import useFocusOnMount from "../../custom_hooks/useFocusOnMount.ts";

const registerFormDataInit: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    newsletterSubscription: false,
}
const validationErrorInit: RegisterRequestValidationError = {
    ...registerFormDataInit,
    message: '',
}


export const RegisterForm = () => {

    const [registerFormData, setRegisterFormData] =
        useState<RegisterRequest>(registerFormDataInit);

    const [validationError, setValidationError] =
        useState<RegisterRequestValidationError>(validationErrorInit);

    const firstNameRef = useRef<HTMLInputElement>(null);
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
        setValidationError({...validationErrorInit})
        axiosRegistration.post(REGISTER_API_PATH, registerFormData)
            .then((response: AxiosResponse<RegisterResponse>) => {
                console.log(response.data.message);
                messageScreen(REGISTRATION_SUCCESSFUL);
            })
            .catch((error) => {
                console.log(error)
                setValidationError({...error.response.data});
                setLoading(false);
            })
    }

    useFocusOnMount(firstNameRef);

    return (


        <form className={"mt-[35px] flex flex-col"}
              onSubmit={handleSubmit}>

            <FormErrorMessage errorMessage={validationError.message}/>

            <MultiInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={validationError.firstName} htmlFor={"firstName"}>First name</Label>
                    <TextInput id={"firstName"}
                               inputRef={firstNameRef}
                               required={true}
                               type={"text"}
                               name={"firstName"}
                               value={registerFormData.firstName}
                               callback={handleInputChange}
                               autoComplete={"given-name"}
                    />
                </LabelInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={validationError.lastName} htmlFor={"lastName"}>Last name</Label>
                    <TextInput id={"lastName"}
                               required={true}
                               type={"text"}
                               name={"lastName"}
                               callback={handleInputChange}
                               autoComplete={"family-name"}
                    />
                </LabelInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={validationError.email} htmlFor={"email"}>Email Address</Label>
                    <TextInput id={"email"}
                               required={true}
                               type={"text"}
                               name={"email"}
                               callback={handleInputChange}
                               autoComplete={"email"}
                    />
                </LabelInputHolder>

                <LabelInputHolder>
                    <Label errorMessage={validationError.password} htmlFor={"password"}>Password</Label>
                    <input name="abc" type="text" style={{display: 'none'}}/>
                    <TextInput id={"password"}
                               placeholder={"At least six characters"}
                               required={true}
                               type={"password"}
                               name={"password"}
                               callback={handleInputChange}
                               autoComplete={"new-password"}
                    />
                </LabelInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={validationError.rePassword} htmlFor={"re-password"}>Re enter password</Label>
                    <input name="abc" type="text" style={{display: 'none'}}/>
                    <TextInput id={"re-password"}
                               required={true}
                               type={"password"}
                               name={"rePassword"}
                               callback={handleInputChange}
                               autoComplete={"new-password"}
                    />
                </LabelInputHolder>
                <LabelCheckboxHolder>
                    <CheckboxInput type={"checkbox"}
                                   id={"persist"}
                                   name={"newsletter"}
                                   callback={handleInputChange}
                                   autoComplete={"off"}/>
                    <CheckboxLabel htmlFor={"persist"}>
                        Would you like to sign for the newsletter?
                    </CheckboxLabel>
                </LabelCheckboxHolder>
            </MultiInputHolder>

            <FormSubmitButton loading={loading}/>
        </form>
    )
}