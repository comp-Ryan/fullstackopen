import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({value, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr> 
  )
}

const Statistic = ({good, neutral, bad}) =>{
  const all = good + neutral + bad

  if (all <= 0){
    return <div>No feedback given</div>
  }


  return (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(good-bad)/all}/>
      <StatisticLine text="positive" value={(good)/(all)}/>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [array, setArray] = useState(Array(8).fill(0))
  const [most_votes, setMost_Votes] = useState(0)
  const [most_vote_note, setMost_Vote_Note] = useState(0)
  const vote = () => {
    const copy = [...array]
    copy[selected] += 1
    if (copy[selected] >= most_votes){
      setMost_Votes(copy[selected])
      setMost_Vote_Note(selected)
    }
    setArray(copy)
  }

  console.log(array)


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>setGood(good+1)} text='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={()=>setBad(bad+1)} text='bad'/>
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad}/>
      <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {array[selected]} votes</div>
      <Button onClick={vote}text="vote"/>
      <Button onClick={()=>setSelected(Math.floor(Math.random() * 8))} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[most_vote_note]}</div>
      <div>has {most_votes}</div>
    </div>

    </div>
  )
}

export default App