import React from "react";

function CardContentForm ({title, frontSidePlaceholder, backSidePlaceholder, handleFormChange, frontValue, backValue, submitHandler, doneButtonHandler}) {
    return (
        <form onSubmit={submitHandler}>
        <h4>{title}</h4>
        <div className="mb-3">
          <label htmlFor="frontSideOfCard" className="form-label">Front</label>
          <textarea 
          type="text" 
          className="form-control" 
          id="deckDescription" 
          name="front"
          placeholder={frontSidePlaceholder}
          onChange={handleFormChange}
          value={frontValue}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">Back</label>
          <textarea 
          type="text" 
          className="form-control" 
          id="deckDescription"
          name="back"
          placeholder={backSidePlaceholder}
          onChange={handleFormChange}
          value={backValue}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary" onClick={doneButtonHandler}>Done</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>    
    )

}

export default CardContentForm