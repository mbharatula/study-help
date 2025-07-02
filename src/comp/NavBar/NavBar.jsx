import "./NavBar.css"
function NavBar({cPage,onNavigate}){
    let pages = ["Dashboard","Add Subjects","Add Goal","Timer","History","Account"];
    return(
        <nav>
            <ul>
                {
                    pages.map((page)=>(
                        <li key={page}>
                            <button className={`nav-btn ${cPage === page ? "active" : ""}`} onClick={()=> onNavigate(page)}>
                                <span>{page}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}
export default NavBar;