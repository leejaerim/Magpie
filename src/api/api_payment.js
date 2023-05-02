import axiosInstance from "./instance";

export const getPayment = ({ queryKey }) =>
    //${queryKey[1]}
    axiosInstance.get(`payment?date=${queryKey[1]}`).then((response) => response.data);