import axios from 'axios';
import { Cookies } from 'react-cookie'
import jwt_decode from "jwt-decode";

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
        if (token) {
            const token_decode = jwt_decode(token);
            if (token_decode.exp < Date.now() / 1000) {
                console.log("หมดเวลาtoken")
                RefreshToken(refresh_token);
            }
        }
        if (token) headers.Authorization = "Bearer " + token
        return JSON.stringify(data);
    }],
});

const logout = () => {
    cookies.remove("token");
    cookies.remove("refresh_token");
    window.location.href = "/signin";
}

const RefreshToken = async (refreshtokenval) => {
    try {
        if (refreshtokenval) {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_SERVICE + '/auth/refreshToken', { token: refreshtokenval })
            const token = data.items
            cookies.set('token', token, { path: '/' });
            location.reload();
        } else {
            logout()
        }
    } catch (error) {
        logout()
    }
}