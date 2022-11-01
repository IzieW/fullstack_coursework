import React from "react"

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ exercises }) => {
  const sum = exercises.reduce( (previousValue, currentValue) => previousValue + currentValue)
  return(
    <ul>Number of exercises {sum}</ul>
  )
}

const Part = ({name, exercises}) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => 
  <ul>
    {parts.map(part => 
    <Part key = {part.id} name={part.name} exercises={part.exercises} /> )}
  </ul>

const Course = ({course}) => {
  console.log(course)
  return (
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)}/>
    </div>
  )
}

export default Course