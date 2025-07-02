import "./App.css"
import { useState } from "react";

import NavBar from "./comp/NavBar/NavBar";
import Dashboard from "./comp/pages/Dashboard";
import AddSub from "./comp/pages/AddSub";
import History from "./comp/pages/History";

function App(){
  let [currentPage,setCurrentPage] = useState("Dashboard");
  let [currentSubs,setCurrentSubs] = useState({});
  let [compSubs,setCompSubs] = useState({});

  const renderPage = ()=>{
    if(currentPage === "Add Subjects"){
      return <AddSub 
      subs={currentSubs} 
      addSubs={setCurrentSubs}
      onNavigate={setCurrentPage}/>
    }
    else if(currentPage == "History"){
      return <History
      compSubs={compSubs}
      setCompSubs={setCompSubs}/>
    }
    return <Dashboard 
    subs={currentSubs}
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