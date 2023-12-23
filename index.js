const express = require('express')
const {ApolloServer} = require('@apollo/server')
const { expressMiddleware }  = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

async function startServer(){
    const app = express()
    const server = new ApolloServer({       // user: User give retaion between two 
        typeDefs:`
              type User {
                id: ID!
                name: String!
                username: String
              }
              type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User                   
              }

              type Query {
                getTodos: [Todo]
                getUser: [User]
                getSingleUser(id: ID!): User
              }
        `,
        resolvers:{
            Todo : {
                user: async (todo) =>( await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
            },
            Query: {
                getTodos: async () =>( await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getUser: async () =>( await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getSingleUser: async (parent, {id}) =>( await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    })
    app.use(bodyParser.json())
    app.use(cors())
    await server.start()
    app.use('/graphql', expressMiddleware(server))

    app.listen(8000, ()=> console.log('express is run port 8000'))
}

startServer();  // 27.44