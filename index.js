const { ApolloServer, gql } = require('apollo-server')

// schema 정의
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// 데이터셋
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// resolver - 어떻게 타입에 연관지어서 데이터를 페치할 것인가 결정
const resolvers = {
  Query: {
    books: () => books,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})