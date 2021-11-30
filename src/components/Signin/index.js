import React, { useEffect, useState } from "react";
import { Router, Switch, Link } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  Form,
  Text,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormButton2,
} from "./SigninElements";

const SignIn = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Frog</Icon>
          <FormContent>
            <Form action="http://frogcoin.fun25.co.kr:80/auth/login" method="POST">
              <FormH1>본인 어카운트로 로그인 하시오</FormH1>
              <FormLabel htmlFor="for">이메일</FormLabel>
              <FormInput type="email" name="email" required />
              <FormLabel htmlFor="for">비밀번호</FormLabel>
              <FormInput type="password" name="password" required />
              <FormButton type="submit">계속</FormButton>
              <Text>
                비밀번호를 잊었나요? <br /> <br /> 혹은 <br />
              </Text>
              <Text> 어카운트가 없나요? </Text>
              <br />
              <FormButton2 to="/signup">Frog 회원가입</FormButton2>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
