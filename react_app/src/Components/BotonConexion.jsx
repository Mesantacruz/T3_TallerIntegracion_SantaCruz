import React, {useState} from 'react';



const BotonConectar = () => {

    const [isToggled, setToggled] = useState(true);
//    const toggleTrueFalse = () => {
  //      setToggled(!isToggled);
    //}

    return (
        <div>
            <p>Your toggle is {isToggled.toString()}</p>
            <button onClick={() => setToggled(!isToggled)}>Toggle me</button>
        </div>
    );
}

export default BotonConectar;
  