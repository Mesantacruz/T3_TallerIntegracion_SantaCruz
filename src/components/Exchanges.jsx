import React, {useState} from 'react';
import './../App.css';

const Exchanges = (props) => {

   // data={data_exchanges} data2={data_sell} data3={data_buy} data4={data_update}/>))}

    const exchanges = props.data;
    const sells = props.data2;
    const buys = props.data3;

    


    //let suma_buys = 0;

    var suma_buys = buys.reduce(function(tot, arr) { 
        return tot + arr.volume;
      },0);
  //  suma_buys = buys.map((d) => parseInt(suma_buys) + parseInt(d.volume));
    //let suma_sells = 0;

    var suma_sells = sells.reduce(function(tot, arr) { 
        return tot + arr.volume;
      },0);
    //suma_sells = sells.map((d) => parseInt(suma_sells) + parseInt(d.volume));

    var suma_total = suma_buys + suma_sells;



    



    return( 
        <tr>
          <th scope="row">{}</th>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
        </tr>
        
    )

};

export default Exchanges;