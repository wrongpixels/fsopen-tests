const typeDefs = /*GraphQL*/ `

    type Address{street: String!
        city: String!
    }

    type User {
        username: String!,
        friends: [Person!]!,
        id: ID!
    }

    type Token {
        value: String!
    }

    type Person {
        name: String!
        address: Address!
        phone: String
        friendOf: [User!]!
        id: ID!
    }


    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
        me: User
    }
    
    type Subscription{
        personAdded: Person!
    }

    type Mutation{
        createUser(username: String!
        ): User

        login(username: String!
            password: String!
        ): Token

        changeNumber(
            name: String!
            phone: String!
        ): Person
        
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person

        addAsFriend(
            name: String!
        ): User
    }
`
module.exports = typeDefs
