import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import './index.css'


const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // This is ignored by the browser, but server should allow it
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Set allowed headers
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Optional: specify allowed methods
  }
})

const authLink = setContext((_, { headers }) => {
  //If you store the token in localStorage it can be easily grabbed via XSS atack, so you should use double submit cookie method you dummy 
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ?? ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
