import React, { useState } from "react";
//** Import Image */
import map from "../../../images/map.png";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import axios from "axios";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

// images
import duplicate from '../../../images/icon/dup.png'
import deleteIcon from '../../../images/icon/del.png'
import icon from '../../../images/icon/exer.png'
import { daysToWeeks } from "date-fns";



const ApexBar = loadable(() =>
   pMinDelay(import("../charts/apexcharts/Bar"), 500)
);
const ApexBar2 = loadable(() =>
   pMinDelay(import("../charts/apexcharts/Bar2"), 500)
);

const DistanceMap = () => {
   const [days, setDays] = useState(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
   const [clientData,setClientData]=React.useState([]);
   const [exerData,setExerData]=React.useState([]);
   const [routineData,setRoutineData]=React.useState([]);
const fetchData=async()=>{
   // clients data
  var finalResult=[];
 var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients.json');
 var result=res.data;
 for(let id in result){
   var resClient={...result[id],id:id}
  finalResult.push(resClient);
   }
setClientData(finalResult);
// exercise Data
var finalResultExer=[];
var resExer =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json');
var resultExer=resExer.data;
for(let id in resultExer){
var res={...resultExer[id],id:id};
 finalResultExer.push(res);
  }
setExerData(finalResultExer);
// routine data
var finalResultRoutine=[];
var resRoutine =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json');
var resultRoutine=resRoutine.data;
for(let id in resultRoutine){
   var res={...resultRoutine[id],id:id};
 finalResultRoutine.push(res);
  }
setRoutineData(finalResultRoutine);

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
var ele=exerData[index];
axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Exercises.json',JSON.stringify(ele))
.then((res)=>{
   alert('duplicated successfully....');
   window.location.reload();
})
.catch((err)=>alert(err));
 }

 const delRoutineHandler=async(id)=>{
   if(window.confirm('are you sure you want to delete this element?')){
      var resRoutine =await axios.delete(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines/${id}.json`);
     window.location.reload();
   }
 }
 const dupRoutineHandler=async(index)=>{
   var ele=routineData[index];
   axios.post('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Routines.json',JSON.stringify(ele))
   .then((res)=>{
      alert('duplicated successfully....');
      window.location.reload();
   })
   .catch((err)=>alert(err));
    }



   return (
      <>
      <div className="grid-two2">
         <div className="row">
            <div className="col-lg-12">
               <div className="card welcome-card">
                  <div className="card-body">
                   <div className="morning-msg">Good Mornong, <span>Fermin</span></div>  
                     <div className="fs-13">Here is a brief overview of activities of your's clients</div>
                     </div>
               </div>
            </div>
            <div className=" col-lg-4">
               <div className="card client-card">
                  <div className="card-header d-sm-flex d-block border-0">
                     <div className="m-auto w100">
                        <div className="client-card-header">
                        <h4 className="text-black fs-16">Exercises</h4>
                        <Link to="/new-exercise" className="add-btn text-center" style={{paddingTop:'0.2vw'}}>
								Add
							  </Link>
                        </div>
                     </div>
                  </div>
                  <PerfectScrollbar className=" pt-0 pb-3 dz-scroll height350 ps ps--active-y" style={{padding:'1vw'}}>
                     <div className="colThree-card-heading border-b py-1 border-bottom align-items-center">
                           <h6 className="fs-16 mb-0">
                             Name
                           </h6>
                           <h6 className="fs-16 mb-0">
                            Actions
                           </h6>
                           <h6 className="fs-16 mb-0">
                            Type
                           </h6>
                     </div>
                     {
                        exerData.map((d,i)=>{
                  return <div className="colThree-card-heading py-1 border-bottom align-items-center" key={i}>
                          <div className="txtsdots">
                          <span className="icon bg-info shadow-info mr-1 cycle-man">
                            <img className="exerIcon" src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/exerciseImgs%2F${d.pic}?alt=media&token=fa0d47b0-656a-41e0-a811-982a959dde75`} alt=""/>
                        </span>
                        <a className="exercise-detail" href={`/modify-exercise/${d.id}`}>{d.name}</a>
                          </div>
                          <div>
                        <button className="dup-del-btn" onClick={(e)=>dupExerHandler(i)}><span  className="exercise-detail-icon mr-1" style={{color:'yellow'}}><img className="dupIcon" src={duplicate} alt=""/></span><span  className="exercise-detail">Duplicate</span></button>
                        
                        <button className="dup-del-btn" onClick={(e)=>delExerHandler(d.id)}><span  className="exercise-detail-icon mr-1" style={{color:'red'}}><img className="delIcon" src={deleteIcon} alt=""/></span><span className="exercise-detail">Delete</span></button>
                        
                          </div>
                          <div className="d-flex">   <div className="online-span mr-1">
                        </div>
                        <span  className="exercise-detail">Online</span></div>
                       
                     </div>
                        })
                     }  
                  </PerfectScrollbar>
               </div>
            </div>
            <div className="col-lg-4">
               <div className="card client-card">
                  <div className="card-header d-sm-flex d-block border-0">
                     <div className="m-auto w100">
                        <div className="client-card-header">
                        <h4 className="text-black fs-16">Clients</h4>
                        <Link to="/new-client" className="add-btn text-center" style={{paddingTop:'0.2vw'}}>
								Add
							  </Link>
                        </div>
                     </div>
                  </div>
                  <PerfectScrollbar className=" pt-0 pb-3 dz-scroll height350 ps ps--active-y" style={{padding:'1vw',height:'100%'}}>
                  {
      clientData.map((d,i)=>{
                 return    <div className="display-flex py-3 border-bottom align-items-center" key={i}>
                     <img className="mr-3 client-dp" src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/clientImgs%2F${d.pic}?alt=media&token=5f34507a-528d-4abf-a21b-55a7cef5d205`} alt=""/>
                        <div className="client-disc-width">
                           <h6 className=" fs-13 mb-0">
                              <Link
                                 to="/"
                                 className="text-black"
                              >
                                {d.name}
                              </Link>
                           </h6>
                         <div className="client-col-4 client-activity-link">
                            <a style={{fontSize:'0.9vw'}} href={`/modify-client/${d.id}`}>Profile</a>
                         </div>
                        </div>
                        
                     </div>
      })}       
                  </PerfectScrollbar>
               </div>
            </div>
            <div className=" col-lg-4">
               <div className="card client-card">
                  <div className="card-header d-sm-flex d-block border-0">
                     <div className="m-auto w100">
                        <div className="client-card-header">
                        <h4 className="text-black fs-16">Routines</h4>
                        <Link to="/new-day" className="add-btn text-center" style={{paddingTop:'0.2vw'}}>
								Add
							  </Link>
                        </div>
                     </div>
                  </div>
                  <PerfectScrollbar className=" pt-0 pb-3 dz-scroll height350 ps ps--active-y" style={{padding:'1vw'}}>
                  <div className="colThree-card-heading border-b py-1 border-bottom align-items-center">
                           <h6 className="fs-16 mb-0">
                             Name
                           </h6>
                           <h6 className="fs-16 mb-0">
                            Actions
                           </h6>
                           <h6 className="fs-16 mb-0">
                            Type
                           </h6>
                     </div>
                     {
                     routineData.map((d,i)=>{
                        return <>
                          <div className="colThree-card-heading py-1 border-bottom align-items-center">
                          <div className="txtsdots">
                          <span className="icon bg-info shadow-info mr-1 cycle-man">
                          <img className="exerIcon" src={icon} alt=""/>
                        </span>
                        <a className="exercise-detail " href={`/react/demo/modify-day/${d.id}`} style={{color:'black'}}>{d.name}</a>
                          </div>
                          <div>
                        <button className="dup-del-btn" onClick={()=>dupRoutineHandler(i)}><span  className="exercise-detail-icon mr-1" style={{color:'yellow'}}><img className="dupIcon" src={duplicate} alt=""/></span><span  className="exercise-detail">Duplicate</span></button>
                        
                        <button className="dup-del-btn" onClick={()=>delRoutineHandler(d.id)}><span  className="exercise-detail-icon mr-1" style={{color:'red'}}><img className="delIcon" src={deleteIcon} alt=""/></span><span className="exercise-detail">Delete</span></button>
                        
                          </div>
                          <div className="d-flex">   <div className="online-span mr-1">
                        </div>
                        <span  className="exercise-detail">Online</span></div>
                       
                     </div>
                        </>
                     })
                     }
                   
                     
                  </PerfectScrollbar>
               </div>
            </div>
            {/* <div className=" col-lg-4">
               <div className="card client-card">
                  <div className="card-header d-sm-flex d-block border-0">
                     <div className="m-auto w100">
                        <div className="w100">
                        <h4 className="text-black fs-20">Routines Group</h4>
                        </div>
                     </div>
                  </div>
                  <PerfectScrollbar className=" pt-0 pb-3 dz-scroll height350 ps ps--active-y" style={{padding:'1vw'}}>
                  
                     {days.map((d,i)=>{
                        return <>
                          <div key={i} className="w100 align-items-center" style={{borderBottom:'1px solid hsl(0deg 0% 0% / 20%)',padding: '1.5vw 0 1vw'}}>
                          <div >
                          <span className="icon bg-info shadow-info cycle-man" style={{marginRight:'2vw'}}>
                          <img className="exerIcon" src={icon} alt=""/>
                        </span>
                        <a className="exercise-detail " href={`/routine-group/${d}`} style={{color:'black',fontSize:'1vw',fontWeight:'500'}}>Routine Group ({d})</a>
                          </div>  
                     </div>
                        </>
                     })
                     }
                   
                     
                  </PerfectScrollbar>
               </div>
            </div> */}
         </div>
         <div className="row">
         <div className="col-lg-12">
               <div className="card client-card" style={{height:'33.6rem'}}>
                  <div className="card-header d-sm-flex d-block border-0" style={{padding: '1.5rem 0.5rem 1.25rem'}}>
                     <div className="m-auto w100">
                        <div className="client-card-header">
                        <h4 className="text-black fs-13">Updates</h4>
                        {/* <button className="add-btn">Add</button> */}
                        </div>
                        {/* <PerfectScrollbar className="widget-timeline dz-scroll style-1 ps p-3 height110">
									<ul className="timeline">
									  <li>
										<div className="timeline-badge primary" />
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>
										  <span>10 minutes ago</span>
										  <h6 className="mb-0 fs-13">
                                <strong className="text-primary">Scott T.</strong>.
											completed routine workout{" "}
										  </h6>
										</Link>
									  </li>
									  <li>
										<div className="timeline-badge info"></div>
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>
										    <span>10 minutes ago</span>
										  <h6 className="mb-0 fs-13">
                                <strong className="text-primary">Soothi.</strong>.
											completed routine workout{" "}
										  </h6>
										</Link>
									  </li>
									  <li>
										<div className="timeline-badge danger"></div>
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>
										  <span>30 minutes ago</span>
                                <span>10 minutes ago</span>
										  <h6 className="mb-0 fs-13">
                                <strong className="text-primary">Karlos</strong>.
											completed routine workout{" "}
										  </h6>
										</Link>
									  </li>
									  <li>
										<div className="timeline-badge success"></div>
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>
										  <span>10 minutes ago</span>
										  <h6 className="mb-0 fs-13">
                                <strong className="text-primary">Kani</strong>.
											completed routine workout{" "}
										  </h6>
										</Link>
									  </li>
									  <li>
										<div className="timeline-badge warning"></div>
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>  <span>10 minutes ago</span>
                              <h6 className="mb-0 fs-13">
                              <strong className="text-primary">jeani</strong>.
                               completed routine workout{" "}
                              </h6>
										</Link>
									  </li>
									  <li>
										<div className="timeline-badge dark"></div>
										<Link
										  className="timeline-panel c-pointer text-muted"
										  to="#"
										>
										   <span>10 minutes ago</span>
										  <h6 className="mb-0 fs-13">
                                <strong className="text-primary">Abowani</strong>.
											completed routine workout{" "}
										  </h6>
										</Link>
									  </li>
									</ul>
									<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
									  <div
										className="ps__thumb-x"
										tabIndex={0}
										style={{ left: 0, width: 0 }}
									  />
									</div>
									<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
									  <div
										className="ps__thumb-y"
										tabIndex={0}
										style={{ top: 0, height: 0 }}
									  />
									</div>
								</PerfectScrollbar> */}
                     </div>
                  </div>
                  <PerfectScrollbar className=" pt-0 pb-3 dz-scroll height350 ps ps--active-y" style={{padding:'1vw'}}>
                    
                   
                  </PerfectScrollbar>
               </div>
            </div>
         </div>
         </div>
      </>
   );
};

export default DistanceMap;
