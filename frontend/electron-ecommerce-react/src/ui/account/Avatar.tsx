import {CiUser} from "react-icons/ci";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {ACCOUNT_API_PATH, CHANGE_AVATAR, GET_AVATAR} from "../../api/axios.ts";
import {AvatarResponse, defaultAvatar} from "../../api/dto/auth/AvatarResponse.ts";
import Cropper from "react-easy-crop";

export const Avatar = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [currentImage, setCurrentImage] = useState<AvatarResponse>(defaultAvatar)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const axiosPrivate = useAxiosPrivate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (file.size > 1048576) {
                alert('Maximum size is 1mb')
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please select an image file (e.g., JPG, PNG, GIF)');
                return;
            }
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append('file', selectedFile!);

        if (selectedFile)
            axiosPrivate.post(ACCOUNT_API_PATH + CHANGE_AVATAR, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then(response => {
                    setCurrentImage(response.data)
                    console.log('success')
                })
                .catch(error => {
                    console.log(error);
                })
    }, [selectedFile]);

    useEffect(() => {
        axiosPrivate.get(ACCOUNT_API_PATH + GET_AVATAR)
            .then(response => {
                setImageUrl("data:image/png;base64," + response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [currentImage]);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }

    return (
        <div
            onClick={handleAvatarClick}
            className={"w-[95px] h-[95px] overflow-hidden flex justify-center items-center rounded-full border border-electron-product-listing-bg cursor-pointer"}>
            {/*<CiUser color="#2f2f2f" size={50}/>*/}

            {/*<Cropper*/}
            {/*    image={imageUrl}*/}
            {/*    crop={crop}*/}
            {/*    zoom={zoom}*/}
            {/*    aspect={4 / 3}*/}
            {/*    onCropChange={setCrop}*/}
            {/*    onCropComplete={onCropComplete}*/}
            {/*    onZoomChange={setZoom}*/}
            {/*/>*/}
            <div className="w-full h-full flex items-center scale-[1.2]">
                <img src={imageUrl} alt="Avatar" className="overflow-hidden"/>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}