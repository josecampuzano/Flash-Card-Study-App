import React, { useEffect, useState } from "react";
import DeckContentForm from "../Components/DeckContentForm";
import BreadCrumbDeckNewPage from "../Components/BreadCrumbDeckNewPage";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



function DeckNewPage () {

    const history = useHistory()

    const initialFormState = {
        name: "",
        description: "",
    }
    
    const [newDeckFormData, setNewDeckFormData] = useState({...initialFormState})
    
    const handleFormChange = ({target}) => {
        setNewDeckFormData({
            ...newDeckFormData,
            [target.name]: target.value,
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const newDeck = await createDeck({...newDeckFormData})
        const newDeckId = newDeck.id
        history.push(`/decks/${newDeckId}`)
    }



    return (
        <div>
        <BreadCrumbDeckNewPage />
        <DeckContentForm 
            title="Create Deck" 
            deckName="Deck Name"
            deckDescription="Brief description of the deck"
            handleFormChange={handleFormChange}
            nameValue={newDeckFormData.name}
            descriptionValue={newDeckFormData.description}
            submitHandler={submitHandler}
            cancelLink={"/"}
            />
        </div>
    )
}

export default DeckNewPage










//Support Ticket Notes
// function DeckNewPage () {
//     const handleSubmit = (event) => {
//         event.preventDefault()
//         console.log("handleSubmit from DeckNew")
//     } 

//     return (
//         <>
//         <DeckContentForm onSubmit={handleSubmit}/>
//         </>
//     )
// }