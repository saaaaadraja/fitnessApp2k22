import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesTable= () => {
   const [data,setData]=React.useState([]);

   const fetchData=async()=>{
     var finalResult=[];
    var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Categories.json');
    var result=res.data;
    for(let id in result){
        var res = {...result[id],id:id};
     finalResult.push(res);
      }
   setData(finalResult);
   }
     React.useEffect(()=>{
     fetchData();
    },[])


   return(<>
      <div className="clients-table w100">
          <div className="table-content">
            <div className="client-card-header">
                <h3 className="title">Categories</h3>
                <Link to="/new-category" className="add-btn text-center w50" style={{paddingTop:'0.2vw',margin:'auto'}}>
								Add
							  </Link>
                </div>
          
          <p>Here is a brief overview of Categories from clients.</p>
          {
      data.map((d,i)=>{
     return (<>
          <div className="exercise-rows border-btm ptb-1" key={i}>
          <div>
          <div className="colTwo2">
          {/* <img className="w100 grpIcon" src={grpImg} alt=""/> */}
                     <a className="exerciseName color-black txtsdots2" href={`/modify-category/${d.id}`}>{d.category}</a>
           </div>
           </div>  
         
          </div>
          </>)
      })}
       
          </div>
      </div>
  
      </>);
};

export default CategoriesTable;