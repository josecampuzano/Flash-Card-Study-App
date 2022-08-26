import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";

function BreadCrumbStudyPage () {

    const [deckInfo, setDeckInfo] = useState({})
    const [deckName, setDeckName] = useState("")
    const params = useParams()
    const deckId = params.deckId

    useEffect(() => {
        async function loadDeckInfo() {
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
            <li className="breadcrumb-item active" aria-current="page">Study</li> 
          </ol>
        </nav>
    )
}

export default BreadCrumbStudyPage