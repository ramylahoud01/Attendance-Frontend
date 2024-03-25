import Cookies from "js-cookie";
const API_URL = process.env.REACT_APP_API_SERVER

export default function authHeader() {
    const token = Cookies.get('token');
    if (token) {
        return token
    }
    else {
        return null;
    }
}

export const LoginEmployee = (Email, Password) => {
    return fetch(API_URL + `/Employee/sign`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password })

    })
        .catch(error => {
            console.error('Error occurred ', error.message);
            throw error;
        });
}