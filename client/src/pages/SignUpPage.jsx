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


    //값을 입력 하면 state에 담는 함수
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
    

//서버에 입력한 데이터 보내고 응답 받고 유효성 검사 하는 함수
    const handleClickSignUp = (e) => {
        e.preventDefault();
        //정규표현식
        const nameRegex = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/;
        const idRegex = /^[A-Za-z0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9]+@[a-z0-9-]+\.[a-z]+$/

        //유효성 검사
        if(!nameRegex.test(userName)) 
            return setMessage("이름은 한글로 작성해 주세요");

        if(userName.length < 2) 
            return setMessage("이름은 2글자 이상부터 입니다");
        
        if(!idRegex.test(userId)) 
            return setMessage("아이디는 영어,숫자로만 작성해 주세요");
        
        if(userPassword.length < 8) 
            return setMessage("비밀번호 길이는 최소 8자 이상입니다");

        if(userPassword !== checkPassword)
            return setMessage("비밀번호와 비밀번호 확인 값이 일치하지 않습니다");
        
        if(!emailRegex.test(userEmail)) 
            return setMessage("올바른 이메일 형식이 아닙니다");

        const userInfo = {
            name: userName,
            id: userId,
            password: userPassword,
            email: userEmail
        }

        axios.post("/api/users/register" , userInfo)
        .then((response) => {
            if(response.data.success === false) {
                console.log(response.data)
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
        });
    }

    return (
        <>
        <main className="user-form__container">
            <styled.LoginSignUpform 
            className="user-form"
            onSubmit={handleClickSignUp}>
                <h1 id="user-form__title">회원 가입</h1>

                <input 
                className ="user-form__name" 
                type="text"
                placeholder="이름" 
                onChange={handleChangeValue}/>

                <input 
                className="user-form__id"
                type="text"
                placeholder="아이디 5~15자리 특수 문자는 제외"
                maxLength="15"
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__pw" 
                type="password"
                maxLength="15"
                placeholder="비밀 번호  8자리~15자리 영어,숫자,특수 문자 포함" 
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__pw-check" 
                type="password"
                placeholder="비밀 번호 확인"
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__email" 
                type="email"
                placeholder="이메일" 
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