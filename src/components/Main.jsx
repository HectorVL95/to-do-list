import React, {useState,useEffect} from 'react'
import '../styles/Main.scss'
import tareas from '../tareas'
import Tasks from './Tasks'

const Main = () => {

  const [inputValue, setInputValue] = useState('')

  function handleInputChange(e){
    setInputValue(e.target.value)
  }

  const itemTarea = tareas.map(dataEl => {return <Tasks key={dataEl.id} dataEl={dataEl}/>})
  
  /*useEffect(() => {
    fetch("http://localhost:5000/api").then(response => response.json()).then(
      data => {setBackendData(data)}
    )
  }, [])*/

  function handlePostrequest() {
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({accion : inputValue})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('POST request response:', data);
      })
      .catch((error) => {
        console.log('Error making POST request', error);
      })
  }

  return (
    <main className='Main'>
      <h1>To Do List</h1>
      <form className='input-section'>
        <input type="text" value={inputValue} onChange={handleInputChange}/>
        <button onClick={handlePostrequest}>Add Item</button>
      </form>
      <section className='tasks-section'>
        {itemTarea}
      </section>
    </main>
  );
}

export default Main;