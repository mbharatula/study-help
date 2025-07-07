import "./Account.css"
function Account(){
    const handleClick = (e)=>{
        e.preventDefault();
        alert("This is A Front-End Application, Sorry!");
    }
    return(
        <div className="a-content">
            <div className="a-pic material-icons">person</div>
            <div className="a-head">Username:</div>
            <div className="a-name">John Doe</div>
            <div className="a-head">E-Mail</div>
            <div className="a-email">john.doe@example.com</div>
            <button className="a-out" onClick={(e)=> handleClick(e)}>Log Out</button>
        </div>
    );
}

export default Account;