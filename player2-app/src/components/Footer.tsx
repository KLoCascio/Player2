// /messages will be stretch goal for a chatting function

import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="Footer">
            <button className="nav-link"><Link to="/match">M</Link> </button>
            <button className="nav-link"><Link to="/profile"> P</Link></button>
            <button className="nav-link"><Link to="/messages"> C</Link></button>
        </div>
    )

}
