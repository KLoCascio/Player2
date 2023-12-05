// /messages will be stretch goal for a chatting function

import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="Footer">
            <button className="select-button"><Link to="/messages"><img src="./src/assets/buttons/SelectButton.png" /></Link> </button>
            <button className="start-button"><Link to="/profile"><img src="./src/assets/buttons/StartButton.png" /></Link></button>
        </div>
    )

}
