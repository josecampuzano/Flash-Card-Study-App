import React from "react";
import CreateDeckButton from "../Components/CreateDeckButton";
import DeckList from "../Components/DeckList";

function HomePage () {
    return (
        <div>
        <CreateDeckButton />
        <DeckList />
        </div>
    )
}

export default HomePage