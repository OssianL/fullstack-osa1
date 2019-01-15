import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  let votes = props.votes;
  if(!votes) votes = 0;
  return (
    <div>
      {props.text}<br/>
      has {votes} votes
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([]);
  
  let top = votes.reduce((top, votes, index) => {
    if(votes > top.votes) return {votes: votes, index: index};
    else return top;
  }, {votes: 0, index: 0})

  const selectRandomAnecdote = () => {
    const index = Math.floor(Math.random() * (anecdotes.length));
    setSelected(index);
  }

  const voteSelectedAnecdote = () => {
    const newScores = [...votes];
    if(!newScores[selected]) newScores[selected] = 1;
    else newScores[selected]++;
    setVotes(newScores);
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => voteSelectedAnecdote()}>vote</button>
      <button onClick={() => selectRandomAnecdote()}>next anecdote</button>
      <h2>anecdote with most votes:</h2>
      <Anecdote text={anecdotes[top.index]} votes={top.votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)