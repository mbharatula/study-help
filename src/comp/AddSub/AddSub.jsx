import { useState } from "react";
import "./AddSub.css"

function AddSub({subs,addSubs,onNavigate}){
    const [newSub, setNewSub] = useState("");
    const [err, setErr] = useState(null);
    const[desc,setDesc] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        if(newSub.trim()){
            addSubs({...subs,[newSub.trim()]:desc.split(",")});
            setDesc("");
            setNewSub("");
            setErr(null);
            onNavigate("Dashboard");
        }
        else{
            setErr("Subject Name Cannot Be Empty");
        }
    }
    return(
    <div className="s-cont">
    <h3>Add Subject</h3>
    <form onSubmit={handleSubmit}>
        <div className="s-input">
        <input
            className={`s-name ${err? "s-name-error":""}`}
            type="text"
            value={newSub}
            onChange={(e)=>{
                setNewSub(e.target.value);
                if (err) setErr(null);
            }}
            placeholder="Enter Subject Name"
        />
        <textarea
            className="s-desc"
            value={desc}
            placeholder="Enter Specific Topics/Chapters,seperated by comma(,)" 
            onChange={(e)=> setDesc(e.target.value)}       
        />

        </div>
        <button className="s-submit" type="submit">Add Subject</button>
        {err && <p className="s-error">*{err}</p>}
        <span className="s-info">You are Currently enrolled in {Object.keys(subs).length} Subject(s)</span>
    </form>
    </div>
    );
}

export default AddSub;