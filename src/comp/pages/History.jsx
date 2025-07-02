import "./History.css"

function History({compSubs,setCompSubs}){
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
                                        <button className="h-del material-icons">close</button>
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