import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumbCardEditPage from "../Components/BreadCrumbCardEditPage";
import CardContentForm from "../Components/CardContentForm";
import { readCard, updateCard } from "../utils/api";

function CardEditPage () {

    const params = useParams()
    const deckId = params.deckId
    const cardId = params.cardId
    const history = useHistory()

    const [editCardFormData, setEditCardFormData] = useState({})
    console.log(editCardFormData)
    
    const handleFormChange = ({target}) => {
        setEditCardFormData({
            ...editCardFormData,
            [target.name]: target.value,
        })
    }


    useEffect(() => {
        async function loadCardInfo () {
            const response = await readCard(cardId)
            setEditCardFormData({
                front: response.front,
                back: response.back,
                id: response.id
            })
        }
        loadCardInfo()
    }, [cardId])


    const submitHandler = async (event) => {
        event.preventDefault()
        const cardWithUpdate = await updateCard({...editCardFormData})
        console.log(cardWithUpdate)
    }

    const doneButtonHandler = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
        <BreadCrumbCardEditPage />
        <CardContentForm 
        title="Edit Card"
        frontValue={editCardFormData.front}
        backValue={editCardFormData.back}
        handleFormChange={handleFormChange}
        submitHandler={submitHandler}
        doneButtonHandler={doneButtonHandler}
        />
        </div>
    )
}

export default CardEditPage