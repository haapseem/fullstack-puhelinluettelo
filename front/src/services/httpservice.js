
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const getAll = () => {
    const promise = axios.get('http://localhost:3001/api/persons')
    return promise.then(response => response.data );
}

const create = (o) => {
  const promise = axios.post('http://localhost:3001/api/persons', o)
  return promise.then(response => response.data)
}

const update = (o,i) => {
  const promise = axios.put(`http://localhost:3001/api/persons/${i}`, o)
  return promise.then(response => response.data)
}

const remove = (i) => {
  const promise = axios.delete(`http://localhost:3001/api/persons/${i}`)
  return promise.then(response => response.data)
}

export default { getAll, create, update, remove }
