
import { DiscoverContainer} from './DiscoverElements'
import React, { useContext } from "react";
import DiscoverArray from "./DiscoverArray";
import { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

import  options  from "./options";

function Discover2(props) {
  const handleAddOnclick = () => {
    console.log('ETF 찾아가기');
  }
  const [dataETF, setDataETF] = useState([])
  const {data, error, loading} = useAxios(options);
  useEffect(()=>{
    if(data){
      setDataETF(data.data)
    }
  }, [data])
  
  return (
  
      <DiscoverContainer>
        {/* <h1 className= "DiscoverTitle text-black">Discover ETF </h1> */}
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
          {dataETF ? dataETF.slice(0,13).map((etf, index) => (
            <DiscoverArray key={index} symbol={etf.symbol} name={etf.name} exchange={etf.exchange} currency={etf.currency} />
          ))
            : "Loading"}
        </tbody>
			</table>
      <Link to='discover' className='d-flex justify-content-end text-decoration-none'>
                <Button variant='danger' onClick={handleAddOnclick}>
                펼쳐보기
                </Button>
      </Link>
      </DiscoverContainer>
  );
}

export default Discover2;