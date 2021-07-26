import jwt_decode from "jwt-decode";
import { Cookies } from 'react-cookie'
// Action Creator

export const setAuthUser = (user) => {
    // console.log('user setAuthUser :>> ', user);
    return dispatch => {
        dispatch({
            type: "SET_AUTH_USER_DATA",
            payload: user,
        });
    };
};


export const setToken = (token, refreshToken) => {
    return dispatch => {
        const cookies = new Cookies();
        cookies.set('token', token);
        if (refreshToken) cookies.set('refresh_token', refreshToken);
        const dataUser = jwt_decode(token);
        dispatch(setAuthUser(dataUser));
        dispatch({
            type: "USER_TOKEN_SET",
            payload: token,
        });
    };
};

export const delToken = () => {
    return dispatch => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({
            type: "SET_AUTH_USER_DATA",
            payload: null,
        });
        dispatch({
            type: "USER_TOKEN_SET",
            payload: null,
        });
    };
};



