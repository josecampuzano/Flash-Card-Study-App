import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";



function DeckList () {

const [decks, setDecks] = useState([])
const history = useHistory()

useEffect (() => {
  const abortController = new AbortController()
  async function loadData () {
    try {
      const dataFromAPI = await listDecks(abortController.signal)
      setDecks(dataFromAPI)
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted")
      } else {
        throw error
      }
    }
  }
  loadData()
  return () => abortController.abort()
}, [])

const deleteDeckHandler = async (deckId) => {
  if (window.confirm("Delete this deck? \n\nYou will not be able to recover it.")) {
    const response = await deleteDeck(deckId)
    history.go(0)
    } else {
    history.push("/")
  }
}


const deckInformation = decks.map((deck, index) => (
    <div key={deck.id} className="card">
    <div className="card-body">
      <h5 className="card-title">{deck.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
      <p className="card-text">
        {deck.description}
      </p>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
      <button onClick={() => deleteDeckHandler(deck.id)} className="btn btn-danger">Delete</button>
    </div>
  </div>
))

return (
   
    <div>
    {deckInformation}
    </div>
  )
}

export default DeckList