import "./Account.css"
function Account(){
    return(
        <div className="a-content">
            <div className="a-pic material-icons">person</div>
            <div className="a-head">Username:</div>
            <div className="a-name">John Doe</div>
            <div className="a-head">E-Mail</div>
            <div className="a-email">john.doe@example.com</div>
            <button className="a-out" disabled>Log Out</button>
        </div>
    );
}

export default Account;