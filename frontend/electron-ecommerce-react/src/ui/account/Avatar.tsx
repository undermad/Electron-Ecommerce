import {ChangeEvent, useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {ACCOUNT_API_PATH, CHANGE_AVATAR, GET_AVATAR} from "../../api/axios.ts";
import {AvatarResponse, defaultAvatar} from "../../api/dto/auth/AvatarResponse.ts";
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, {centerCrop, convertToPixelCrop, type Crop, makeAspectCrop} from 'react-image-crop'
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import setCanvasPreview from "../account/setCanvasPreview.ts";
import {CiUser} from "react-icons/ci";

//https://www.youtube.com/watch?v=odscV57kToU
//avatar how to
export const Avatar = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [currentImage, setCurrentImage] = useState<AvatarResponse>(defaultAvatar)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const axiosPrivate = useAxiosPrivate();

    const [imageSource, setImageSource] = useState<string>('');
    const [crop, setCrop] = useState<Crop>()
    const MIN_DIMENTION = 150;
    const ASPECT_RATIO = 1;
    const cropImgRef = useRef<HTMLImageElement | null>(null);


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
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const imageElement = new Image();
                const imageUrl = reader.result?.toString() || "";
                imageElement.src = imageUrl;
                imageElement.addEventListener("load", (e) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const {naturalWidth, naturalHeight} = e.currentTarget;
                    if (naturalWidth < MIN_DIMENTION || naturalHeight < MIN_DIMENTION) {
                        alert("Image must be at least 150x150");
                        return setImageSource("");
                    }
                })

                console.log(imageUrl);
                setImageSource(imageUrl);
            });
            reader.readAsDataURL(file);

        }
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onImageLoad = (e) => {
        const {width, height,} = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENTION / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent
            },
            ASPECT_RATIO,
            width,
            height
        );

        const centredCrop = centerCrop(crop, width, height);
        setCrop(centredCrop);
    }

    const handleCropAccept = () => {
        const canvas = document.createElement('canvas');

        setCanvasPreview(
            cropImgRef.current,
            canvas,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            convertToPixelCrop(crop, cropImgRef.current?.width, cropImgRef.current?.height)
        )
        canvas.toBlob(blob => {
            if (blob) {
                // Create a File from the Blob
                const imgFile = new File([blob], 'image.png', {type: 'image/png'});

                // Use the File object as needed
                setSelectedFile(imgFile);
                setImageSource('');
            }
        }, 'image/png');
    }

    const handleCropCancel = () => {
        setImageSource("");
    }

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


    return (
        <div>

            {imageSource &&
                <div
                    className="flex flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-electron-light-grey rounded-xl z-50">
                    <ReactCrop
                        onChange={(percentageCrop) => setCrop(percentageCrop)}
                        crop={crop}
                        circularCrop={true}
                        keepSelection={true}
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENTION}
                    >
                        <img
                            ref={cropImgRef}
                            src={imageSource} alt="avatar" onLoad={onImageLoad}/>

                    </ReactCrop>
                    <div className="w-full flex justify-between gap-2 bg-electron-input-grey border rounded-md p-1">
                        <div
                            onClick={handleCropAccept}
                            className="w-1/2">
                            <ElectronButton>
                                Ok
                            </ElectronButton>
                        </div>
                        <div onClick={handleCropCancel}
                             className="w-1/2">
                            <ElectronButton>
                                Cancel
                            </ElectronButton>
                        </div>
                    </div>

                </div>
            }
            <div
                onClick={handleAvatarClick}
                className={"w-[95px] h-[95px] overflow-hidden flex justify-center items-center rounded-full border border-electron-product-listing-bg cursor-pointer"}>


                <div className="w-full h-full flex items-center scale-[1] justify-center">
                    {imageUrl ?
                        <img src={imageUrl} alt="Avatar" className="overflow-hidden"/> :
                        <CiUser color="#2f2f2f" size={50}/>
                    }
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}