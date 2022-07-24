import React from "react";
import grpImg from '../../../images/icon/exer.png';
import duplicate from '../../../images/icon/dup.png'
import deleteIcon from '../../../images/icon/del.png'
import { Link } from "react-router-dom";
import editIcon from '../../../images/edit (3).png'
import axios from "axios";
import { useHistory } from "react-router-dom";

const Exercise = () => {
   const [data,setData]=React.useState([]);
   const history = useHistory();

   const fetchData=async()=>{
     var finalResult=[];
    var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json');
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
      <div className="clients-table">
          <div className="table-content">
            <div className="client-card-header">
                <h3 className="title">Exercises</h3>
                <Link to="/new-exercise" className="add-btn text-center w50" style={{paddingTop:'0.2vw',margin:'auto'}}>
								Add
							  </Link>
                </div>
          
          <p>Here is a brief overview of exercises from clients.</p>
          {
      data.map((d,i)=>{
     return (<>
          <div className="exercise-rows border-btm ptb-1" key={i}>
          <div>
          <div className="colTwo2">
          <img className="w100 grpIcon" src={grpImg} alt=""/>
                     <a className="exerciseName color-black txtsdots2" href={`/modify-exercise/${d.id}`}>{d.name}</a>
           </div>
           </div>  
           <div> 
          <div className="colTwo2 ptb-0-5 duplicate" onClick={()=>dupExerHandler(i)}>
          <img className="dupIcon del-dup-edi-img" src={duplicate} alt=""/>
                     <p className="color-black">Duplicate</p>
           </div>
           </div>        
           <div>
          <div className="colTwo2 ptb-0-5 delete" onClick={()=>delExerHandler(d.id)}>
          <img className="delIcon del-dup-edi-img" src={deleteIcon} alt=""/>
                     <p className="color-black">Delete</p>
           </div>
           </div>  
           <div>
          <div className="colTwo2 ptb-0-5 edit" onClick={()=>editHandler(d.id)}>
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
          </>)
      })}
       
          </div>
      </div>
      <div className="clients-statics">
      <h3 className="title">
          Filters
      </h3>
      </div>
      </>);
};

export default Exercise;
