import React from "react";


function DiscoverArray({symbol, name, exchange, currency}) {
  return (
    
    
    <tr>
     <th>
							<span>{symbol}</span>
						</th>
						<th>
							<span><a href={`https://www.etf.com/search?gq=${name}`}>{name} </a></span>
						</th>
						<th>
							<span>{exchange}</span>
						</th>
						<th>
							<span>{currency}</span>
						</th>
      {/* <h3>{symbol} {name} {exchange} {currency} </h3> */}
    </tr>
 
  );
}

export default DiscoverArray;