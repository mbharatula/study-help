import { useState } from "react";
import "./Timer.css"

function Timer({subjects,goals,setGoal,subject}){
    const [selectedSub,setSelectedSub] = useState(subject);
    const handleSubChange = (e)=>{
        const newSub = e.target.value;
        setSelectedSub(newSub);
    };

    const subjectGoals = goals[selectedSub] || [];

    const handleDelete = (event, indexToDelete) => {
        event.preventDefault();
        const newSubjectGoals = subjectGoals.filter((_, index) => index !== indexToDelete);

        setGoal(prevGoals => ({
            ...prevGoals,
            [selectedSub]: newSubjectGoals,
        }));
    };
    if(Object.keys(subjects).length === 0){
        return(
            <div className="h-info">
                Chill ! You have No Subjects To Complete Goals
            </div>
        );
    }
    else{
        return(
        <div>
            <form id="t-form">
                <select
                name="subjects"
                className="t-select"
                value={selectedSub}
                onChange={handleSubChange}
                >
                    <option value=''>--Please Choose Subject--</option>
                    {Object.keys(subjects).map((sub)=>(
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
                <hr/>
            </form>
            <div className="t-goals">
                {selectedSub ? (
                    <>
                        <h2>Goals for {selectedSub}</h2>
                        {subjectGoals.length > 0 ? (
                            <ul className="t-goal-list">
                                {subjectGoals.map((goal, index) => (
                                    <li key={index}>
                                        <div className="t-item">
                                            <div className="ti-content">
                                                <span className="ti-head">Content/Chapter:</span>
                                                <span className="ti-name">{(goal.content)?(goal.content):(selectedSub)}</span>
                                                <span className="ti-head">Time to Spend (in mins)</span>
                                                <span className="ti-time">{goal.time} mins</span>
                                            </div>
                                            <div className="ti-gap"></div>
                                            <div className="ti-btns">
                                                <button className="material-icons ti-delete" onClick={(e)=>handleDelete(e,index)}>close</button>
                                                {/* <button className="material-icons ti-complete" onClick={(e)=>handleProgress(e)}>arrow_forward</button> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No goals have been set for this subject.</p>
                        )}
                    </>
                ) : (
                    <h2>Please select a subject to see the goals.</h2>
                )}
            </div>
        </div>
        );
    }
}

export default Timer;