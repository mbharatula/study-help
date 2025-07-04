import 'material-icons/iconfont/material-icons.css';
import './ViewGoal.css'

function ViewGoal({subject,goals,desc,onClose,setGoals, onNavigateToTimer}){

    const descriptionTopics = desc || [];
    const subjectGoals = goals[subject] || [];

    const handleDelete = (event, indexToDelete) => {
        event.preventDefault();
        const newSubjectGoals = subjectGoals.filter((_, index) => index !== indexToDelete);

        setGoals(prevGoals => ({
            ...prevGoals,
            [subject]: newSubjectGoals,
        }));
    };
    const handleDone = (event)=>{
        event.preventDefault();
        onNavigateToTimer(subject);
    };
    return(
        <div className="v-content">
            <div className="v-header">
                <h2 className="v-h1">Subject Details</h2>
                <div className='v-gap'></div>
                <button className="material-icons v-close-btn" onClick={onClose}>
                    close
                </button>
            </div>

            <div className="v-section">
                <h3 className='v-name'>Subject: &emsp; {subject}</h3>
                <h3>Description / Topics</h3>
                <ul className="v-list">
                    {descriptionTopics.length > 0 ? (
                        descriptionTopics.map((chap, index) => (
                            <li key={index} className='v-items'>
                                {chap}
                            </li>
                        ))
                    ) : (
                        <li className='v-items'>No description provided.</li>
                    )}
                </ul>
            </div>
            <hr/>

            <div className='v-goal-dis v-section'>
                <h3>Goals</h3>
                {subjectGoals.length === 0 ? (
                    <div className="v-nogoal">
                        No Goals Have Been Registered On this Subject.
                    </div>
                ) : (
                    <ul className="v-list">
                        {subjectGoals.map((goal, index) => (
                            <li key={index}>
                                <div className='vi-items'>
                                    <div className="vi-content">
                                        <span className='vi-head'>{ `Chapter/Topic:`}</span>
                                        <span className='vi-name'>{goal.content}</span>
                                        <span className='vi-head'>Time To Spend (in mins)</span>
                                        <span className='vi-time'>{goal.time}</span>
                                    </div>
                                    <div className='vi-gap'></div>
                                    <div className='vi-btns'>
                                        <button className='material-icons vi-close' onClick={(e) => handleDelete(e, index)}>close</button>
                                        <button className='material-icons vi-complete' onClick={(e)=>handleDone(e)}>check_circle</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ViewGoal;