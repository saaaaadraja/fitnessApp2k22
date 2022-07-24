import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import Routine from "./Routine";

const RoutinesTable=()=>{
    return (
        <Fragment>
           <PageTitle activeMenu="Routines" motherMenu="Table" />
           <div className="row">
              <Routine/>
           </div>
        </Fragment>
     );
  };

export default RoutinesTable;