import React, { Fragment } from 'react';
import PageTItle from "../../layouts/PageTitle";
import axios from 'axios';
// import Autocomplete from 'react-autocomplete';
import { useHistory, useParams } from 'react-router-dom';

const AddMuscles=()=>{
    const [data,setData] =React.useState({muscle:''});
    const [modifyData,setModifyData] =React.useState();
    const history =useHistory();
    const params =useParams();
    const {id}=params;


    const CatAndMusAddition=(e)=>{
            e.preventDefault();
            if(modifyData){
                if(modifyData.muscle){
                    axios.put(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Muscles/${id}.json`,JSON.stringify(modifyData))
                    .then((res)=>{
                      alert('New muscle submitted successfully....');
                      history.push('/table-muscles')
                   })
                   .catch((err)=>alert(err));
                  }else{
                    alert('kindly fill the name properly...');
                  }
            }else{
              if(data.muscle){
                axios.post(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Muscles.json`,JSON.stringify(data))
                .then((res)=>{
                  alert('New muscle submitted successfully....');
                setData({muscle:''});
               })
               .catch((err)=>alert(err));
              }else{
                alert('kindly fill the name properly...');
              }
            }
      }

      const fetchData=async(id)=>{
        var resExer =await axios.get(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Muscles/${id}.json`);
        var resultExer=resExer.data;
        setModifyData(resultExer);
        console.log(resultExer);
        }

        React.useEffect(()=>{
            if(window.location.href.includes('/modify-muscle')){
               fetchData(id);
                  }
         },[])

    return(
            <Fragment>
               <PageTItle activeMenu="New Muscle" motherMenu="Form" />
      
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
                                       value={modifyData.muscle}
                                       onChange={(e)=>setModifyData({...modifyData,muscle:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="name"
                                    />
                                 </div>

                               <button className='mtb-3 submit-btn'  onClick={CatAndMusAddition}>Submit</button>
                              </form>
                           </div>
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
                                       value={data.muscle}
                                       onChange={(e)=>setData({...data,muscle:e.target.value})}
                                       className="form-control input-default input-border "
                                       placeholder="name"
                                    />
                                 </div>
                               <button className='mtb-3 submit-btn' onClick={CatAndMusAddition}>Submit</button>
                              </form>
                           </div>
                        </div>
                     </div>)
}
                  </div>
                  </div>
                  </Fragment>
    )
}


export default AddMuscles;