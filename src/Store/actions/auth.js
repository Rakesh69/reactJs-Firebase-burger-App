import axios from 'axios';

import * as actionType from './actionType';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (token, userID) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userID
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId' );

    return {
        type: actionType.LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxPcaLaoBvqzQibchW3L73Vef9QK6ZKGI';

        if(!isSignup) {
            URL ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxPcaLaoBvqzQibchW3L73Vef9QK6ZKGI';
        }

        axios.post(URL, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate )
            localStorage.setItem('userId',response.data.localId );

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return diaptch => {
        const token = localStorage.getItem('token');
        if(!token) {
            diaptch(logout());
        } else {
            const expirationDate =  new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                diaptch(logout());
            } else {
                const userId = localStorage.getItem('userId')
                diaptch(authSuccess(token, userId ));
                diaptch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000))
            }
        }
    }
}