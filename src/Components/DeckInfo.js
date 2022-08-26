import { React, useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";

function DeckInfo () {
    const [deckInfo, setDeckInfo] = useState([])
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()


    useEffect (() => {
        const abortController = new AbortController()
        async function loadDeckInfo () {
            try {
                const dataFromAPI = await readDeck(deckId, abortController.signal)
                setDeckInfo(dataFromAPI)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error
                }
            }
        }
        loadDeckInfo()
        return () => abortController.abort()
    }, [])


    const deleteDeckHandler = async (deckId) => {
        if (window.confirm("Delete this deck? \n\nYou will not be able to recover it.")) {
          const response = await deleteDeck(deckId)
          history.push("/")
          } else {
          history.push(`/decks/${deckId}`)
        }
      }

    return (
        <div className="card border border-white">
        <div className="card-body ">
          <h5 className="card-title">{deckInfo.name}</h5>
          <p className="card-text">{deckInfo.description}</p>
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
          <button onClick={() => deleteDeckHandler(deckId)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    )
}

export default DeckInfo