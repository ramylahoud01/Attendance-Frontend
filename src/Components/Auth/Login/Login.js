import React, { useState } from 'react'
import LoginHeader from './LoginHeader'
import LoginContain from './LoginContain'
import LoginButton from './LoginButton'
import { Form, useNavigate } from 'react-router-dom'
import StyleFormContainer from '../../Styled/StyleFormContainer'
import { LoginEmployee } from '../../../Services/isAuth.service'
import Cookies from 'js-cookie';


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const retreiveEmailHandler = (value) => {
        setEmail(value)
    }
    const retreivePasswordHandler = (value) => {
        setPassword(value)
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await LoginEmployee(email, password)
        if (response.ok) {
            const data = await response.json();
            const token = data?.token
            Cookies.set('token', token, { expires: 3 });
            return navigate('/')
        }
    }
    return (
        <StyleFormContainer>
            <Form onSubmit={submitHandler} method='Post'>
                <LoginHeader />
                <LoginContain retreiveEmail={retreiveEmailHandler} retreivePassword={retreivePasswordHandler} />
                <LoginButton />
            </Form>
        </StyleFormContainer>
    )
}

export default Login