import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from '../../../images/icon/del.png'
import editIcon from '../../../images/edit (3).png'
import { useHistory } from "react-router-dom";

const ProfileDatatable=()=>{
const [data,setData]=React.useState([]);
const history = useHistory();


const fetchData=async()=>{
  var finalResult=[];
 var res =await axios.get('https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients.json');
 var result=res.data;
 for(let id in result){
  var resClient={...result[id],id:id}
  finalResult.push(resClient);
   }
setData(finalResult);
}

  React.useEffect(()=>{
  fetchData();
 },[]);


 const delClientHandler=async(id)=>{
  if(window.confirm('are you sure you want to delete this element?')){
     var resRoutine =await axios.delete(`https://fitnessapp-607ec-default-rtdb.firebaseio.com/Clients/${id}.json`);
    window.location.reload();
  }
}
const editHandler=(id)=>{
  history.push(`modify-client/${id}`)
}
return(<>
<div className="clients-table">
    <div className="table-content">
    <h3 className="title">Clients</h3>
    <p>Here is a brief overview of activities from clients.</p>
    {
      data.map((d,i)=>{
     return (<>
     <div className="data-rows" key={i}>
    <div className="rows-left-part">
    <img className="profPic" src={`https://firebasestorage.googleapis.com/v0/b/fitnessapp-607ec.appspot.com/o/clientImgs%2F${d.pic}?alt=media&token=5f34507a-528d-4abf-a21b-55a7cef5d205`} alt=""/>
    <div>
    <Link  className="link" to={`/modify-client/${d.id}`}>
        <h4>{d.name}</h4>
        </Link>
        <div className="client-links">
						<p>Status: <span>Active</span></p>	
        </div>
    </div>
    </div>
    <div>
          <div className="colTwo2 ptb-0-5 delete" onClick={()=>delClientHandler(d.id)}>
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
      <div className="rows-right-part">
      <div className="colTwo3  objective">
                            <p>Objective:</p>
                            <p>Lose Body Fat</p>
                        </div>
      <div class="bg-progBar">
                        <div class="colTwo4 w75">
                      
                            <div style={{marginTop:'2.5vw'}}>
                                
                                    <span class="ml--3" id="progressInnertxt">72%</span> 
                                    
                            </div>
                            
                        </div>
                        <div class="meter">
                                    <div id="progressInner"></div>
                                </div>
                    </div>
      </div>
    </div>
     </>)
      })
      }
 
    </div>
</div>
<div className="clients-statics">
<h3 className="title">
    Statistics
</h3>
</div>
</>);
}


export default ProfileDatatable;