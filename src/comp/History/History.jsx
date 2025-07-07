import "./History.css"

function History({compSubs,setCompSubs,subs,setSub}){
    const handleDelete = (subjectToDelete)=>{
        // eslint-disable-next-line no-unused-vars
        const { [subjectToDelete]: removed, ...remainingSubs } = compSubs;
        setCompSubs(remainingSubs);
    };
    const handleReset = (subjectToAdd)=>{
        const { [subjectToAdd]: content, ...remainingSubs} = compSubs
        let newSubs = {...subs,[subjectToAdd]: content};
        setCompSubs(remainingSubs);
        setSub(newSubs);
    }
    if(Object.keys(compSubs).length==0){
        return(
            <div className="h-content">
                <div className="z-txt">No Completed Subjects To Show<br/>Mark Them Completed in Dashboard</div>
            </div>
        );
    }
    else{
        return(
            <div className="h-content">
                <h2 className="h-head">Completed Subjects</h2>
                <ul className="h-list">
                    {
                        Object.entries(compSubs).map(([sub,desc])=>(
                            <li key={sub}>
                                <div className="h-item">
                                    <div className="h-content">
                                        <span className="i-head">Subject:</span>
                                        <span className="i-name">{sub}</span>
                                        <div className="i-desc">
                                            {desc.map((word,index)=>(
                                                <span key={index}>{word}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-gap"></div>
                                    <div className="h-btn">
                                        <button className="h-del material-icons" onClick={()=>handleDelete(sub)}>close</button>
                                        <button className="h-reset material-icons" onClick={()=>handleReset(sub)}>replay</button>
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

export default History;