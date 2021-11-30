
import { DiscoverContainer} from './DiscoverElements'
import React, { useContext } from "react";
import DiscoverArray from "./DiscoverArray";
import { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

import  options  from "./options";

function Discover(props) {
  const [dataETF, setDataETF] = useState([])
  const {data, error, loading} = useAxios(options);
  useEffect(()=>{
    if(data){
      setDataETF(data.data)
      console.log(data.data);
    }
  }, [data])
  
  return (
  
      <DiscoverContainer>
        <h1 className= "DiscoverTitle"><br/><br/>Discover ETF </h1>
        <table className="table coinlist-table table-striped table-hover text-center">
				<thead className="text-light bg-success ">
					<tr>
						<th>
							<span>Symbol</span>
						</th>
						<th>
							<span>Name</span>
						</th>
						<th>
							<span>Exchange</span>
						</th>
						<th>
							<span>Currency</span>
						</th>
					</tr>
				</thead>
				<tbody>
          {dataETF ? dataETF.slice(0,35).map((etf, index) => (
            <DiscoverArray key={index} symbol={etf.symbol} name={etf.name} exchange={etf.exchange} currency={etf.currency} />
          ))
            : "Loading"}
        </tbody>
			</table>
      </DiscoverContainer>
  );
}

export default Discover;