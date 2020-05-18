import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Graficos from './Graficos';
import SellsBuys from './SellsBuys';
import Exchanges from './Exchanges';


const protocolo = "wss://";
const servidor = "le-18262636.bitzonte.com";
const ruta = "/stocks";

const socket = io(protocolo + servidor , {
  path: ruta
  });


const ConectarWebsocket = () => {

    const [booleano, setBooleano] = useState(true);
    const [data_update, setData_update] = useState([]);
    const [data_sell, setData_sell] = useState([]);
    const [data_buy, setData_buy] = useState([]);
    const [data_exchanges, setData_exchanges] = useState([]);
    const [data_stocks, setData_stocks] = useState([]);

    let data_exchanges3 = {};



    const cambio_bool = () => {
      setBooleano(!booleano);
      if(!booleano){
        socket.connect();
      }
      if(booleano){
        socket.disconnect();
      }
    }


    function selec() {
      setSeleccionada(document.getElementById("lista").value);
    }


    useEffect(() => {
        //if(booleano){
        socket.on('UPDATE', info =>{
            var llega = {time: info.time, value: info.value, ticker : info.ticker};
            setData_update(data_update => data_update.concat(llega));
        });
//        if(!booleano){
  //        socket.on('UPDATE', info =>{
    //          var llega = {time: info.time, value: info.value, ticker : info.ticker};
      //        setData_update(data_update => data_update.concat(llega));
        //  })};
        socket.on('SELL', info =>{
            var llega = {time: info.time, volume: info.volume, ticker : info.ticker};
            setData_sell(data_sell => data_sell.concat(llega));
        });
        socket.on('BUY', info =>{
            var llega = {time: info.time, volume: info.volume, ticker : info.ticker};
            setData_buy(data_buy => data_buy.concat(llega));
        });
        socket.emit("EXCHANGES", ()=> {
        });
        socket.on('EXCHANGES', info =>{
            const data = Object.values(info);
           // data.map((d) => setData_exchanges(data_exchanges => [...data_exchanges, ...[d.name, d.exchange_ticker, d.listed_companies]));
//            for(var i =0; i<data.length;i++){
  //            setData_exchanges(data_exchanges => data_exchanges.concat(data[i]));}
        });
        socket.emit('STOCKS', () => {
        } )
        socket.on('STOCKS', info => { 
          for (var i = 0; i < info.length; i++) {
            setData_stocks(data_stocks => data_stocks.concat(info[i]));
          }
        });
    }, []);

    let mercados = Object.values(data_exchanges3);


    var menu = "";
    var value = "";
    
    const [seleccionada, setSeleccionada] = useState('AAPL');

    //

    return(
        <div>
            
            <div id="block_container">
              {data_stocks.map((d) => d.ticker === seleccionada ? (<div float="left"><Graficos data={d} data2={data_update}/> </div>) : <div></div>)}
              <div  align="center" className="div_raro">
                <p className="exampleText">{booleano ? "Estas conectado" : "Estas desconectado, presiona el botón para conectarte"}</p>
                <button className="myButton" align="center" onClick = {() => cambio_bool()}>{booleano ? "Desconectarse" : "Conectarse"}</button>
                <p> </p>
                <p> </p>
                <p> </p>
                <p className="exampleText">Selecciona la acción que quieres ver</p>
                <select className="select-css" id="lista" onChange = {() => selec()}>
                    {data_stocks.map((d) => <option value = {d.ticker}> {d.ticker}</option>)}
                </select>
              </div>          
            </div>
            <p>{"\n\n"}</p>
            <table class="table table-striped table-dark" align="center" border="5" frame="box" >
              <thead>
                <tr>
                  <th scope="col">Compañía</th>
                  <th scope="col">Ticker</th>
                  <th scope="col">País</th>
                  <th scope="col">Volumen Transado</th>
                  <th scope="col">Máximo</th>
                  <th scope="col">Mínimo</th>
                  <th scope="col">Último Precio</th>
                  <th scope="col">Variación Porcentual</th>
                </tr>
              </thead>
                <tbody>{data_stocks.map((d) => (<SellsBuys data={d} data2={data_sell} data3={data_buy} data4={data_update}/>))}</tbody>
            </table>
            <p>{"\n\n"}</p>
            <table class="table table-striped table-dark" align="center" border="5" frame="box">
              <thead>
                <tr>
                  <th scope="col">Nombre Mercado</th>
                  <th scope="col">Volumen Compra</th>
                  <th scope="col">Volumen Venta</th>
                  <th scope="col">Volumen Total</th>
                  <th scope="col">Cantidad Acciones</th>
                  <th scope="col">Participación Mercado</th>
                </tr>
              </thead>
                <tbody><Exchanges data={data_exchanges} data2={data_sell} data3={data_buy} data4={data_update}/></tbody>



            </table> 
            <p>{"\n\n"}</p> 
        </div>
    )

}

export default ConectarWebsocket;