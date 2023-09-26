import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = () =>{
    return(
        <div className= 'ma4 mt0'>
            <Tilt glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" 
            glareBorderRadius="20px" className="br2 shadow-2" 
            style={{ height: '150px', width: '150px', background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)' }}>
                <div className="pa3" >
                    <img style={{paddingTop: '5px'}} src={brain} alt="Logo"/>
                </div>
            </Tilt>
        </div>
    );
}
export default Logo;