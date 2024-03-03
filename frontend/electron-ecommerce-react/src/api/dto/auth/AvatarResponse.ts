export type AvatarResponse = {
    id: number;
    fileName: string;
    fileType: string;
    data: Blob; // Assuming the data is already a Blob
}

export const defaultAvatar: AvatarResponse = {
    id: 0,
    fileName: '',
    fileType: '',
    data: new Blob(),
}