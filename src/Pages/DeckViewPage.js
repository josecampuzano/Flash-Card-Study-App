import React from "react";
import BreadCrumbDeckViewPage from "../Components/BreadCrumbDeckViewPage";
import DeckCards from "../Components/DeckCards";
import DeckInfo from "../Components/DeckInfo";

function DeckViewPage () {
    return (
        <div>
        <BreadCrumbDeckViewPage />
        <DeckInfo />
        <DeckCards />
        </div>
    )
}

export default DeckViewPage