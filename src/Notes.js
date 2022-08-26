// You can add this back to index.js in the Layout folder to restore how the components look. This has no routing. This is in case you need to reset if you cant get the routing to work

  // This is a functioning return stateent that you can revert to if you need to 
  // return (
  //   <>
  //     <Header />
  //     <div className="container">
  //       {/* TODO: Implement the screen starting here */}
  //       <NotFound />
  //       <BreadCrumb />
  //       <CreateDeckButton />
  //       <DeckList />
  //       <CardContentForm />
  //       <DeckContentForm /> 
  //     </div>
  //   </>
  // );



// You can add this back to Deck Info if you need to map through the deckinformation  at the moment it is not working so might not be useful
//UPDATE: The solution worked without having to map over the deck array so this code below is not needed anymore
// const deckInformation = deckInfo.map((deck, index) => (
//   <div class="card border border-white">
//   <div class="card-body ">
//     <h5 class="card-title">{deck.name}</h5>
//     <p class="card-text">{deck.description}</p>
//     <a href="#" class="btn btn-primary">Edit</a>
//     <a href="#" class="btn btn-primary">Study</a>
//     <a href="#" class="btn btn-primary">+ Add Cards</a>
//   </div>
// </div>
// ))


//notes from Deck Edit Page to reset to 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import DeckContentForm from "../Components/DeckContentForm";
import { readDeck } from "../utils/api";

function DeckEditPage () {

    const [deckInfo, setDeckInfo] = useState([])
    const params = useParams()
    const deckId = params.deckId

    useEffect(() => {
        const abortController = new AbortController()
        async function loadDeckInfo () {
            try {
                const response = readDeck(deckId)
                const dataFromAPI = await response.json()
                setDeckInfo(dataFromAPI)
            } catch (error) {
                if(error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error
                }
            }
        }
        loadDeckInfo()
        console.log(readDeck(deckId))
        console.log(deckInfo)
    }, [])

    return (
        <>
        <BreadCrumb />
        <DeckContentForm 
            title="Edit Deck"
            deckName={deckInfo.name}
            deckDescription={deckInfo.description}
            />
        </>
    )

}

export default DeckEditPage



// use this to reset StudyCard list to a functioning component that renders the front of the card and can display the next card

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyCardList () {
    const [deckInfo, setDeckInfo] = useState([])
    const params = useParams()
    const deckId = params.deckId
    const [cardCount, setCardCount] = useState(0)
    const cardList = deckInfo.cards
    console.log(cardList)
  

    useEffect(() => {
        async function loadDeckInfo () {
            try {
                const response = readDeck(deckId)
                response.then((dataFromAPI) => {
                    setDeckInfo(dataFromAPI)
                })

            } catch (error) {
                if(error.name === "AbortError") {
                    console.log("Aborted")
                } else {
                    throw error
                }
            }
        }
        loadDeckInfo()
    }, [])


    const cardInfo = (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{cardCount + " of "}</h5>
          <p class="card-text">{cardList && cardList.filter((card, index) => index === cardCount).map((card) => card.front)}</p>
          <button class="btn btn-primary" onClick={() => setCardCount(cardCount + 1)}>Next</button>
        </div>
      </div>
    )

    

    return (
      <>
        {cardInfo}
      </>
    )
}

// export default StudyCardList



//breadcrumb restart

import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function BreadCrumb ({crumb2Link}) {



    return (
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li class="breadcrumb-item"><Link to={crumb2Link}>crumb2</Link></li> 
            <li class="breadcrumb-item active" aria-current="page">crumb3</li> 
          </ol>
        </nav>
    )
}

//DeckEdit reset this should have the console being able to edit the contents of the form

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbDeckEditPage from "../Components/BreadCrumbDeckEditPage";
import DeckContentForm from "../Components/DeckContentForm";
import { readDeck } from "../utils/api";


function DeckEditPage () {

    const [deckInfo, setDeckInfo] = useState([])
    const params = useParams()
    const deckId = params.deckId

    const [editDeckFormData, setEditDeckFormData] = useState({})
    console.log(editDeckFormData)


    const handleFormChange = ({target}) => {
        setEditDeckFormData({
            ...editDeckFormData,
            [target.name]: target.value,
        })
    }
    

    useEffect(() => {
        async function loadDeckInfo () {
                const response = await readDeck(deckId)
                setDeckInfo(response)
                setEditDeckFormData({
                    name: response.name,
                    description: response.description,
                })
        }
        loadDeckInfo()
    }, [deckId])


    
    

    return (
        <>
        <BreadCrumbDeckEditPage />
        <DeckContentForm 
            title="Edit Deck"
            cancelLink={`/decks/${deckId}`}
            handleFormChange={handleFormChange}
            nameValue={editDeckFormData.name}
            descriptionValue={editDeckFormData.description}
            />
        </>
    )

}

// export default DeckEditPage


//study card list restart 

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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

    const cardInfo = (
        <>
    <h2>{deckName}</h2>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{`Card ${cardCount+1} of ${cardList.length}`}</h5>
            {frontSide === true ? <p class="card-text">{cardList && cardList.filter((card, index) => index === cardCount).map((card) => card.front)}</p> : <p class="card-text">{cardList && cardList.filter((card, index) => index === cardCount).map((card) => card.back)}</p>}
            <button class="btn btn-secondary" onClick={() => setFrontSide(!frontSide)}>Flip</button>
            {/* {(cardCount + 1) < cardList.length ? <button class="btn btn-primary" onClick={() => {setCardCount(cardCount + 1); setFrontSide(true)}}>Next</button> : <button class="btn btn-warning" onClick={() => {setCardCount(0); setFrontSide(true)}}>Next</button>} */}
            {(cardCount + 1) < cardList.length ? <button class="btn btn-primary" onClick={() => {setCardCount(cardCount + 1); setFrontSide(true)}}>Next</button> : <button class="btn btn-primary" onClick={() => messageHandler()}>Next</button>}
        </div>
      </div>
      </>
    )

    return (
      <>
        {cardInfo}
      </>
    )
}

// export default StudyCardList



















