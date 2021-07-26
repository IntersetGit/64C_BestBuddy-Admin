import axios from 'axios';
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE,
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [(data, headers) => {
        // Do whatever you want to transform the data
        const token = cookies.get('token');
        const refresh_token = cookies.get('refresh_token');

        console.log('token :>> ', token);
        console.log('refresh_token :>> ', refresh_token);

        if (token) {
            const token_decode = jwt_decode(token);
            if (token_decode.exp < Date.now() / 1000) {
                console.log("หมดเวลาtoken")
                /*  */
                RefreshToken(refresh_token);
            }
        }
        if (token) headers.Authorization = "Bearer " + token
        return JSON.stringify(data);
    }],
});

const RefreshToken = async (refreshtokenval) => {
    try {
        const { data } = axios.post(process.env.NEXT_PUBLIC_SERVICE + '/auth/refreshToken', { token: refreshtokenval })
        const token = data.items
        return token;
    } catch (error) {
        /*  */
        cookie.remove("token", { path: '/' });
        cookie.remove("refresh_token", { path: '/' });
        window.location.href = "/";
    }
}