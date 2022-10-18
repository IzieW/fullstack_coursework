import { useState } from "react"

const GenerateNumber = () => Math.floor(Math.random()*7)

const App = () => {
  const anecdotes = [ 
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [randomNumber, changeNumber] = useState(GenerateNumber())  // Random number decides anecdote index

  const [choiceAnecdote, changeAnecdote] = useState(anecdotes[randomNumber])

  const [points, changeVote] = useState(Array(anecdotes.length).fill(0))
  const mostVotes = points.indexOf(Math.max(...points))  // find index with most votes

  const updateVotes = () => {  // Quote will change to as reloads page with new random number
      const newVotes = [...points]
      newVotes[randomNumber] +=1
      changeVote(newVotes)
    }
  
  const updateAnecdote = () => {
    changeNumber(GenerateNumber())
    changeAnecdote(anecdotes[randomNumber])
  }

    
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {choiceAnecdote}
      </p>
      <p>
      Has {points[randomNumber]} votes
      </p>
    <button onClick = {updateVotes}>vote</button>
    <button onClick = {updateAnecdote}>next anecdote</button>
    <h2>Aecdote with most votes</h2>
    <p>
      {anecdotes[mostVotes]}
    </p>
    </div>

  )
}

export default App