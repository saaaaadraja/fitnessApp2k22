import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/logo.png";
import logoText from "../../../images/logo-text.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   return (
      <div className="nav-header">
          <Link to="/" className={` ${toggle ? "brand-logo ml-2" : "brand-logo-active ml-2"}`}>
            <img className="logo-abbr w100" src={logo} alt="" />
            {/* <img className="brand-title" src={logoText} alt="" /> */}
            {/* Fitness */}
         </Link>
           <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>

        
      </div>
   );
};

export default NavHader;
