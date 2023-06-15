import React, { useState } from 'react';
import "../Styles/Header.css";
import { Link } from 'react-router-dom';

export const Header = () => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  return (
    <div>
        <div className='heading'>RC Frame</div>
        <div className='section'>
        <Link to="/" className={active1?'section_name active':'section_name'} onClick={()=>{setActive1(true);setActive2(false);setActive3(false)}}>Longitudinal</Link>
        <Link to="/Traverse" className={active2?'section_name active':'section_name'} onClick={()=>{setActive1(false);setActive2(true);setActive3(false)}}>Traverse</Link>
        <Link to="/loads" className={active3?'section_name active':'section_name'} onClick={()=>{setActive1(false);setActive2(false);setActive3(true)}}>Loads</Link>
        </div>
    </div>
  )
}
