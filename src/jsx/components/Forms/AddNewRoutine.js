import React, { Fragment } from 'react';
import PageTItle from "../../layouts/PageTitle";
import deleteIcon from '../../../images/icon/del.png'
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddNewRoutine=()=>{
   const buttonRef = React.useRef();
   const [dis,setDis]=React.useState();
   const [routineData,setRoutineData]=React.useState({name:'',day:'',exercises:[]});
   const [formEle,setFormEle]=React.useState({exercise:'',series:'',repetitions:'',duration:'',rest:''});
   const [newRoutine,setNewRoutine] = React.useState();
   const [modifyRoutine,setModifyRoutine]=React.useState();
   const [modifyRoutineData,setModifyRoutineData]=React.useState();
   const [exerData,setExerData]=React.useState([]);
   const [days, setDays] = React.useState(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
   const history = useHistory();
   const params =useParams();
   const {id,index}=params;
   const addHandler=(e)=>{
      if(modifyRoutine){
     if(formEle.exercise && formEle.series && formEle.rest){
      if(formEle.repetitions || formEle.duration){
         modifyRoutine.exercises.push(formEle);
        setFormEle({exercise:'',series:'',repetitions:'',duration:'',rest:''});
        setDis();
      }
     }else{
    alert('fill the fields properly...');
     }
   }else{
      if(formEle.exercise && formEle.series && formEle.rest){
         if(formEle.repetitions || formEle.duration){
            routineData.exercises.push(formEle);
        setFormEle({exercise:'',series:'',repetitions:'',duration:'',rest:''});
        setDis();
         }
       }else{
      alert('fill the fields properly...');
       }
   }
   }

const submitHandler =(e)=>{
e.target.preventDefault;
if(modifyRoutine){
if(modifyRoutine.name && modifyRoutine.day){
if(modifyRoutine.exercises.length!=0){
   modifyRoutineData.days[index]=modifyRoutine;
   axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`,JSON.stringify(modifyRoutineData))
   .then((res)=>{
      alert('submit successfully....');
      history.push(`/modify-day/${id}`);
   })
   .catch((err)=>alert(err));

}else{
   alert('kindly add atleast one exercise in routine');
}


}else {
   alert('Fill name and day field properly....')
}
}else{
   if(routineData.name && routineData.day){
      if(routineData.exercises.length!=0){
        let routine={};
         newRoutine.days?routine={name:newRoutine.name,description:newRoutine.description,days:[...newRoutine.days,routineData]}:routine={name:newRoutine.name,description:newRoutine.description,days:[routineData]};
         axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`,JSON.stringify(routine))
         .then((res)=>{
            alert('submit successfully....');
            window.location.reload();
            setRoutineData({name:'',day:'',exercises:[]});
         })
         .catch((err)=>alert(err));
      
      }else{
         alert('kindly add atleast one exercise in routine');
      }
      
      }else {
         alert('Fill name and day field properly....')
      }
}
}


const deleteHandler=(index)=>{
   if(modifyRoutine){
  setDis(index);
modifyRoutine.exercises.splice(index,1);
   }else{
setDis(index);
routineData.exercises.splice(index,1);
   }
}
const fetchData=async(id,i)=>{
var resRoutine =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`);
console.log(resRoutine.data.days[i]);
var resultRoutine=resRoutine.data.days[i];
setModifyRoutine(resultRoutine);
setModifyRoutineData(resRoutine.data)
}

const newFetchData=async(id)=>{
   var resRoutine =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`);
   var resultRoutine=resRoutine.data;
   setNewRoutine(resultRoutine);
   }

const fetchExerData=async()=>{
// exercise Data
var finalResultExer=[];
var resExer =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json');
var resultExer=resExer.data;
for(let id in resultExer){
var res={...resultExer[id],id:id};
 finalResultExer.push(res);
  }
setExerData(finalResultExer);
}

React.useEffect(async()=>{
   if(window.location.href.includes('/modify-routine')){
fetchData(id,index);
fetchExerData();
   }else if(window.location.href.includes('/new-routine')){
newFetchData(id);
fetchExerData();
   }
},[])
    return(
            <Fragment>
               <PageTItle activeMenu="Exercises" motherMenu="Form" />
      
               <div className="row">
                  {
               modifyRoutine?(<div className="card w75 pb-5" style={{position:'relative'}}>
               <div className="card-header">
                     <h4 className="card-title">Editor Dia</h4>
                  </div>
                  <div className='colTwo3 w70 ml-2'>
                                 <div className="form-group">
                                 <p className='input-label'>Nombre</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={modifyRoutine.name}
                                       onChange={(e)=>setModifyRoutine({...modifyRoutine,name:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="enter nombre"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Dia Recomendado</p>
                                 <select className='w100 form-control input-default input-border' name='routine days' id='routineDay' value={modifyRoutine.day} onChange={(e)=>setModifyRoutine({...modifyRoutine,day:e.target.value})}>
                                <option value='none'>
                                  ---select---
                                 </option>    
                                 { days.map((day,i)=>{
                                    return <option value={day} key={i}>
                                   {day}
                                 </option>
                                 })                          
                                
                                 }
                                </select>
                                 </div>
                                 </div>
                        <div className="card-body card-body-bg m-auto">
                  <div className="col-xl-12 col-lg-12 ml-1">
                      <div className='colSix1'>
                          <div className='exercise-heading-text text-center'>Ejercicio</div>
                          <div className='exercise-heading-text text-center'>Series</div>
                          <div className='exercise-heading-text text-center'>Repeticiones</div>
                          <div className='exercise-heading-text text-center'>Duracion</div>
                          <div className='exercise-heading-text text-center'>Descanso</div>
                      </div>
                      <div className='colSix1'>
                                
   <div className="form-group">     
        <Autocomplete
      id="exercise"
      options={exerData}
      renderInput={params => (
        <TextField {...params} label="exercise" variant="outlined" value={formEle.exercise} onChange={({ target }) => setFormEle({...formEle,exercise:target.value})} />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      inputValue={formEle.exercise}
      onChange={(e,v) => {
         console.log(v);
         setFormEle({...formEle,exercise:v.name});
      }}
    />
  <br/>
                                 </div>
                                 <div className="form-group">
                                    <input
                                       type="text"
                                       name='series'
                                       value={formEle.series}
                                       onChange={(e)=>setFormEle({...formEle,series:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Series"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                      id='Repeticiones'
                                       type="text"
                                       name='repetitions'
                                       value={formEle.repetitions}
                                       onChange={(e)=>formEle.duration!=''?document.getElementById('Repeticiones').disabled=true:setFormEle({...formEle,repetitions:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Repeticiones"
                                       autocomplete="off"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                       id='Duracion'
                                       type="text"
                                       name='duration'
                                       value={formEle.duration}
                                       onChange={(e)=>formEle.repetitions!=''?document.getElementById('Duracion').disabled=true:setFormEle({...formEle,duration:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Duracion"
                                       autocomplete="off"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                       type="text"
                                       name='rest'
                                       value={formEle.rest}
                                       onChange={(e)=>setFormEle({...formEle,rest:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Descanso"
                                    />
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' onClick={addHandler}>
                                 +
                                 </button>
                      </div>
                      {
                modifyRoutine.exercises.map((d,i)=>{
                     return <>
                      <div className='colSix1' key={i}>
                                 <div className="form-group">
                                    <p
                                       className="form-control input-default input-border"
                                    style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.exercise}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.series}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.repetitions}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.duration}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.rest}</p>
                                 </div>
                                 <button className='exercise-delete-btn' id={`element${i}`} ref={buttonRef} disabled={dis==i?true:false} onClick={(e)=>deleteHandler(i)}>
                                 <img className="delIcon del-dup-edi-img" src={deleteIcon} alt=""/>
                                 </button>
                      </div>
                     </>
                  })

                      }
                     
                 </div>
                     </div>
                     <button className='mtb-3 submit-btn' onClick={submitHandler} style={{position: 'absolute',bottom: '-1rem',right: '2.7vw'}}>Submit</button>
                  </div>):(<div className="card w75 pb-5" style={{position:'relative'}}>
               <div className="card-header">
                     <h4 className="card-title">Editor Dia</h4>
                  </div>
                  <div className='colTwo3 w70 ml-2'>
                                 <div className="form-group">
                                 <p className='input-label'>Nombre</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={routineData.name}
                                       onChange={(e)=>setRoutineData({...routineData,name:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="enter nombre"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Dia Recomendado</p>
                                 <select className='w100 form-control input-default input-border' name='routine days' id='routineDay' value={routineData.day} onChange={(e)=>setRoutineData({...routineData,day:e.target.value})}>
                                <option value='none'>
                                  ---select---
                                 </option>    
                                 { days.map((day,i)=>{
                                    return <option value={day} key={i}>
                                   {day}
                                 </option>
                                 })                          
                                
                                 }
                                </select>
                                 </div>
                                 </div>
                        <div className="card-body card-body-bg m-auto">
                  <div className="col-xl-12 col-lg-12 ml-1">
                      <div className='colSix1'>
                          <div className='exercise-heading-text text-center'>Ejercicio</div>
                          <div className='exercise-heading-text text-center'>Series</div>
                          <div className='exercise-heading-text text-center'>Repeticiones</div>
                          <div className='exercise-heading-text text-center'>Duracion</div>
                          <div className='exercise-heading-text text-center'>Descanso</div>
                      </div>
                      <div className='colSix1'>
                      <div className="form-group">     
        <Autocomplete
      id="exercise"
      options={exerData}
      renderInput={params => (
        <TextField {...params} label="exercise" variant="outlined" value={formEle.exercise} onChange={({ target }) => setFormEle({...formEle,exercise:target.value})} />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      inputValue={formEle.exercise}
      onChange={(e,v) => {
         console.log(v);
         setFormEle({...formEle,exercise:v.name});
      }}
    />
  <br/>
  </div>
                                 <div className="form-group">
                                    <input
                                       type="text"
                                       name='series'
                                       value={formEle.series}
                                       onChange={(e)=>setFormEle({...formEle,series:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Series"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                     id='Repeticion'
                                       type="text"
                                       name='repetitions'
                                       value={formEle.repetitions}
                                       onChange={(e)=>formEle.duration!=''?document.getElementById('Repeticion').disabled=true:setFormEle({...formEle,repetitions:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Repeticiones"
                                       autocomplete="off"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                       id='Duracions'
                                       type="text"
                                       name='duration'
                                       value={formEle.duration}
                                       onChange={(e)=>formEle.repetitions!=''?document.getElementById('Duracions').disabled=true:setFormEle({...formEle,duration:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Duracion"
                                       autocomplete="off"
                                    />
                                 </div>
                                 <div className="form-group">
                                    <input
                                       type="text"
                                       name='rest'
                                       value={formEle.rest}
                                       onChange={(e)=>setFormEle({...formEle,rest:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="Descanso"
                                    />
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' onClick={addHandler}>
                                 +
                                 </button>
                      </div>
                      {
                routineData.exercises?routineData.exercises.map((d,i)=>{
                     return <>
                      <div className='colSix1' key={i}>
                                 <div className="form-group">
                                    <p
                                       className="form-control input-default input-border"
                                    style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.exercise}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.series}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.repetitions}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.duration}</p>
                                 </div>
                                 <div className="form-group">
                                 <p
                                       className="form-control input-default input-border"
                                       style={{padding: '0.5vw 0',textAlign: 'center'}}>{d.rest}</p>
                                 </div>
                                 <button className='exercise-delete-btn' id={`element${i}`} ref={buttonRef} disabled={dis==i?true:false} onClick={(e)=>deleteHandler(i)}>
                                 <img className="delIcon del-dup-edi-img" src={deleteIcon} alt=""/>
                                 </button>
                      </div>
                     </>
                  }):(<div></div>)

                      }
                     
                 </div>
                     </div>
                     <button className='mtb-3 submit-btn' onClick={submitHandler} style={{position: 'absolute',bottom: '-1rem',right: '2.7vw'}}>Submit</button>
                  </div>)
                     }
                  <div className="clients-statics stat-sec">
<h3 className="title">
    Statistics
</h3>
                  </div>
                  </div>
                  </Fragment>
    )
}


export default AddNewRoutine;