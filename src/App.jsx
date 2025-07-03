import "./App.css"
import { useState } from "react";

import NavBar from "./comp/NavBar/NavBar"
import Dashboard from "./comp/Dashboard/Dashboard";
import History from "./comp/History/History";
import AddSub from "./comp/AddSub/AddSub";
import Goal from "./comp/Goal/Goal";


function App(){
  let [currentPage,setCurrentPage] = useState("Dashboard");
  let [currentSubs,setCurrentSubs] = useState({});
  let [compSubs,setCompSubs] = useState({});
  let [currGoals,setCurrGoals] = useState({});

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
      setCompSubs={setCompSubs}/>
    }
    else if(currentPage === "Add Goal"){
      return <Goal
      currSub={currentSubs}
      setCurrGoal={setCurrGoals}/>;
    }
    return <Dashboard 
    subs={currentSubs}
    goals={currGoals}
    setGoals={setCompSubs}
    setSubs={setCurrentSubs}
    setCompSubs={setCompSubs}/>
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