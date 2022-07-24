import React from "react";
import grpImg from '../../../images/icon/exer.png';
import duplicate from '../../../images/icon/dup.png'
import deleteIcon from '../../../images/icon/del.png'
import { Link } from "react-router-dom";
import editIcon from '../../../images/edit (3).png'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const Routine = () => {
   const [data,setData]=React.useState([]);
  //  const [groupData,setGroupData]=React.useState([]);
   const history =useHistory();
   const params =useParams();
   const {id}=params;


   const fetchData=async()=>{
     var finalResult=[];
    var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json');
    var result=res.data;
   //console.log(res.data);
    for(let id in result){
        var res1={...result[id],id:id};
     finalResult.push(res1);
   //   console.log(result[id]);
      }
   setData(finalResult);
   // console.log(finalResult);
   //routine group data
//   var filterData= finalResult.filter((d=>d.day.includes(id)));
// setGroupData(filterData);
   }
     React.useEffect(()=>{
     fetchData();
    },[])

    
 const delRoutineHandler=async(id)=>{
    if(window.confirm('are you sure you want to delete this element?')){
       var resRoutine =await axios.delete(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`);
      window.location.reload();
    }
  }

  const dupRoutineHandler=async(index)=>{
    var ele=data[index];
    axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json',JSON.stringify(ele))
    .then((res)=>{
       alert('duplicated successfully....');
       window.location.reload();
    })
    .catch((err)=>alert(err));
     }

     const editHandler=(id)=>{
       history.push(`/modify-day/${id}`);

     }

   return(<>
      <div className="clients-table">
          <div className="table-content">
         
          <div className="client-card-header">
            <div>
            <h3 className="title">Training - Routines</h3>
          <p>Here is a brief overview of Routines</p>
            </div>
                <Link to="/new-day" className="add-btn text-center w50" style={{paddingTop:'0.2vw',margin:'auto'}}>
								Add
							  </Link>
                </div>
                {
        data.map((dt,i)=>{
         return <div className="exercise-rows border-btm ptb-1">
          <div>
          <div className="colTwo2">
          <img className="w100 grpIcon" src={grpImg} alt=""/>
                     <a className="exerciseName color-black txtsdots2" href={`/react/demo/modify-day/${dt.id}`}>{dt.name}</a>
           </div>
           </div>  
           <div> 
          <div className="colTwo2 ptb-0-5 duplicate" onClick={()=>dupRoutineHandler(i)}>
          <img className="dupIcon del-dup-edi-img" src={duplicate} alt=""/>
                     <p className="color-black">Duplicate</p>
           </div>
           </div>        
           <div>
          <div className="colTwo2 ptb-0-5 delete" onClick={()=>delRoutineHandler(dt.id)}>
          <img className="delIcon del-dup-edi-img" src={deleteIcon} alt=""/>
                     <p className="color-black">Delete</p>
           </div>
           </div>  
           <div>
          <div className="colTwo2 ptb-0-5 edit" onClick={()=>editHandler(dt.id)}>
          <img className=" del-dup-edi-img editIcon" src={editIcon} alt=""/>
                     <p className="color-black">Edit</p>
           </div>
           </div>      
           <div>
          <div className="colThree1">
             <div></div>
          <div className="online-bg"></div>
                     <p className="exerciseName color-black">Online</p>
           </div>
           </div>    
          </div>
      })
    }
        
          </div>
      </div>
      <div className="clients-statics">
      <h3 className="title">
          Filters
      </h3>
      </div>
      </>);
};

export default Routine;
