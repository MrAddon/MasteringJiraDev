import React from 'react'

interface Props {
  helloWorldData: HelloWorldData
}
export const App = ({ helloWorldData }: Props) => {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>{helloWorldData.name}</p>
      <p>{helloWorldData.breed}</p>
      <p>{helloWorldData.species}</p>
    </div>
  )
}
