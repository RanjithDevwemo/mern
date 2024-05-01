import CountUp from 'react-countup';
import { FaUsers } from "react-icons/fa";
import "./Css/ScrollCounding.css"
import ScrollTrigger from 'react-scroll-trigger';

import React, { useState } from 'react'


export default function ScrollCounding() {
const [startcout,setstartcount]=useState(false);

  return (
    <div className='scroll'>
          <ScrollTrigger onEnter={()=>setstartcount(true)} onExit={()=>setstartcount(false)}>
        
<div className='counting'>

<div className='temp'>
  <div className='icon'>
  <FaUsers />
  </div>
  <div className='cont'>
Year Of Passing
  </div>
  <div className='number'>
<h2>
    {startcout &&
<CountUp start={0} end={20} duration={3.5}></CountUp>
}
+</h2>
  </div>
</div>


<div className='temp'>
  <div className='icon'>

  </div>
  <div className='cont'>
  Dental Surgeries
  </div>
  <div className='number'>
<h2> {startcout &&
<CountUp start={0} end={500} duration={3.5}></CountUp>}
+</h2>

</div>

</div>


<div className='temp'>
  <div className='icon'>

  </div>
  <div className='cont'>
  Happy Patients
  </div>
  <div className='number'>
<h2>
{startcout &&
<CountUp start={0} end={1000} duration={3.5}></CountUp>}
+</h2>
  </div>
</div>
</div>
</ScrollTrigger>  
    </div>
  )
}



