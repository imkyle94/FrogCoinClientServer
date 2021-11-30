import React, { createContext, useEffect, useState } from "react";
import { Col, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [coins, setCoins] = useState([]);
  const [coinsDisplay, setCoinsDisplay] = useState([]);

  const { data, loading, error } = useAxios({
    method: "GET",
    baseURL: "http://frogcoin.fun25.co.kr:80",
    url: "news",
  });

  // setCoins(data);

  useEffect(() => {
    if (!loading && data) {
      setCoins(data);
      setCoinsDisplay(data.slice(0, 3));
    }
  }, [data, loading]);

  if (error) {
    return <h1 className="text-danger">{error.message}</h1>;
  }

  return (
    <NewsContext.Provider value={{ coinsDisplay }}>
      {props.children}
    </NewsContext.Provider>
  );
};
