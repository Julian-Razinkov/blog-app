import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import './index.css'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // This is ignored by the browser, but server should allow it
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Set allowed headers
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Optional: specify allowed methods
    },
  }),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
