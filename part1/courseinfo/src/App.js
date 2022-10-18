/* 
1.1 course information
Refactor code so that is consists of three new components: 
  - Header
  - Content
  - Total
All data still resides in the App component which passes necc data to each component using props

1.2 course information
Refactor Content component so that it renders three part components of which each renders the name and number of exercises*/

import { array } from "prop-types"

const Header = (props) => {
  return (
  <div>
    <h1>{props.name}</h1>
  </div>
)}

const Part = (props) => (
  <div>
    <p>{props.name} {props.exercises}</p>
  </div>
)

const Content = (props) => {
  return (
    <div>
      {props.parts.map(value => Part(value))}
    </div>
)
      }

const Total = (props) => {
  let total = 0
  for (const value of props.parts){
    total += value.exercises
  }
  //const total = props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises
  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
    )
}

const App = () => {
  const course = 
  { name: 'Half Stack application development',
    parts:  [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a Component",
      exercises: 14
    } ] }
  
  return (
    <div>
      <Header name={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App
