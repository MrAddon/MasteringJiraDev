declare const WRM: WRM

declare module 'wrm/context-path' {
  let contextPath: () => string
  export = contextPath
}

interface WRM {
  data: {
    claim: (providerKey: string) => any
  }
}

interface HelloWorldData {
  breed: string
  name: string
  species: string
}
