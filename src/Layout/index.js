import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import DeckNewPage from "../Pages/DeckNewPage";
import DeckEditPage from "../Pages/DeckEditPage";
import DeckViewPage from "../Pages/DeckViewPage";
import StudyPage from "../Pages/StudyPage";
import NewCardPage from "../Pages/NewCardPage";
import CardEditPage from "../Pages/CardEditPage";



function Layout() {

  return (
    <>
    <Header />

      <Switch>
      {/* New Deck Page */}
      <Route path="/decks/new">
        <DeckNewPage />
      </Route>
      {/* Study Page */}
      <Route path="/decks/:deckId/study">
        <StudyPage />
      </Route>
      {/* Edit Deck Page */}
      <Route path="/decks/:deckId/edit">
        <DeckEditPage />
      </Route>
      {/* New Card Page */}
      <Route path="/decks/:deckId/cards/new">
        <NewCardPage />
      </Route>
      {/* Edit Card Page */}
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <CardEditPage />
      </Route>
      {/* Home Page */}
      <Route exact={true} path="/">
        <HomePage />
      </Route>
      {/* Deck View Page */}
      <Route path="/decks/:deckId">
        <DeckViewPage />
      </Route>
      {/* Not Found Screen */}
      <Route>
        <NotFound />
      </Route>
      </Switch>

    </>
  );

}

export default Layout;


