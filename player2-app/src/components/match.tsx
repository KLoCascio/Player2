
import { useState } from "react"
import TinderCard from "react-tinder-card"

// MATCH! MODAL
    // LINKS TO MATCHMESSAGE

export default function Match() {
    const [people, setPeople] = useState([
        {
            name: 'Danny McTinder',
            photo: 'https://www.realmenrealstyle.com/wp-content/uploads/2023/10/Essential-Pieces-for-Cottagecore-linen-shirt-suspenders.jpg',
        },
        {
            name: 'Sandra DeTinder',
            photo: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/04/20/16819946402834.jpg',
        },
    ])


    return (
        <>
            <div className="tinderCards_container">
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}>
                        <div
                            style={{ backgroundImage: `url(${person.photo})` }}
                            className="card"
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </>
    )

}
