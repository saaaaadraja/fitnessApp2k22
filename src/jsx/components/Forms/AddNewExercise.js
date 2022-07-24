import React, { Fragment } from 'react';
import PageTItle from "../../layouts/PageTitle";
import exer1 from '../../../images/big/img2.jpg'
import exer2 from '../../../images/big/img7.jpg'
import axios from 'axios';
// import Autocomplete from 'react-autocomplete';
import { useHistory, useParams } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { storage } from '../../../firebase';
import { ref,uploadBytes} from 'firebase/storage';

const AddNewExercise=()=>{
const [modifyData,setModifyData]=React.useState();
const [data,setData] = React.useState({name:'',muscles:[],category:[],description:'',link:'',pic:'',gif:'',result:'',resource:[],warning:''});
const [img, setImg] = React.useState(exer2);
const [vid, setVid] = React.useState(exer1);
const [imgUpload, setImgUpload] = React.useState();
const [vidUpload, setVidUpload] = React.useState();
const [cat, setCat] = React.useState([]);
const [autoFillVal,setAutoFillVal] = React.useState('');
const [autoFillRes,setAutoFillRes] = React.useState('');
const [autoFillMus,setAutoFillMus] = React.useState('');
const [categories,setCategories]=React.useState([]);
const [resources,setResources]=React.useState([]);
const [muscle,setMuscle]=React.useState([]);
const [paremeters,setParemeters]=React.useState(['Time','Weight']);
const history =useHistory();
const params =useParams();
const {id}=params;

const submitHandler=(e)=>{
e.preventDefault;
console.log(data);
if(modifyData){
   if(imgUpload){
      const imgRef = ref(storage,`exerciseImgs/${imgUpload.name}`);
      uploadBytes(imgRef,imgUpload)
      .then((res)=>{console.log(res);
    })
      .catch((err)=>console.log(err));
    }
    if(vidUpload){
      const vidRef = ref(storage,`exerciseVids/${vidUpload.name}`);
      uploadBytes(vidRef,vidUpload)
      .then((res)=>{console.log(res);
    })
      .catch((err)=>console.log(err));
    }

   window.setTimeout(()=>{
      if(modifyData.name && modifyData.muscles && modifyData.category && modifyData.description && 
         modifyData.pic && modifyData.gif  && modifyData.result && 
         modifyData.resource && modifyData.warning && modifyData.link)
      {
         axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises/${id}.json`,JSON.stringify(modifyData))
         .then((res)=>{
            console.log(res);
            alert('submit successfully....');
            history.push('/table-exercisetable-basic')
         })
         .catch((err)=>alert(err));
      }else{
         alert('Kindly fill the form properly');
      }
   },3000)
  
}else{
   if(imgUpload){
      const imgRef = ref(storage,`exerciseImgs/${imgUpload.name}`);
      uploadBytes(imgRef,imgUpload)
      .then((res)=>{console.log(res);
    })
      .catch((err)=>console.log(err));
    }
    if(vidUpload){
      const vidRef = ref(storage,`exerciseVids/${vidUpload.name}`);
      uploadBytes(vidRef,vidUpload)
      .then((res)=>{console.log(res);
    })
      .catch((err)=>console.log(err));
    }

    window.setTimeout(()=>{
      if(data.name && data.muscles && data.category && data.description  && data.pic && data.gif
    && data.resource && data.result && data.warning && data.link)
{
   axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json',JSON.stringify(data))
   .then((res)=>{
      alert('submit successfully....');
      setData({name:'',muscles:[],category:[],description:'',link:'' ,warning:'',result:'',resource:[] });
   })
   .catch((err)=>alert(err));
}else{
   alert('Kindly fill the form properly');
}
    },3000)

}

}

const fetchData=async(id)=>{
   var resExer =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises/${id}.json`);
   var resultExer=resExer.data;
   setModifyData(resultExer);
   console.log(resultExer);
   }
   const fetchCategories=async(val)=>{
      if(val=='Muscles'){
         var finalResult=[];
         var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Muscles.json');
         var result=res.data;
         for(let id in result){
          finalResult.push({name:result[id].muscle});
           }
        setMuscle(finalResult);
      }else if(val=='Categories'){
         var finalResult=[];
         var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Categories.json');
         var result=res.data;
         for(let id in result){
          finalResult.push({name:result[id].category});
           }
        setCategories(finalResult);
      }else if(val=="Resources"){
            var finalResult=[];
            var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Resources.json');
            var result=res.data;
            for(let id in result){
             finalResult.push({name:result[id].resource});
              }
           setResources(finalResult);
         }
      
   
   }

React.useEffect(()=>{
   if(window.location.href.includes('/modify-exercise')){
      fetchData(id);
      fetchCategories('Categories');
      fetchCategories('Muscles');
      fetchCategories('Resources');
         }else{
      fetchCategories('Categories');
      fetchCategories('Muscles');
      fetchCategories('Resources');
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

const uploadVid=()=>{
   if(modifyData){
      var ele = document.getElementById('vidFile1');
      ele.click();
   }else{
      var ele = document.getElementById('vidFile');
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
 
 const onVidChange = (e) => {
   if(modifyData){
      setModifyData({...modifyData,gif:e.target.files[0].name});
   }else{
      setData({...data,gif:e.target.files[0].name});
   }
   setVidUpload(e.target.files[0]);
   const [file] = e.target.files;
   setVid(URL.createObjectURL(file));
 };
 function handleKeyDownRes(){
   if(!autoFillRes.trim()) {alert('fill resource field properly')}else{
   if(modifyData){
      setCat([...cat, autoFillRes])
      setModifyData({...modifyData,resource:[...modifyData.resource,autoFillRes]});
      setAutoFillRes('');
   }else{
      setCat([...cat, autoFillRes])
      setData({...data,resource:[...data.resource,autoFillRes]});
      setAutoFillRes('');
   }
}
 
}
 function handleKeyDown(){
      if(!autoFillVal.trim()) {alert('fill category field properly')}else{
      if(modifyData){
         setCat([...cat, autoFillVal])
         setModifyData({...modifyData,category:[...modifyData.category,autoFillVal]});
         setAutoFillVal('');
      }else{
         setCat([...cat, autoFillVal])
         setData({...data,category:[...data.category,autoFillVal]});
         setAutoFillVal('');
      }
   }
    
}
function handleKeyDownMus(){
   if(!autoFillMus.trim()){ alert('kindly fill muscles field')}else{
   if(modifyData){
      // setCat([...cat, val])
      setModifyData({...modifyData,muscles:[...modifyData.muscles,autoFillMus]});
      setAutoFillMus('');
   }else{
      // setCat([...cat, val])
      setData({...data,muscles:[...data.muscles,autoFillMus]});
      setAutoFillMus('');
   }
}
 
}
function removeCat(index){
   if(modifyData){
      setModifyData({...modifyData,category:modifyData.category.filter((el, i) => i !== index)})
   }else{
      setData({...data,category:data.category.filter((el, i) => i !== index)})
   }
}
function removeMus(index){
   if(modifyData){
      setModifyData({...modifyData,muscles:modifyData.muscles.filter((el, i) => i !== index)})
   }else{
      setData({...data,muscles:data.muscles.filter((el, i) => i !== index)})
   }
}

    return(
            <Fragment>
               <PageTItle activeMenu="New Exercise" motherMenu="Form" />
      
               <div className="row">
               <div className="card w75">
                        <div className="card-header">
                           <p className='title-descrip'>Here is a brief overview of activities from your clients.</p>
                        </div>
             {  modifyData?(<div className="card-body colTwo6">
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
                                       placeholder="name"
                                    />
                                 </div>
                                <div className='colTwo7'>
                                 <div className="form-group">
                        
        {/* <p className='input-label'>Muscles</p> */}
        <Autocomplete
        className='mt-2'
      id="mucles"
      options={muscle}
      renderInput={params => (
        <TextField {...params} label="Mucles" value={autoFillMus} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={'autoFillMus'}
      onChange={(_event, newMuscle) =>{
         var musc=newMuscle.name;
        setAutoFillMus(musc);
            }}
    />
  <br/>
  <div className="tags-input-container" style={{margin:'0'}}>
            { modifyData.muscles.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeMus(index)}>&times;</span>
                </div>
            )) }
    
        </div>
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.8vw'}} onClick={handleKeyDownMus}>
                                 +
                                 </button>
                                 </div>
                                 <div className='colTwo7'>
                                 <div className="form-group">
                      
        {/* <p className='input-label'>Category</p> */}
        <Autocomplete
        className='mt-2'
      id="categories"
      options={categories}
      renderInput={params => (
        <TextField {...params} label="Categories" value={autoFillVal} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={autoFillVal}
      onChange={(_event, newCat) =>{
         var cat=newCat.name;
        setAutoFillVal(cat);
            }}
    />
  <br/>
  <div className="tags-input-container" style={{margin:'0'}}>
            { modifyData.category.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeCat(index)}>&times;</span>
                </div>
            )) }
    
        </div>
  </div>
<button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.8vw'}} onClick={handleKeyDown}>
                                 +
                                 </button>
                                 </div>

                               
                                 <div className="form-group">
                                 <p className='input-label'>Result</p>
                                 <select className='w100 form-control input-default input-border' name='routine days' id='routineDay' value={modifyData.result} onChange={(e)=>setModifyData({...modifyData,result:e.target.value})}>
                                <option value='none'>
                                  ---select---
                                 </option>    
                                 { paremeters.map((p,i)=>{
                                    return <option value={p} key={i}>
                                   {p}
                                 </option>
                                 })                          
                                
                                 }
                                </select>
                                 </div>
                                 <div className='colTwo7'>
                                 <div className="form-group">
                  
        {/* <p className='input-label'>Category</p> */}
        <Autocomplete
        className='mt-2'
      id="resources"
      options={resources}
      renderInput={params => (
        <TextField {...params} label="Resources" value={autoFillRes} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={autoFillVal}
      onChange={(_event, newRes) =>{
         var res=newRes.name;
        setAutoFillRes(res);
            }}
    />
  <br/>
  <div className="tags-input-container" style={{margin:'0'}}>
            { modifyData.resource.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeCat(index)}>&times;</span>
                </div>
            )) }
    
        </div>
  </div>
<button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.8vw'}} onClick={handleKeyDownRes}>
                                 +
                                 </button>
                                 </div>
                                   <div className="form-group">
                                 <p className='input-label'>video Link</p>
                                    <input
                                       type="text"
                                       name='link'
                                       value={modifyData.link}
                                       onChange={(e)=>setModifyData({...modifyData,link:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="video Link"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Description</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="description"
                                       name='description'
                                       value={modifyData.description}
                                       onChange={(e)=>setModifyData({...modifyData,description:e.target.value})}
                                       cols='10'
                                       rows='15'
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Warning</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="warning"
                                       name='warning'
                                       value={modifyData.warning}
                                       onChange={(e)=>setModifyData({...modifyData,warning:e.target.value})}
                                       cols='10'
                                       rows='15'
                                    />
                                 </div>
                               <button className='mtb-3 submit-btn' onClick={submitHandler}>Submit</button>
                              </form>
                           </div>
                        </div>
                        <div className='col-xl-12 col-lg-12'>
                            <div className='add-img-div'>
                                <img className='w100 img-border h15' src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/exerciseImgs%2F${modifyData.pic}?alt=media&token=fa0d47b0-656a-41e0-a811-982a959dde75`} alt=''/>
                                <button className='modify-btn add-img-button' onClick={uploadImg}>Add Image</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/*" id='imgFile1' onChange={onImageChange}/>
                            <div className='add-img-div mt-5'>
                                <img className='w100 img-border h15' src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/exerciseVids%2F${modifyData.gif}?alt=media&token=e1565eed-32aa-420f-b503-ea3af8283621`} alt=''/>
                                <button className='modify-btn add-img-button' onClick={uploadVid}>Add Video</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/gif,video/mp4,video/x-m4v,video/*" id='vidFile1' onChange={onVidChange}/>
                        </div>
                     </div>):(<div className="card-body colTwo6">
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
                                       placeholder="name"
                                    />
                                 </div>
                                 <div className='colTwo7'>
                                 <div className="form-group">
                         
        {/* <p className='input-label'>Muscles</p> */}
        <Autocomplete
        className='mt-2'
      id="mucles"
      options={muscle}
      renderInput={params => (
        <TextField {...params} label="Mucles" value={autoFillMus} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={'autoFillMus'}
      onChange={(_event, newMuscle) =>{
         var musc=newMuscle.name;
        setAutoFillMus(musc);
            }}
    />
  <br/>
  <div className="tags-input-container" style={{margin:'0'}}>
            { data.muscles.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeMus(index)}>&times;</span>
                </div>
            )) }
    
        </div>
                                 </div>
                                 <button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.5vw'}} onClick={handleKeyDownMus}>
                                 +
                                 </button>
                                 </div>
                                 <div className='colTwo7'>
                                 <div className="form-group">
                    
        {/* <p className='input-label'>Category</p> */}
        <Autocomplete
        className='mt-2'
      id="categories"
      options={categories}
      renderInput={params => (
        <TextField {...params} label="Categories" value={autoFillVal} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={autoFillVal}
      onChange={(_event, newCat) =>{
         var cat=newCat.name;
        setAutoFillVal(cat);
            }}
    />
  <br/>
  <div className="tags-input-container" style={{margin:'0'}}>
            { data.category.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeCat(index)}>&times;</span>
                </div>
            )) }
    
        </div>
  </div>
<button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.8vw'}} onClick={handleKeyDown}>
                                 +
                                 </button>
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Result</p>
                                 <select className='w100 form-control input-default input-border' name='routine days' id='routineDay' value={data.result} onChange={(e)=>setData({...data,result:e.target.value})}>
                                <option value='none'>
                                  ---select---
                                 </option>    
                                 { paremeters.map((p,i)=>{
                                    return <option value={p} key={i}>
                                   {p}
                                 </option>
                                 })                          
                                
                                 }
                                </select>
                                 </div>
                                 <div className='colTwo7'>
                                 <div className="form-group">
                        
        {/* <p className='input-label'>Category</p> */}
        <Autocomplete
        className='mt-2'
      id="resources"
      options={resources}
      renderInput={params => (
        <TextField {...params} label="Resources" value={autoFillRes} variant="outlined" />
      )}
      getOptionLabel={option => option.name}
      sx={{ width: 270,padding:0 }}
      value={autoFillVal}
      onChange={(_event, newRes) =>{
         var res=newRes.name;
        setAutoFillRes(res);
            }}
    />
  <br/>
  <div className="tags-input-container">
            { data.resource.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeCat(index)}>&times;</span>
                </div>
            )) }
    
        </div>
  </div>
<button className='exercise-delete-btn routine-btn' style={{background:'#3e88ea',marginTop:'0.8vw'}} onClick={handleKeyDownRes}>
                                 +
                                 </button>
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>video Link</p>
                                    <input
                                       type="text"
                                       name='link'
                                       value={data.link}
                                       onChange={(e)=>setModifyData({...data,link:e.target.value})}
                                       className="form-control input-default input-border"
                                       placeholder="video Link"
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Description</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="description"
                                       name='description'
                                       value={data.description}
                                       onChange={(e)=>setData({...data,description:e.target.value})}
                                       cols='10'
                                       rows='15'
                                    />
                                 </div>
                                 <div className="form-group">
                                 <p className='input-label'>Warning</p>
                                    <textarea
                                       className="form-control input-default input-border"
                                       placeholder="warning"
                                       name='warning'
                                       value={data.warning}
                                       onChange={(e)=>setData({...data,warning:e.target.value})}
                                       cols='10'
                                       rows='15'
                                    />
                                 </div>
 
      
                               <button className='mtb-3 submit-btn' onClick={submitHandler} >Submit</button>
                              </form>
                           </div>
                        </div>
                        <div className='col-xl-12 col-lg-12'>
                            <div className='add-img-div'>
                                <img className='w100 img-border h15' src={img} alt=''/>
                                <button className='modify-btn add-img-button' onClick={uploadImg}>Add Image</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/*" id='imgFile' onChange={onImageChange}/>
                            <div className='add-img-div mt-5'>
                                <img className='w100 img-border h15' src={vid} alt=''/>
                                <button className='modify-btn add-img-button' onClick={uploadVid}>Add Video</button>
                            </div>
                            <input style={{display:'none'}} type='file' accept="image/gif,video/mp4,video/x-m4v,video/*" id='vidFile' onChange={onVidChange}/>
                        </div>
                     </div>)
}
                  </div>
                  <div className="clients-statics stat-sec">
<h3 className="title">
    Statistics
</h3>
                  </div>
                  </div>
                  </Fragment>
    )
}


export default AddNewExercise;