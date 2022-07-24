import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import ProfileDatatable from "./ProfileDatatable";
import Exercise from "./Exercise";

const ExercisesTable = () => {
   return (
      <Fragment>
         <PageTitle activeMenu="Exercise" motherMenu="Table" />
         <div className="row">
            <Exercise></Exercise>
         </div>
      </Fragment>
   );
};

export default ExercisesTable;
