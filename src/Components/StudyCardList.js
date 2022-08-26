import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyCardList () {
    const [deckInfo, setDeckInfo] = useState({}) 
    const [cardCount, setCardCount] = useState(0)
    const [frontSide, setFrontSide] = useState(true)
    const [cardList, setCardList] = useState([])
    const [deckName, setDeckName] = useState("")
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()


    function messageHandler () {
        if (window.confirm("Do you really want to restart? \n\nClick Cancel to return to the Home Page")) {
            history.go(0)
          } else {
            history.push(`/`)
          }
    }

    useEffect(() => {
        async function loadDeckInfo () {
            try {
                const response = await readDeck(deckId)
                setDeckInfo(response)
                setCardList(response.cards)
                setDeckName(response.name)
            } catch (error) {
                if(error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error
                }
            }
        }
        loadDeckInfo()

    }, [deckId])

    const notEnoughCardsMessage = (
        <>
        <h2>{deckName}: Study</h2>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
        </>
    )

    const handleNextButtonClick = () => {
        if ((cardCount + 1) < cardList.length) {
            setCardCount(cardCount + 1); 
            setFrontSide(true)
        } else {
            messageHandler()
        }
        
    }

    const cardInfo = (
        <div>
    <h2>{deckName}: Study</h2>
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{`Card ${cardCount+1} of ${cardList.length}`}</h5>
            {frontSide === true ? <p className="card-text">{cardList && cardList.filter((card, index) => index === cardCount).map((card) => card.front)}</p> : <p className="card-text">{cardList && cardList.filter((card, index) => index === cardCount).map((card) => card.back)}</p>}
            <button className="btn btn-secondary" onClick={() => setFrontSide(!frontSide)}>Flip</button>
            {frontSide === false ? <button className="btn btn-primary" onClick={() => handleNextButtonClick()}>Next</button> : null}
        </div>
      </div>
      </div>
    )

    return (
      <div>
        {cardList.length > 2 ? cardInfo : notEnoughCardsMessage} 
      </div>
    )
}

export default StudyCardList

            