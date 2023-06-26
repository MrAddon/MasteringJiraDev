import '../../tailwind.css'
import React from 'react'
import { render } from 'react-dom'
import { App } from '../../components/App'
import $ from 'jquery'

// Enable hot module replacement, comment out if full page reload is desired
module.hot && module.hot.accept()

$(() => {
  // Data key: [groupId].[artifactId]:[web-resource-key].[data-key]
  const helloWorldDataProviderKey = 'com.example.helloworld:entrypoint-helloWorld.hello-world-data-provider'
  const helloWorldData: HelloWorldData = WRM.data.claim(helloWorldDataProviderKey)
  const wrapper = document.getElementById('container')
  wrapper && render(<App helloWorldData={helloWorldData} />, wrapper)
})
