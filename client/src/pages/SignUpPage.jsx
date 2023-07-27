import axios from "axios";
import React, { useState } from "react";
import * as styled from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userName , setName] = useState("");
    const [userId , setUserId] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const [checkPassword , setCheckPassword] = useState("");
    const [userEmail , setUserEmail] = useState("");
    const [message , setMessage] = useState("");

    const handleChangeValue = (e) => {
        switch(e.target.className) {
            case "user-form__name":
                setName(e.target.value);
                break;
            case "user-form__id":
                setUserId(e.target.value);
                break;
            case "user-form__pw":
                setUserPassword(e.target.value);
                break;
            case "user-form__pw-check":
                setCheckPassword(e.target.value);
                break;
            case "user-form__email":
                setUserEmail(e.target.value);
                break;
            default:
        }
    }

    const handleClickSignUp = () => {
        const userInfo = {
            userName: userName,
            userId: userId,
            userPassword: userPassword,
            userEmail: userEmail
        }
        axios.post("/api/users/register" , userInfo)
        .then((response) => {
            if(response.data.success === false) {
                return setMessage(response.data.messsage);
            }
            if(response.data.success === true) {
                navigate("/login");
                setMessage("");
                console.log(response.data , response.status);
            }
        })
        .catch((error) => {
            return console.log(error);
        })
    }

    return (
        <>
        <main className="user-form__container">
            <styled.LoginSignUpform 
            className="user-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleClickSignUp();
                console.log(userName , userId , userPassword , checkPassword , userEmail);
            }}>
                <h1 id="user-form__title">회원 가입</h1>

                <input 
                className ="user-form__name" 
                type="text"
                placeholder="이름" 
                onChange={handleChangeValue}/>

                <input 
                className="user-form__id"
                type="text"
                placeholder="아이디 8~12자리 특수 문자는 제외"
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__pw" 
                type="password"
                placeholder="비밀 번호" 
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__pw-check" 
                type="password"
                placeholder="비밀 번호  8자리~15자리 영어,숫자,특수 문자 포함"
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__email" 
                type="email"
                placeholder="[선택] 비밀 번호 분실시 이메일" 
                onChange={handleChangeValue}/>

                <span className="error-message">
                    {message}
                </span>
                <styled.LoginSignUpButton
                    className="default-btn" 
                    type="submit">
                        가입 하기
                </styled.LoginSignUpButton>
            </styled.LoginSignUpform>
        </main>
        </>
    );
};

export default SignUpPage;