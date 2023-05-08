import axiosInstance from "./instance";

export const getPayment = ({ queryKey }) =>
    //${queryKey[1]}
    axiosInstance.get(`payment?date=${queryKey[1]}`).then((response) => response.data);

export const postPayment = (value) => {
    return axiosInstance
        .post('http://127.0.0.1:8000/api/v1/payment', value)
        .then((response) => response.data)
        .catch((error) => error);
};