import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import { infoTareas } from '../../server/data/infoTareas';
import { useParams } from 'next/navigation';
import { headers } from '../../next.config';


const Tasks = ({dataEl}) => {
  
  const [backendData, setBackendData] = useState([])

  const [isEditing, setIsEditing] = useState(null);

  const [editText, setEditText] = useState('')

  const completedTasks = backendData.filter((data) => data.completed);

  const fetchBackendData = () => {
    fetch("http://localhost:5000/api").then(response => {
      return response.json()
    })
    .then(data => {
      setBackendData(data)
    })  
  }

  useEffect(()=>{
    fetchBackendData()
  }, [])

  function handleDeleterequest(id){
    fetch(`http://localhost:5000/api/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({id: dataEl.id})
  }
 )
  .then(res => {
    if(!res.ok){
      throw new Error('Something went wrong')
    }
    return res.json();
  })
  .then((data) => {
    console.log('DELETE request response: ', data);
    window.location.reload();
  })
  .catch((error)=>{ 
    console.log('Error making DELETE request:', error);})
  }
  

  function handleEditrequest(id, text){
    setIsEditing(id)
    setEditText(text);
  }
  
  function handlePatchrequest(id){
     const index = backendData.findIndex((item) => item.id === id);

     if(index !== -1){
      const updatedData = [...backendData];
      updatedData[index].accion = editText;

      setBackendData(updatedData)

      fetch(`http://localhost:5000/api/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          accion: editText,
        }),
        headers: {
          'Content-type' : 'application/json'
        },
       })
       .then((res) => {
        if(!res.ok){
          throw new Error('Failed to update data on the server')
        }
       })
       .catch((error) =>{
        console.error(error)
       })
     }
     setIsEditing(null)
     
  }

  
  return (
      <ul>
        {backendData.map((data) => {
          return (
          <li key={data.id}>
            {isEditing === data.id ? (
              <div>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                <button onClick={() => handlePatchrequest(data.id)}>Save</button>
              </div>
            ) : (
            <div className='div-task'>
              <p className="task-text">{data.accion}</p>
              <div className="icons">
                <Image src='/edit.svg' alt="Edit" width={10} height={10} onClick = {() =>{handleEditrequest(data.id, data.accion)}} />
                <Image src='/cancel.svg' alt="Cancel" width={10} height={10} onClick={() => handleDeleterequest(data.id)} />
              </div>
            </div>
          )}
          </li>     
          );
        })}
      </ul>

  );
}


export default Tasks;