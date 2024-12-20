import React, { useState } from 'react';
import './App.css';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [userInput, setUserInput] = useState('')
  const [apiResponse, setApiResponse] = useState('')


  const handleInput = (event) => {
    setUserInput(event.target.value)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const apiURL = 'https://lamini.zapto.org/generate/'

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput }),
        rejectUnauthorized: false
      })

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`bruhh what is this -> ${response.status}`)
      }

      const data = await response.json()
      console.log(data)

      setApiResponse(data.response)

    } catch (error) {
      console.error("Caught an error:", error);
      alert(error)
    }
  }

  return (
    <html>
    <head></head>
    <body>
      <Analytics/>
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
          <button alt="generate" type="submit">
            <i>g</i>
            <i>e</i>
            <i>n</i>
            <i>e</i>
            <i>r</i>
            <i>a</i>
            <i>t</i>
            <i>e</i>
          </button>
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
    </body>
    </html>
  )

}

export default App;



