import { useState } from "react";
import "./Goal.css";

function Goal({currSub,setCurrGoal}){
    const subjectNames = Object.keys(currSub);
    const [selectedSub, setSelectedSub] = useState("");
    const [selectedContent, setSelectedContent] = useState("");
    const [timeToSpend, setTimeToSpend] = useState("");

    // Get the content/chapters for the selected subject
    // It defaults to an empty array if no subject is selected or if the subject has no contents
    const contentOptions = selectedSub ? currSub[selectedSub] || [] : [];

    const handleSubjectChange = (e) => {
        const newSubject = e.target.value;
        setSelectedSub(newSubject);
        setSelectedContent("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const newGoal = {
            content: selectedContent,
            time: parseInt(timeToSpend, 10) || 0, // Store time as a number
        };

        // This logic correctly updates the state immutably. It finds any
        // existing goals for the selected subject and adds the new one to the array.
        setCurrGoal((prevGoals) => {
            const existingGoalsForSub = prevGoals[selectedSub] || [];
            console.log({...prevGoals, [selectedSub]:[...existingGoalsForSub,newGoal]});
            return {
                ...prevGoals,
                [selectedSub]: [...existingGoalsForSub, newGoal],
            };
        });

        // Reset form for a better user experience
        setSelectedSub("");
        setSelectedContent("");
        setTimeToSpend("");
    };

    const isFormInvalid = !selectedSub  || !timeToSpend;

    return(
        <div className="g-content">
            <h2 className="g-head-1">Add Goal For Your Subject</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject-select">Choose Subject</label>
                <select
                    name="subjects"
                    id="subject-select"
                    className="g-select"
                    value={selectedSub}
                    onChange={handleSubjectChange}
                >
                    <option value="">--Please choose a subject--</option>
                    {subjectNames.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>

                <label htmlFor="content-select">Choose Content/Chapter</label>
                <select
                    name="contents"
                    id="content-select"
                    className="g-select"
                    value={selectedContent}
                    onChange={(e) => setSelectedContent(e.target.value)}
                    disabled={!selectedSub} // Disable until a subject is selected
                >
                    <option value="">--Please choose content--</option>
                    {contentOptions.map((content) => (
                        <option key={content} value={content}>
                            {content}
                        </option>
                    ))}
                </select>

                <label htmlFor="time-input">Time to spend (in minutes)</label>
                <input
                    type="number"
                    id="time-input"
                    className="g-input"
                    value={timeToSpend}
                    onChange={(e) => setTimeToSpend(e.target.value)}
                    placeholder="e.g., 60"
                    min="0"
                />
                <button
                    type="submit"
                    className="g-button"
                    disabled={isFormInvalid}
                >Add Goal</button>
            </form>
        </div>
    );
}

export default Goal;