import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

//Create the http link that will connect the ApolloClient instance to the GraphQL API
// The GraphQL server will run on localhost:4000
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

//Instantiate ApolloClient by giving it the httpLink and a new 'InMemoryCache'
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

//Render root component of the React App
//The App is wrapped in the component ApolloProvider that gets passed to the client
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
