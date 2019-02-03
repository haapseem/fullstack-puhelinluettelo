
import React from 'react';

const FilterForm = (props) => {
  return (
    <div>
      <input
          value={props.filtterer}
          onChange={(event) => {
            event.preventDefault();
            props.setFiltterer(event.target.value);
          }}
      />
    </div>
  )
}


export default FilterForm;
