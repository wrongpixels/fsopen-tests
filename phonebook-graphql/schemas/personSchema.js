const typeDef = `
type Person {
    name: String!
    phone: String
    street: String!
    city: String
    personalData: PersonalData!
    id: ID
}

type PersonalData {
    favoriteFoods: String[]!
        favoriteColors: String[]!
        gameRecords: GameRecord[]

}

type GameRecord {
    name: String!
        score: Int!
}

type Query {
    findHighScores(name: "Test")
        personalData{
                gameRecords{
                    name
                    score
                }
            }
}



type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
}

query {
    personCount
}

query {
    allPersons{
        name
        phone
    }
}

query {
    findPerson(name: "Test"){
        id
        phone
        city
        street
    }
}
    `
