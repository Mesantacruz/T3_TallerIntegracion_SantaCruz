import React, {useState} from 'react';
import './../App.css';

const SellsBuys = (props) => {

    const data = props.data;
    const data2 = props.data2;
    const data3 = props.data3;
    const data4 = props.data4;

    const sells = data2.filter((d) => d.ticker === data.ticker );
    const buys = data3.filter((d) => d.ticker === data.ticker );
    const updates = data4.filter((d) => d.ticker === data.ticker );

    var valores_updates = [];

    var valores_updates = updates.map((d) => [...valores_updates, d.value]);

    const max = Math.max(...valores_updates);
    const min = Math.min(...valores_updates);

    const ultimo_sells = sells.length - 1;
    const ultimo_buys = buys.length - 1;
    var valor = (updates.length >= 2 ? (100*((updates[updates.length - 1].value - updates[updates.length - 2].value)/updates[updates.length - 2].value)).toFixed(5) : 0);
    let divStyle = {};
    if(valor >=0){
        divStyle = { color: "darkgreen" }};
    if(valor<0){
        divStyle = { color: "darkred" }};

    return( 
        <tr>
          <th align = "center" scope="row">{data.company_name}</th>
          <td align = "center">{data.ticker}</td>
          <td align = "center">{data.country}</td>
          <td align = "center">{ultimo_buys >= 0 && ultimo_sells >= 0 ? sells[ultimo_sells].volume + buys[ultimo_buys].volume : "Ningún dato registrado"}</td>
          <td align = "center">{max ? "$"+max : "Ningún dato registrado"} {max ? data.quote_base : ""}</td>
          <td align = "center">{min ? "$"+min : "Ningún dato registrado"} {min ? data.quote_base : ""}</td>
          <td align = "center">{updates.length >= 1 ? "$"+updates[updates.length - 1].value : "Ningún dato registrado"} {updates.length >= 1 ? data.quote_base : ""}</td>
          <td align = "center"><div style={divStyle} >{valor}%</div></td>
        </tr>
        
    )

};

export default SellsBuys;