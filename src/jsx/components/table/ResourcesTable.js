import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ResourcesTable= () => {
   const [data,setData]=React.useState([]);
   const history = useHistory();

   const fetchData=async()=>{
     var finalResult=[];
    var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Resources.json');
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
                <h3 className="title">Resources</h3>
                <Link to="/new-resource" className="add-btn text-center w50" style={{paddingTop:'0.2vw',margin:'auto'}}>
								Add
							  </Link>
                </div>
          
          <p>Here is a brief overview of Resources from clients.</p>
          {
      data.map((d,i)=>{
     return (<>
          <div className="exercise-rows border-btm ptb-1" key={i}>
          <div>
          <div className="colTwo2">
          {/* <img className="w100 grpIcon" src={grpImg} alt=""/> */}
                     <a className="exerciseName color-black txtsdots2" href={`/modify-resource/${d.id}`}>{d.resource}</a>
           </div>
           </div>  
         
          </div>
          </>)
      })}
       
          </div>
      </div>
  
      </>);
};

export default ResourcesTable;