import "./Dashboard.css"
import 'material-icons/iconfont/material-icons.css';
import Edit from "../Edit/Edit";
import { useState } from "react";
import ViewGoal from "../ViewGoal/ViewGoal";

function Dashboard({subs, setSubs, goals, setGoals, setCompSubs}){
    const [editingSubject, setEditingSubject] = useState(null);
    const [goalView, setGoalView] = useState(null);

    const handleDone = (subject) => {
        // Add the subject to the completed list immutably
        setCompSubs(prevCompSubs => ({
            ...prevCompSubs,
            [subject]: subs[subject] // Add the new subject and its description
        }));
        // eslint-disable-next-line no-unused-vars
        const { [subject]: removed , ...remainingSubs } = subs;
        setSubs(remainingSubs);
    };

    const handleDelete = (subjectToDelete) => {
        const { [subjectToDelete]: _removedSub, ...remainingSubs } = subs;
        const { [subjectToDelete]: _removedGoal, ...remainingGoals} = goals;
        setSubs(remainingSubs);
        setGoals(remainingGoals);
    };
    const handleEdit = (subject) => {
        setEditingSubject(subject);
    };
    const handleGoal = (subject)=>{
        setGoalView(subject);
    }
    if (editingSubject) {
        return <Edit
            subs={subs}
            setSubs={setSubs}
            subject={editingSubject}
            onClose={() => setEditingSubject(null)}
            goal={goals}
            setGoal={setGoals}
        />
    }
    if (goalView){
        return(
            <ViewGoal
            subject={goalView}
            desc={subs[goalView]}
            goals={goals}
            onClose={()=>setGoalView(null)}
            setGoals={setGoals}/>
        );
    }

    if(Object.keys(subs).length === 0){
        return(
            <div className="dash-content">
                <div className="z-txt">You are Now Studying No Subjects<br/>Add Subjects</div> 
            </div>
        );
    }
    else{
        return(
            <div className="dash-content">
                <h2 id="dash-head">Your Subjects</h2>
                <ul className="dash-list">
                    {
                        Object.entries(subs).map(([sub,desc])=>(
                            <li key={sub}>
                                <div className="dash-item">
                                    <div className="dash-content">
                                        <span className="sub-head">Subject:</span>
                                        <span className="sub-name">{sub}</span>
                                        <div className="sub-desc">
                                            {desc.map((word,index)=>(
                                                <span key={index}>{word}<br/></span>
                                            ))}
                                        </div>
                                        <div className="sub-goals" onClick={()=> handleGoal(sub)}>
                                            {goals[sub]?.length ?? 0} Goals Yet to be done
                                        </div>
                                    </div>
                                    <div className="dash-gap"></div>
                                    <div className="dash-btn">
                                        <button className="material-icons item-edit" onClick={() => handleEdit(sub)}>
                                            edit</button>
                                        <button className="material-icons item-done" onClick={() => handleDone(sub)}>
                                            check_circle</button>
                                        <button className="material-icons item-del" onClick={() => handleDelete(sub)}>
                                            close</button>
                                    </div>
                                 </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

}
export default Dashboard