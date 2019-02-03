
import React, {useState, useEffect} from 'react';
import Persons from './persons';
import PersonsForm from './personsform';
import FilterForm from './filterform';
import axios from 'axios';
import httpservice from './services/httpservice';

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  console.log(props.message[0])
  if(props.message[0].error){
    return (
      <div className="notification error">
        {props.message[0].text}
      </div>
    )
  }

  return (
    <div className="notification succeed">
      {props.message[0].text}
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    httpservice.getAll().then(x => setPersons(x))
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtterer, setFiltterer] = useState('');

  const refresh = () => {
    // axios.get('http://localhost:3001/persons').then(response => {
    //   setPersons(response.data);
    // });
    httpservice.getAll().then(x => setPersons(x))
  }

  const remove = (o) => {
    if(window.confirm('Poistetaanko ' + o.name)){
      httpservice.remove(o.id).then(response => {
        refresh()
        setNotification([{text:'numero poistettu', error: false}])

        setTimeout(() => {
          setNotification(null)
        }, 1000)
      }).catch(error => {
        setNotification([{text:'numero poistettu ennestään', error: true}])

        setTimeout(() => {
          setNotification(null)
        }, 1000)
      })
    }
  }

  const addName = (event) => {
    event.preventDefault();
    const names = []
    persons.map(x => names.push(x.name))
    if(names.includes(newName)){
      if(window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella')){
        var o = {}
        persons.map(x => { if(x.name==newName){ o = x; } })
        o.number = newNumber
        httpservice.update(o, o.id).then(response => {
          refresh()
          setNotification([{text:'numero päivitetty', error: false}])

          setTimeout(() => {
            setNotification(null)
          }, 1000)
        }).catch(error => {
          setNotification([{text:'numero poistettu', error: true}])

          setTimeout(() => {
            setNotification(null)
          }, 1000)
        })
      }
      return ;
    }

    httpservice.create({
      name: newName,
      number: newNumber
    }).then(response => {

      refresh()
      setNotification([{text:'lisättiin ' + newName, error: false}])

      setTimeout(() => {
        setNotification(null)
      }, 1000)

    }).catch(error => {
      setNotification([{text:'error', error: false}])

      setTimeout(() => {
        setNotification(null)
      }, 1000)
    })

  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={notification} />

      <h4> rajaa tuloksia </h4>
      <FilterForm filtterer={filtterer} setFiltterer={setFiltterer} />


      <h4> lisää uusi </h4>
      <PersonsForm addName={addName} newName={newName} newNumber={newNumber}
          setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Puhelinnumerot</h2>
      <Persons persons={persons} filtterer={filtterer} remove={remove} />
    </div>
  )
}


export default App;
