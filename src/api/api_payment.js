import axiosInstance from "./instance";

export const getPayment = () =>
    axiosInstance.get(`payment/`).then((response) => response.data);