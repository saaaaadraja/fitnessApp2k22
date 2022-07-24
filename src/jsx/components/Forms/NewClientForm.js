import React, { Fragment } from 'react';
import PageTItle from "../../layouts/PageTitle";
import userImg from '../../../images/avatar/8.jpg'
import deleteIcon from '../../../images/icon/del.png'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
// import Autocomplete from 'react-autocomplete';
import { storage } from '../../../firebase';
import { ref,uploadBytes} from 'firebase/storage';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const IOSSwitch = styled((props) => (
   <Switch  focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
 ))(({ theme }) => ({
   width: 42,
   height: 26,
   padding: 0,
   '& .MuiSwitch-switchBase': {
     padding: 0,
     margin: 2,
     transitionDuration: '300ms',
     '&.Mui-checked': {
       transform: 'translateX(16px)',
       color: '#fff',
       '& + .MuiSwitch-track': {
         backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
         opacity: 1,
         border: 0,
       },
       '&.Mui-disabled + .MuiSwitch-track': {
         opacity: 0.5,
       },
     },
     '&.Mui-focusVisible .MuiSwitch-thumb': {
       color: '#33cf4d',
       border: '6px solid #fff',
     },
     '&.Mui-disabled .MuiSwitch-thumb': {
       color:
         theme.palette.mode === 'light'
           ? theme.palette.grey[100]
           : theme.palette.grey[600],
     },
     '&.Mui-disabled + .MuiSwitch-track': {
       opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
     },
   },
   '& .MuiSwitch-thumb': {
     boxSizing: 'border-box',
     width: 22,
     height: 22,
   },
   '& .MuiSwitch-track': {
     borderRadius: 26 / 2,
     backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
     opacity: 1,
     transition: theme.transitions.create(['background-color'], {
       duration: 500,
     }),
   },
 }));



const NewClientForm=()=>{
   const [modifyData,setModifyData]=React.useState();
   const [data,setData] = React.useState({name:'',dob:'',membershipDate:'',email:'',password:'',routine:[],objName:'',objValue:'',pic:''});
   const [img, setImg] = React.useState(userImg);
   const [imgUpload, setImgUpload] = React.useState();
   const [routines,setRoutines]=React.useState([]);
   const [routineFields,setRoutineFields]=React.useState({routine:'',startDate:'',endDate:''});
   const [obj,setObj] = React.useState(['Agua','Biceps','Grasa','Peso',' Pierna','Tripa','Musculo']);
   const [dis,setDis]=React.useState();
   const [input,setInput]=React.useState('');
   const buttonRef = React.useRef();
   const history =useHistory();
   const params =useParams();
   const {id}=params;

   const submitHandler=(e)=>{
      e.target.preventDefault;
      if(modifyData){
         if(imgUpload){
            const imgRef = ref(storage,`clientImgs/${imgUpload.name}`);
            uploadBytes(imgRef,imgUpload)
            .then((res)=>{console.log(res);
          })
            .catch((err)=>console.log(err));
          }

          window.setTimeout(()=>{  
            console.log(modifyData);  
            if(modifyData.name && modifyData.routine &&modifyData.objStartDate && modifyData.objEndDate && modifyData.objStatistic && modifyData.email && modifyData.password && modifyData.dob && modifyData.objName && modifyData.objValue && modifyData.membershipDate && modifyData.pic)
            {
               axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients/${id}.json`,JSON.stringify(modifyData))
               .then((res)=>{
                  setDis();
                  alert('submit successfully....');
                  history.push('/')
               })
               .catch((err)=>alert(err));
            }else{
               alert('Kindly fill the form properly');
            }},3000)
     
      }else{
            if(imgUpload){
              const imgRef = ref(storage,`clientImgs/${imgUpload.name}`);
              uploadBytes(imgRef,imgUpload)
              .then((res)=>{console.log(res);
            })
              .catch((err)=>console.log(err));
            }

         window.setTimeout(()=>{
            console.log(data);
            if(data.name && data.routine && data.objStartDate && data.objEndDate && data.dob && data.email && data.membershipDate && data.objName && data.objStatistic && data.objValue && data.password && data.pic)
            {
               axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients.json',JSON.stringify(data))
               .then((res)=>{
                  alert('submit successfully....');
                  setData({name:'',routine:[],startDate:'',endDate:'',dob:'',email:'',membershipDate:'',objName:'',objValue:'',password:''});
                  setDis();
               })
               .catch((err)=>alert(err));
            }else{
               alert('Kindly fill the form properly');
            }
         },3000)
     
      
      }
   }


   const fetchData=async(id)=>{
      var resClient =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients/${id}.json`);
      var resultClient=resClient.data;
      setModifyData(resultClient);
      console.log(resultClient);
      }

      const fetchRoutines=async()=>{
            var finalResult=[];
            var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json');
            var result=res.data;
            for(let id in result){
             finalResult.push({name:result[id].name,id:id});
              }
           setRoutines(finalResult);
      }
   
   React.useEffect(()=>{
    
      if(window.location.href.includes('/modify-client')){
         fetchData(id);
         fetchRoutines();
            }else{
      fetchRoutines();
            }
   },[])
  

   const uploadImg=()=>{
      if(modifyData){
         var ele = document.getElementById('imgFile1');
         ele.click();
      }else{
         var ele = document.getElementById('imgFile');
         ele.click();
      }
   
   }

   const onImageChange = (e) => {
      if(modifyData){
         setModifyData({...modifyData,pic:e.target.files[0].name});
      }else{
         setData({...data,pic:e.target.files[0].name});
      }
      setImgUpload(e.target.files[0]);
      const [file] = e.target.files;
      setImg(URL.createObjectURL(file));
    };


    const addHandler=(e)=>{
      if(modifyData){
     if(routineFields.routine && routineFields.startDate && routineFields.endDate){
      setModifyData({...modifyData,routine:[...modifyData.routine,routineFields]});
      setRoutineFields({routine:'',startDate:'',endDate:''});
     }else{
alert('Kindly Fill The Routine Fields Properly....')
     }
   }else{
      if(routineFields.routine && routineFields.startDate && routineFields.endDate){
         setData({...data,routine:[...data.routine,routineFields]});
         setRoutineFields({routine:'',startDate:'',endDate:''});
        }else{
   alert('Kindly Fill The Routine Fields Properly....')
        }
   }
   }

   const deleteHandler=(index)=>{
      if(modifyData){
     setDis(index);
   modifyData.routine.splice(index,1);
      }else{
   setDis(index);
   data.routine.splice(index,1);
      }
   }

    return(
            <Fragment>
               <PageTItle activeMenu="New Client" motherMenu="Form" />
      
               <div className="row">
               <div className="card w100">
                        <div className="card-header">
                           <p className='title-descrip'>Here is a brief overview of activities from your clients.</p>
                        </div>
              {modifyData?(<div className="card-body colTwo5">
                  <div className="col-xl-12 col-lg-12">
                     
                        
                           <div className="basic-form">
                              <form onSubmit={(e) => e.preventDefault()}>
                                 <div className="form-group">
                                 <p className='input-label'>Name</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={modifyData.name}
                                       onChange={(e)=>setModifyData({...modifyData,name:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter name"
                                    />
                                 </div>
<div className='colFour2' style={{marginTop:'3vw'}}>                           
   <div className="form-group">     
        <Autocomplete
      id="routines"
      options={routines}
      renderInput={params => (
        <TextField {...params} label="Routines" variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={routineFields.routine}
      onChange={(_event, newRoutine) =>{
         var routine=newRoutine.name;
         setRoutineFields({...routineFields,routine:routine})
      }}
    />
  <br/>
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>Start Date</p>
                                    <input
                                       type="date"
                                       name='startDate'
                                       value={routineFields.startDate}
                                       onChange={(e)=>setRoutineFields({...routineFields,startDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="start date"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>End Date</p>
                                    <input
                                       type="date"
                                       name='endDate'
                                       value={routineFields.endDate}
                                       onChange={(e)=>setRoutineFields({...routineFields,endDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="end date"
                                    />
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea'}} onClick={addHandler}>
                                 +
                                 </button>
                                 </div>
                                 
                                    {modifyData.routine? modifyData.routine.map((d,i)=>{
                                       return <div className='colFour2 mb-2' key={i}>   
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.routine}</div>
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.startDate}</div>
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.endDate}</div>
                                     <button className='exercise-delete-btn' id={`element${i}`} ref={buttonRef} disabled={dis==i?true:false} onClick={(e)=>deleteHandler(i)}>
                                 <img  style={{height: '4vw',padding: '0.5vw',width: '4vw'}} src={deleteIcon} alt=""/>
                                 </button>
                                       </div>
                                    }):(<div></div>)
                                 }
<div className='colFive3' style={{marginTop:'3vw'}}>    
<div className="form-group"> 
<p className='input-label mt--2'>Objective Name</p>
<input
                                       type="text"
                                       name='object name'
                                       value={modifyData.objName}
                                       onChange={(e)=>setModifyData({...modifyData,objName:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter object name"
                                    />
  </div>

<div className="form-group">     
        <Autocomplete
      id="routines"
      options={obj}
      renderInput={params => (
        <TextField {...params} label="statistic" variant="outlined" onChange={({ target }) => setModifyData({...modifyData,objStatistic:target.value})} />
      )}
      getOptionLabel={option => option}
      sx={{ width: 270,padding:0 }}
      inputValue={modifyData.objStatistic}
      onChange={(e,v) => {
         setModifyData({...modifyData,objStatistic:v});
      }}
      // value={routineFields.routine}
      // onChange={(_event, newRoutine) =>{
      //    var routine=newRoutine.name;
      //    setRoutineFields({...routineFields,routine:routine})
      // }}
    />
  <br/>
                                 </div>
                                 <div className="form-group ">
                                 <p className='input-label mt--2'>Value</p>
                                    <input
                                       type="number"
                                       name='objValue'
                                       value={modifyData.objValue}
                                       onChange={(e)=>setModifyData({...modifyData,objValue:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="objective value"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>Start Date</p>
                                    <input
                                       type="date"
                                       name='startDate'
                                       value={modifyData.objStartDate}
                                       onChange={(e)=>setModifyData({...modifyData,objStartDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="start date"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>End Date</p>
                                    <input
                                       type="date"
                                       name='endDate'
                                       value={modifyData.objEndDate}
                                       onChange={(e)=>setModifyData({...modifyData,objEndDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="end date"
                                    />
                                 </div>
                                 </div>
                                 <div>
                               </div>
                               <button className='mtb-3 submit-btn' onClick={submitHandler}>Submit</button>
                              </form>
                           </div>
                        </div>
                        <div className='col-xl-12 col-lg-12'>
                        <FormGroup style={{marginLeft:'9vw'}}>
                              <FormControlLabel
                               label="Status"
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
      />
                              </FormGroup>
                            <div className='img-div'>
                                <img className='w100 img-border' src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/clientImgs%2F${modifyData.pic}?alt=media&token=5f34507a-528d-4abf-a21b-55a7cef5d205`} alt=''/>
                                <button className='modify-btn' onClick={uploadImg}>Modify</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/*" id='imgFile1' onChange={onImageChange}/>
                            <div className="form-group">
                                 <p className='input-label'>Date of Birth</p>
                                    <input
                                       type="date"
                                       name='dob'
                                       value={modifyData.dob}
                                       onChange={(e)=>setModifyData({...modifyData,dob:e.target.value})}
                                       className="form-control input-default input-border "
                                       // placeholder="enter name"
                                       disabled
                                       style={{backgroundColor:'#a9a9a942',height:'3vw'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Member Since</p>
                                    <input
                                       type="date"
                                       name='membershipDate'
                                       value={modifyData.membershipDate}
                                       onChange={(e)=>setModifyData({...modifyData,membershipDate:e.target.value})}
                                       className="form-control input-default input-border "
                                       // placeholder="enter name"
                                       disabled
                                       style={{backgroundColor:'#a9a9a942',height:'3vw'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Email</p>
                                    <input
                                       type="email"
                                       name='email'
                                       value={modifyData.email}
                                       onChange={(e)=>setModifyData({...modifyData,email:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter email"
                                       disabled
                                       style={{backgroundColor:'#a9a9a942',height:'3vw'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Password</p>
                                    <input
                                       type="password"
                                       name='password'
                                       value={modifyData.password}
                                       onChange={(e)=>setModifyData({...modifyData,password:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter password"
                                       disabled
                                       style={{backgroundColor:'#a9a9a942',height:'3vw'}}
                                    />
                                 </div>
                        </div>
                       
                     </div>):(<div className="card-body colTwo5">
                  <div className="col-xl-12 col-lg-12">
                     
                        
                           <div className="basic-form">
                              <form onSubmit={(e) => e.preventDefault()}>
                                 <div className="form-group">
                                 <p className='input-label'>Name</p>
                                    <input
                                       type="text"
                                       name='name'
                                       value={data.name}
                                       onChange={(e)=>setData({...data,name:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter name"
                                    />
                                 </div>
                                 <div className='colFour2' style={{marginTop:'3vw'}}>                           
   <div className="form-group">     
        <Autocomplete
      id="routines"
      options={routines}
      renderInput={params => (
        <TextField {...params} label="Routines" variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={routineFields.routine}
      onChange={(_event, newRoutine) =>{
         var routine=newRoutine.name;
         setRoutineFields({...routineFields,routine:routine})
      }}
    />
  <br/>
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>Start Date</p>
                                    <input
                                       type="date"
                                       name='startDate'
                                       value={routineFields.startDate}
                                       onChange={(e)=>setRoutineFields({...routineFields,startDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="start date"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>End Date</p>
                                    <input
                                       type="date"
                                       name='endDate'
                                       value={routineFields.endDate}
                                       onChange={(e)=>setRoutineFields({...routineFields,endDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="end date"
                                    />
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea'}} onClick={addHandler}>
                                 +
                                 </button>
                                 </div>
                                 
                                    {data.routine? data.routine.map((d,i)=>{
                                       return <div className='colFour2 mb-2' key={i}>   
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.routine}</div>
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.startDate}</div>
                                       <div className='input-border' style={{height: '3vw',padding: '0.5vw'}}>{d.endDate}</div>
                                     <button className='exercise-delete-btn' id={`element${i}`} ref={buttonRef} disabled={dis==i?true:false} onClick={(e)=>deleteHandler(i)}>
                                 <img  style={{height: '4vw',padding: '0.5vw',width: '4vw'}} src={deleteIcon} alt=""/>
                                 </button>
                                       </div>
                                    }):(<div></div>)
                                 }
                                
                                <div className='colFive3' style={{marginTop:'3vw'}}>    
<div className="form-group"> 
<p className='input-label mt--2'>Objective Name</p>
<input
                                       type="text"
                                       name='object name'
                                       value={data.objName}
                                       onChange={(e)=>setData({...data,objName:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter object name"
                                    />
  </div>

<div className="form-group">     
        <Autocomplete
      id="routines"
      options={obj}
      renderInput={params => (
        <TextField {...params} label="statistic" variant="outlined" onChange={({ target }) => setData({...data,objStatistic:target.value})} />
      )}
      getOptionLabel={option => option}
      sx={{ width: 270,padding:0 }}
      inputValue={data.objStatistic}
      onChange={(e,v) => {
         setData({...data,objStatistic:v});
      }}
      // value={routineFields.routine}
      // onChange={(_event, newRoutine) =>{
      //    var routine=newRoutine.name;
      //    setRoutineFields({...routineFields,routine:routine})
      // }}
    />
  <br/>
                                 </div>
                                 <div className="form-group ">
                                 <p className='input-label mt--2'>Value</p>
                                    <input
                                       type="number"
                                       name='objValue'
                                       value={data.objValue}
                                       onChange={(e)=>setData({...data,objValue:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="objective value"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>Start Date</p>
                                    <input
                                       type="date"
                                       name='startDate'
                                       value={data.objStartDate}
                                       onChange={(e)=>setData({...data,objStartDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="start date"
                                    />
                                 </div>
                                 <div className="form-group mt--2">
                                 <p className='input-label'>End Date</p>
                                    <input
                                       type="date"
                                       name='endDate'
                                       value={data.objEndDate}
                                       onChange={(e)=>setData({...data,objEndDate:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="end date"
                                    />
                                 </div>
                                 </div>
                             
                                 <div>
                          
                               </div>
                               <button className='mtb-3 submit-btn' onClick={submitHandler}>Submit</button>
                              </form>
                           </div>
                        </div>
                        <div className='col-xl-12 col-lg-12'>
                        <FormGroup style={{marginLeft:'9vw'}}>
                              <FormControlLabel
                               label="Status"
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
      />
                              </FormGroup>
                            <div className='img-div'>
                                <img className='w100 img-border ' src={img} alt=''/>
                                <button className='modify-btn' onClick={uploadImg}>Modify IMG</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/*" id='imgFile' onChange={onImageChange}/>
                            <div className="form-group">
                                 <p className='input-label'>Date of Birth</p>
                                    <input
                                       type="date"
                                       name='dob'
                                       value={data.dob}
                                       onChange={(e)=>setData({...data,dob:e.target.value})}
                                       className="form-control input-default input-border "
                                       // placeholder="enter name"
                                       style={{height:'3vw',backgroundColor:'#ffff'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Member Since</p>
                                    <input
                                       type="date"
                                       name='membershipDate'
                                       value={data.membershipDate}
                                       onChange={(e)=>setData({...data,membershipDate:e.target.value})}
                                       className="form-control input-default input-border "
                                       // placeholder="enter name"
                                       style={{height:'3vw',backgroundColor:'#ffff'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Email</p>
                                    <input
                                       type="email"
                                       name='email'
                                       value={data.email}
                                       onChange={(e)=>setData({...data,email:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter email"
                                       style={{height:'3vw',backgroundColor:'#ffff'}}
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Password</p>
                                    <input
                                       type="password"
                                       name='password'
                                       value={data.password}
                                       onChange={(e)=>setData({...data,password:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="enter password"
                                       style={{height:'3vw',backgroundColor:'#ffff'}}
                                    />
                                 </div>
                        </div>
                     </div>)
}
                  </div>
                  {/* <div className="clients-statics stat-sec">
<h3 className="title">
    Statistics
</h3>
                  </div> */}
                  </div>
                  </Fragment>
    )
}


export default NewClientForm;