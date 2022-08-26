import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumbCardNewPage from "../Components/BreadCrumbCardNewPage";
import CardContentForm from "../Components/CardContentForm";
import { createCard, readDeck } from "../utils/api";

function NewCardPage () {
    const history = useHistory()
    const [deckName, setDeckName] = useState("")
    const params = useParams()
    const deckId = params.deckId
    const initialFormState = {
        front: "",
        back: "",
    }
    const [newCardFormData, setNewCardFormData] = useState({...initialFormState})
    console.log(newCardFormData)

    const handleFormChange = ({target}) => {
        setNewCardFormData({
            ...newCardFormData, 
            [target.name]: target.value,
        })
    }

    useEffect(() => {
        async function loadDeckInfo () {
            const response = await readDeck(deckId)
            console.log(response)
            setDeckName(response.name)
        }
        loadDeckInfo()
    }, [deckId])

    const submitHandler = async (event) => {
        event.preventDefault()
        const newCard = await createCard(deckId, {...newCardFormData})
        console.log(newCard)
        setNewCardFormData({...initialFormState})
    }

    const doneButtonHandler = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
        <BreadCrumbCardNewPage />
        <CardContentForm 
        title={`${deckName}: Add Card`}
        frontSidePlaceholder="Front Side of card"
        backSidePlaceholder="Back Side of card"
        handleFormChange={handleFormChange}
        frontValue={newCardFormData.front}
        backValue={newCardFormData.back}
        submitHandler={submitHandler}
        doneButtonHandler={doneButtonHandler}
        />
        </div>
    )
}

export default NewCardPage