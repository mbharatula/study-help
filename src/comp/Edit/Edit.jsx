import { useState } from "react";
import "./Edit.css"

function Edit({subs, setSubs, subject, onClose}){
    // Initialize state with the data of the subject being edited
    const [currentName, setCurrentName] = useState(subject);
    const [currentDesc, setCurrentDesc] = useState(subs[subject].join(', '));
    const [err, setErr] = useState(null);

    function handleSubmit(event){
        event.preventDefault();
        if(!currentName.trim()){
            setErr("Subject Name Cannot Be Empty");
            return;
        }

        const newSubs = { ...subs };
        const newDescArray = currentDesc.split(',').map(item => item.trim()).filter(Boolean);

        // If the subject name was changed, remove the old entry
        if (currentName.trim() !== subject) {
            delete newSubs[subject];
        }

        // Add the updated entry
        newSubs[currentName.trim()] = newDescArray;

        setSubs(newSubs);
        onClose(); // Return to the dashboard view
    }
    function handleCancel(event){
        event.preventDefault();
        onClose(); // Return to the dashboard without saving
    }
    return(
    <div className="e-cont">
    <h3>Edit Information</h3>
    <form onSubmit={handleSubmit}>
        <div className="e-input">
        <input
            className={`e-name ${err ? "s-name-error" : ""}`}
            type="text"
            value={currentName}
            onChange={(e)=>{
                setCurrentName(e.target.value);
                if (err) setErr(null);
            }}
            placeholder="Enter Subject Name"
        />
        <textarea
            className="e-desc"
            value={currentDesc}
            placeholder="Enter Specific Topics/Chapters,seperated by comma(,)" 
            onChange={(e)=> setCurrentDesc(e.target.value)}       
        />
        </div>
        <div className="e-btn">
        <button className="e-submit" type="submit">Save Changes</button>
        <button className="e-cancel" type="button" onClick={handleCancel}>Cancel</button>
        </div>
        {err && <p className="e-error">*{err}</p>}
    </form>
    </div>
    );
}

export default Edit;