
import React from 'react';

const Persons = (props) => {
    return (
      <>
      {
        props.persons.filter(x => x.name.toLowerCase().includes(props.filtterer)).map(p => {
          return (
            <div key={p.name}>
              {p.name} {p.number} <button onClick={() => {
                props.remove(p)
              }}>Delete this</button>
            </div>
          )
        })
      }
      </>
    )
}

export default Persons;
