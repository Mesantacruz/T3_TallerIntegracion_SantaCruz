import React, {useState} from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './../App.css';
import moment from 'moment';

const Graficos = (props) => {

    const data = props.data;
    const data2 = props.data2;

    const data3 = data2.filter((d) => d.ticker === data.ticker );

 //   for(var i =0;i < data3.lenght; i++){
   //     var t = new Date( data3[i].time );
     //   var formatted = t.format("dd.MM.YYYY HH:mm");
       // data[i].time = formatted;}
    
    //const data3 = data4.map(d => {d.time = ((moment(new Date(d.time))).format("dd.MM.YYYY HH:mm"))});

    return(
        <div> 
            <h1 align="center">{data.ticker} - {data.company_name}</h1>
            <table  className="Grafico" align="center" frame="box" border-width="10px">
                <AreaChart width={700} height={300} data={data3} margin={{ top: 5, right: 20, bottom: 5, left: 10 }} >
                    <Area type="monotone" dataKey="value" stroke="#282c34" fill="#282c34" />
                    
                    <XAxis stroke="#282c34" dataKey="time" label={{ value: "Tiempo", marginTop:"320px" , position:"insideBottom" }}/>
                    <YAxis stroke="#282c34" label={{ value: data.quote_base, angle: -90 , margin: "0px"}}/>
                    <Tooltip />
                </AreaChart>
            </table>
            <p align="center">(los precios están en {data.quote_base})</p>
            <p>{"\n"}</p>
        </div> 
    )

};

export default Graficos;