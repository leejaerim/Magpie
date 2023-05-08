import axiosInstance from "./instance";

export const postFileUpload = (formData) => {
    axiosInstance
        .post('http://127.0.0.1:8000/fileupload', formData)
        .then((response) => {
            console.log('File uploaded:', response.data);
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
};