import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { NotificationProvider } from './context/NotificationContext.jsx'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ApolloProvider>
)
