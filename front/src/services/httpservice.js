
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const url = ""

const getAll = () => {
    const promise = axios.get(`${url}/api/persons`)
    return promise.then(response => response.data );
}

const create = (o) => {
  const promise = axios.post(`${url}/api/persons`, o)
  return promise.then(response => response.data)
}

const update = (o,i) => {
  const promise = axios.put(`${url}/api/persons/${i}`, o)
  return promise.then(response => response.data)
}

const remove = (i) => {
  const promise = axios.delete(`${url}/api/persons/${i}`)
  return promise.then(response => response.data)
}

export default { getAll, create, update, remove }
