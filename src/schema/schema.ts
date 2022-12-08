import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList
  } from "graphql";

import db from "../database/db";

// const books = [
//     {id:"1", title:"My book", genre:"history",authorId :"1"},
//     {id:"2", title:"History book", genre:"Ancient history",authorId :"2"}
// ]

// const authors = [
//     {id:"1", name:"My book", age:22, rating : 2},
//     {id:"2", name:"History book" , age:23, rating : 2}
// ]

  const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      id: {
        type: GraphQLString,
      },
      title: {
        type: GraphQLString,
      },
      genre: {
        type: GraphQLString,
      },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return db()
          .select("*")
          .from("authors")
          .where("id", parent.authorId)
          .first();
        },
      },
    }),
  });

  const AuthorType : GraphQLObjectType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLInt,
      },
      rating: {
        type: GraphQLInt,
      },
    }),
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      book: {
        type: BookType,
        args: { id: { type: GraphQLString } },
        resolve(parent, { id }) {
            return db().select().from("books").where("id", id).first();
        },
    },
    author: {
        type: AuthorType,
        args: { id: { type: GraphQLString } },
        resolve(parent, { id }) {
            return db().select().from("authors").where("id", id).first();
        },
    },
  },
});

export default new GraphQLSchema({
    query: RootQuery,
    
  });
  