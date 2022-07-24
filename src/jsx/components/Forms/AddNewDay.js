import React, { Fragment } from 'react';
import PageTItle from "../../layouts/PageTitle";
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import grpImg from '../../../images/icon/exer.png';
import duplicate from '../../../images/icon/dup.png'
import deleteIcon from '../../../images/icon/del.png'
import { Link } from "react-router-dom";
import editIcon from '../../../images/edit (3).png'


const AddNewDay=()=>{
    const [routineData,setRoutineData]=React.useState({name:'',description:'',days:[]});
    const [modifyRoutine,setModifyRoutine]=React.useState();
    const history = useHistory();
    const params =useParams();
    const {id}=params;

    const submitHandler=(e)=>{
        e.preventDefault;
        if(!modifyRoutine){
        if(routineData.name && routineData.description){
        axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json',JSON.stringify(routineData))
        .then((res)=>{
           alert('submit successfully....');
           history.push(`/new-routine/${res.data.name}`);
           setRoutineData({name:'',day:'',data:[]});
        })
        .catch((err)=>alert(err));
    }else{
        alert('kindly fill fields properly than add days...');
    }
   }else{
      if(modifyRoutine.name && modifyRoutine.description && modifyRoutine.days){
         axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`,JSON.stringify(modifyRoutine))
         .then((res)=>{
            console.log('testing');
            alert('submit successfully....');
            history.push(`/new-routine/${id}`);
         })
         .catch((err)=>alert(err));
     }else{
         alert('kindly fill fields properly than add days...');
     }
    }
    }


    const fetchData=async(id)=>{
      var resRoutine =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`);
      var resultRoutine=resRoutine.data;
      setModifyRoutine(resultRoutine);
      console.log(resultRoutine);
      }

    React.useEffect(async()=>{
      if(window.location.href.includes('/modify-day')){
   fetchData(id);
      }
   },[])


   const delRoutineHandler=async(index)=>{
      if(window.confirm('are you sure you want to delete this element?')){
         modifyRoutine.days.splice(index,1);
         var resRoutine =await axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`,JSON.stringify(modifyRoutine));
        window.location.reload();
      }
    }


    const dupRoutineHandler=(index)=>{
      modifyRoutine.days.push(modifyRoutine.days[index]);
   axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`,JSON.stringify(modifyRoutine))
      .then((res)=>{
         alert('duplicated successfully....');
         window.location.reload();
      })
      .catch((err)=>alert(err));
       }

       const editHandler=(index)=>{
         history.push(`modify-routine/${id}/${index}`)
       }

    return(
            <Fragment>
               <PageTItle activeMenu="Days" motherMenu="Form" />
      
               <div className="row">
              <div className="card w100 pb-5" style={{position:'relative'}}>
               <div className="card-header">
                     <h4 className="card-title">Add Routine</h4>
                  </div>
                {modifyRoutine?(<><div className='colTwo3 w95 ml-2'>
                                 <div className="form-group">
                                 <p className='input-label'>Name</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={modifyRoutine.name}
                                        onChange={(e)=>setModifyRoutine({...modifyRoutine,name:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="enter name"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Description</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="description"
                                       name='description'
                                       value={modifyRoutine.description}
                                       onChange={(e)=>setModifyRoutine({...modifyRoutine,description:e.target.value})}
                                       cols='10'
                                       rows='5'
                                    />
                                 </div>
                                 </div>
                                 <p className='input-label' style={{marginLeft:'4rem',width:'15%'}}>days of routine</p>
                     <button className='mb-5 submit-btn '  style={{marginLeft:'4rem',width:'15%'}} onClick={submitHandler}>Add Day</button>
                     <div className='w90 m-auto'>
                     
                     
                     {
           modifyRoutine.days !=[] ? modifyRoutine.days.map((d,i)=>{
             return <div className="exercise-rows border-btm ptb-1">
              <div>
              <div className="colTwo2">
              <img className="w100 grpIcon" src={grpImg} alt=""/>
                         <a className="exerciseName color-black txtsdots2" href={`modify-routine/${id}/${i}`}><span style={{fontSize:'1rem',fontWeight:'bold',color:'#3e88ea'}}>{d.name}</span><br/>{d.day}</a>
               </div>
               </div>  
               <div> 
              <div className="colTwo2 ptb-0-5 duplicate" onClick={()=>dupRoutineHandler(i)}>
              <img className="dupIcon del-dup-edi-img" src={duplicate} alt=""/>
                         <p className="color-black">Duplicate</p>
               </div>
               </div>        
               <div>
              <div className="colTwo2 ptb-0-5 delete" onClick={()=>delRoutineHandler(i)}>
              <img className="delIcon del-dup-edi-img" src={deleteIcon} alt=""/>
                         <p className="color-black">Delete</p>
               </div>
               </div>  
               <div>
              <div className="colTwo2 ptb-0-5 edit" onClick={()=>editHandler(i)}>
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
          }):(<div></div>)
         }
                     </div></>
                                 ):(<><div className='colTwo3 w95 ml-2'>
                                 <div className="form-group">
                                 <p className='input-label'>Name</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={routineData.name}
                                        onChange={(e)=>setRoutineData({...routineData,name:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="enter name"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Description</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="description"
                                       name='description'
                                       value={routineData.description}
                                       onChange={(e)=>setRoutineData({...routineData,description:e.target.value})}
                                       cols='10'
                                       rows='5'
                                    />
                                 </div>
                                 </div> 
                                 <p className='input-label' style={{marginLeft:'4rem',width:'15%'}}>days of routine</p>
                     <button className='mtb-3 submit-btn w40'  style={{marginLeft:'4rem',width:'15%'}}onClick={submitHandler}>Add Day</button>
                                 </>)}
                                
                    
                  </div>
                  </div>
                  </Fragment>
    )
}


export default AddNewDay;