import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  Form,
  Text,
  FormButton,
  FormButton2,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
} from "./SignupElements";

const SignUp = () => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value)
    console.log(password);
  }
  const handlePasswordCheckOnChange = (e) => {
    setPasswordCheck(e.target.value)
    console.log(password);
  }
  useEffect(()=>{
    console.log(password === passwordCheck);
  },[passwordCheck])
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Frog</Icon>
          <FormContent>
            <Form action="http://frogcoin.fun25.co.kr:80/auth/join" method="POST">
              <FormH1>회원가입</FormH1>
              <FormLabel htmlFor="for">이메일</FormLabel>
              <FormInput type="email" name="email" required />
              <FormLabel htmlFor="for">비밀번호</FormLabel>
              <FormInput onChange={handlePasswordOnChange} type="password" name="password" required />
              <FormLabel htmlFor="for">비밀번호 확인</FormLabel>
              <FormInput onChange={handlePasswordCheckOnChange} type="password" required />

              {password == passwordCheck ? <FormButton2 className="bg-success" type="submit" >Frog 회원가입 완료</FormButton2> 
              : <FormButton2 type="submit" disabled className="bg-secondary">Frog 회원가입 완료</FormButton2>}
              
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignUp;
