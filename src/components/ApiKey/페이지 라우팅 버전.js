import React from "react";
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

const ApiKey = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Frog</Icon>
          <FormContent>
            <Form action="http://frogcoin.fun25.co.kr:80/auth/key" method="POST">
              <FormH1>API 키 입력</FormH1>
              <select name="whatKey">
                <option value="Upbit">Upbit</option>
                <option value="Binance">Binance</option>
              </select>
              <FormLabel htmlFor="for">accessKey</FormLabel>
              <FormInput type="text" name="Access" required />
              <FormLabel htmlFor="for">secretKey</FormLabel>
              <FormInput type="text" name="Secret" required />

              <FormButton2 type="submit">키 입력 완료</FormButton2>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ApiKey;
