import { useState } from "react"

/* Create web app for collecting customer feedback with three options for feedback: 
good, bad, neutral. App must display number of feedbacks collected for each category*/

const Button = ({functionHandler, text}) => (
  <button onClick = {functionHandler}>{text}</button>
)

const StatisticLine = ({text, value}) => (
<tr >
  <td>{text}</td>
  <td>{value}</td>
</tr>
)

const Statistics = (scores) => {
  const {good, neutral, bad} = scores
  const total = good+neutral+bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1> Statistics</h1>
      <table>
        <tbody>
            <StatisticLine text="good" value = {good}/>
            <StatisticLine text="neutral" value = {neutral}/>
            <StatisticLine text="bad" value = {bad}/>
            <StatisticLine text="all" value = {total}/>
            <StatisticLine text = "average" value = {(good-bad)/total}/>
            <StatisticLine text = "positive" value = {good/total*100+"%"}/>
        </tbody>
      </table>
    </div>

  )
}

const App = () => {

  const [good, addGood] = useState(0)
  const [bad, addBad] = useState(0)
  const [neutral, addNeutral] = useState(0)

  const scores = [good, neutral, bad]

  return (
    <div>
      <h1>Give feedback</h1>
      <Button functionHandler={() => addGood(good+1)} text = "good"/>
      <Button functionHandler={() => addNeutral(neutral+1)} text="neutral"/>
      <Button functionHandler={()=> addBad(bad+1)} text="bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App