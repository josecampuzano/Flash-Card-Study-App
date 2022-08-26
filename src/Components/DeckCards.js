import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteCard, readDeck } from "../utils/api";

function DeckCards () {
    const [cards, setCards] = useState([])
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()


    useEffect (() => {
        const abortController = new AbortController()
        async function loadCards () {
            try {
            const dataFromAPI = await readDeck (deckId, abortController.signal)
            setCards(dataFromAPI.cards)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error
                }
            }
        }
        loadCards()
        return () => abortController.abort()
    }, [deckId])

    const deleteCardHandler = async (cardId) => {
        if (window.confirm("Delete this card? \n\nYou will not be able to recover it.")) {
            const response = await deleteCard(cardId)
            history.go(0)
            } else {
            history.push(`/decks/${deckId}`)
          }
        }


    


    const cardInformation = cards.map((card, index) => (
    <div className="card">
    <div className="card-body">
      <h6 className="card-title">Front</h6>
      <p className="card-text">{card.front}</p>
      <h6 className="card-title">Back</h6>
      <p className="card-text">{card.back}</p>
      <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="btn btn-primary">Edit</Link> 
      <button onClick={() => deleteCardHandler(card.id)} className="btn btn-danger">Delete</button>
    </div>
  </div>
    ))

    return (
        <div>
            <h2>Cards</h2>
            {cardInformation}
        </div>
    )
}
export default DeckCards