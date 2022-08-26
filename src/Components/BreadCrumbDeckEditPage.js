import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function BreadCrumbDeckEditPage () {

const [deckInfo, setDeckInfo] = useState({})
const [deckName, setDeckName] = useState("")
const params = useParams()
const deckId = params.deckId

useEffect(() => {
    async function loadDeckInfo () {
   
            const response = await readDeck(deckId)
            setDeckInfo(response)
            setDeckName(response.name)
    }
    loadDeckInfo()
}, [deckId])

    return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li> 
            <li className="breadcrumb-item active" aria-current="page">Edit Deck </li> 
          </ol>
        </nav>
    )
}

export default BreadCrumbDeckEditPage