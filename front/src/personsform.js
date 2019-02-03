
import React from 'react';

const PersonsForm = (props) => {
  return (

    <form onSubmit={props.addName}>
      <div>
        nimi: <input
            value={props.newName}
            onChange={(event) => {
              event.preventDefault();
              props.setNewName(event.target.value);
            }}
        />
      </div>
      <div>
        numero: <input
            value={props.newNumber}
            onChange={(event) => {
              event.preventDefault();
              props.setNewNumber(event.target.value);
            }}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonsForm;
