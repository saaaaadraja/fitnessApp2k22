import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MusclesTable= () => {
   const [data,setData]=React.useState([]);
   const history = useHistory();

   const fetchData=async()=>{
     var finalResult=[];
    var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Muscles.json');
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

    const delExerHandler=async(id)=>{
        if(window.confirm('are you sure you want to delete this element?')){
           var resRoutine =await axios.delete(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises/${id}.json`);
          window.location.reload();
        }
      }

const dupExerHandler=async(index)=>{
    var ele=data[index];
axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json',JSON.stringify(ele))
.then((res)=>{
   alert('duplicated successfully....');
   window.location.reload();
})
.catch((err)=>alert(err));
}


const editHandler=(id)=>{
    history.push(`modify-exercise/${id}`)
  }
   return(<>
      <div className="clients-table w100">
          <div className="table-content">
            <div className="client-card-header">
                <h3 className="title">Muscles</h3>
                <Link to="/new-muscle" className="add-btn text-center w50" style={{paddingTop:'0.2vw',margin:'auto'}}>
								Add
							  </Link>
                </div>
          
          <p>Here is a brief overview of Muscles from clients.</p>
          {
      data.map((d,i)=>{
     return (<>
          <div className="exercise-rows border-btm ptb-1" key={i}>
          <div>
          <div className="colTwo2">
          {/* <img className="w100 grpIcon" src={grpImg} alt=""/> */}
                     <a className="exerciseName color-black txtsdots2" href={`/modify-muscle/${d.id}`}>{d.muscle}</a>
           </div>
           </div>  
         
          </div>
          </>)
      })}
       
          </div>
      </div>
  
      </>);
};

export default MusclesTable;