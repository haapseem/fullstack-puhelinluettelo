
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const getAll = () => {
    const promise = axios.get('/api/persons')
    return promise.then(response => response.data );
}

const create = (o) => {
  const promise = axios.post('/api/persons', o)
  return promise.then(response => response.data)
}

const update = (o,i) => {
  const promise = axios.put(`/api/persons/${i}`, o)
  return promise.then(response => response.data)
}

const remove = (i) => {
  const promise = axios.delete(`/api/persons/${i}`)
  return promise.then(response => response.data)
}

export default { getAll, create, update, remove }
