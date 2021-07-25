import jwt_decode from "jwt-decode";

// Action Creator

export const setAuthUser = (user) => {
    // console.log('user setAuthUser :>> ', user);
    return dispatch => {
        localStorage.setItem("user", JSON.stringify(user));
        user.img = JSON.parse(user.img)
        dispatch({
            type: "SET_AUTH_USER_DATA",
            payload: user,
        });
    };
};


export const setToken = (token) => {
    return dispatch => {
        localStorage.setItem("token", token);
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



