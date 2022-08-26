import React from "react";
import { Link } from "react-router-dom";


function DeckContentForm ({title, deckName, deckDescription, cancelLink, handleFormChange, nameValue, descriptionValue, submitHandler, inputTextForName}) { 
    return (
        <form onSubmit={submitHandler}>
        <h1>{title}</h1>
        <div className="mb-3">
          <label htmlFor="deckName" className="form-label">Name</label>
          <input 
          type="text" 
          className="form-control"
          name="name" 
          id="deckName" 
          placeholder={deckName}
          onChange={handleFormChange}
          value={nameValue}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">Description</label>
          <textarea 
          type="text" 
          className="form-control"
          name="description"
          id="deckDescription" 
          placeholder={deckDescription}
          onChange={handleFormChange}
          value={descriptionValue}
          ></textarea>
        </div>
        <Link to={cancelLink}>
        <button type="button" className="btn btn-secondary">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>    
    )
}

export default DeckContentForm