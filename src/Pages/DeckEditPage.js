import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumbDeckEditPage from "../Components/BreadCrumbDeckEditPage";
import DeckContentForm from "../Components/DeckContentForm";
import { readDeck, updateDeck } from "../utils/api";


function DeckEditPage () {

    const [deckInfo, setDeckInfo] = useState([])
    const params = useParams()
    const deckId = params.deckId
    const history = useHistory()

    const [editDeckFormData, setEditDeckFormData] = useState({
        name: "",
        description: "",
    })
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
                    id: response.id
                })
        }
        loadDeckInfo()
    }, [deckId])


    const submitHandler = async (event) => {
        event.preventDefault()
        const deckWithUpdate = await updateDeck({...editDeckFormData})
        console.log(deckWithUpdate)
        history.go(0)
    }
    

    return (
        <div>
        <BreadCrumbDeckEditPage />
        <DeckContentForm 
            title="Edit Deck"
            cancelLink={`/decks/${deckId}`}
            handleFormChange={handleFormChange}
            nameValue={editDeckFormData.name}
            descriptionValue={editDeckFormData.description}
            submitHandler={submitHandler}
            />
        </div>
    )

}

export default DeckEditPage









