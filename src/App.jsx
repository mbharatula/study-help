import "./App.css"
import { useState } from "react";

import NavBar from "./comp/NavBar/NavBar"
import Dashboard from "./comp/Dashboard/Dashboard";
import History from "./comp/History/History";
import AddSub from "./comp/AddSub/AddSub";
import Goal from "./comp/Goal/Goal";
import Timer from "./comp/Timer/Timer";
import Account from "./comp/Account/Account";
import TimerCount from "./comp/TimerCount/TimerCount";



function App(){
  let [currentPage,setCurrentPage] = useState("Dashboard");
  let [currentSubs,setCurrentSubs] = useState({});
  let [compSubs,setCompSubs] = useState({});
  let [currGoals,setCurrGoals] = useState({});
  const [timerSubject, setTimerSubject] = useState(null);
  const [timerGoalInfo, setTimerGoalInfo] = useState(null);

  const handleNavigateToTimer = (subject) => {
    setTimerSubject(subject);
    setCurrentPage('Timer');
  };

  const handleNavigateToTimerCount = (subject, goal, index) => {
    setTimerGoalInfo({ subject, goal, index });
    setCurrentPage('TimerCount');
  };

  const handleFinishTask = (subject, index, timeLeftInSeconds) => {
    const timeLeftInMinutes = Math.ceil(timeLeftInSeconds / 60);
    setCurrGoals(prevGoals => {
      const newGoals = { ...prevGoals };
      const subjectGoals = [...newGoals[subject]];
      // Update the specific goal's time
      subjectGoals[index] = { ...subjectGoals[index], time: timeLeftInMinutes };
      newGoals[subject] = subjectGoals;
      return newGoals;
    });
    setCurrentPage('Dashboard');
  };

  const renderPage = ()=>{
    if(currentPage === "Add Subjects"){
      return <AddSub 
      subs={currentSubs} 
      addSubs={setCurrentSubs}
      onNavigate={setCurrentPage}/>
    }
    else if(currentPage === "History"){
      return <History
      compSubs={compSubs}
      setCompSubs={setCompSubs}
      subs={currentSubs}
      setSub={setCurrentSubs}/>
    }
    else if(currentPage === "Add Goal"){
      return <Goal
      currSub={currentSubs}
      setCurrGoal={setCurrGoals}/>;
    }
    else if(currentPage=="Timer"){
      return <Timer
      subjects={currentSubs}
      goals={currGoals}
      setGoal={setCurrGoals}
      subject={timerSubject || Object.keys(currentSubs)[0] || ''}
      onNavigateToTimerCount={handleNavigateToTimerCount}/>
    }
    else if(currentPage=="TimerCount"){
      return <TimerCount goalInfo={timerGoalInfo} onFinishTask={handleFinishTask} />
    }
    else if(currentPage=="Account"){
      return<Account/>
    }
    return <Dashboard 
    subs={currentSubs}
    goals={currGoals}
    setGoals={setCurrGoals}
    setSubs={setCurrentSubs}
    setCompSubs={setCompSubs}
    onNavigateToTimer={handleNavigateToTimer}/>
  }
  return(
    <div id="app-root">
      <NavBar cPage={currentPage} onNavigate={setCurrentPage}/>
      <div id="app-cont">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;