import React, { useState } from 'react';
import './App.css';


function App() {
  const [userInput, setUserInput] = useState('')
  const [apiResponse, setApiResponse] = useState('')


  const handleInput = (event) => {
    setUserInput(event.target.value)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const apiURL = 'https://lamini-flan-t5-api.onrender.com/generate/'

    try{
      const response = await fetch(apiURL, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt:userInput})
      })

      if(!response.ok){
        throw new Error(`bruhh what is this -> ${response.status}`)
      }

      const data = await response.json()
      console.log(data)

      setApiResponse(data[0])
    }catch(error){
      alert(error)
    }
  }

  return (
    <div className="app-container">
      <div className="input-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type something Intelligent..."
            value={userInput}
            onChange={handleInput}
            className="input"
          />
          <button type="submit" className="submit-button">Generate</button>
        </form>
      </div>

      <div className="response-container">
        <textarea 
          className="response-box" 
          value={apiResponse} 
          readOnly 
          placeholder="API Response will appear here..." 
        />
      </div>
    </div>

  )

}

export default App;




