import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList
  } from "graphql";


import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import generateToken from "../helpers/generateTokens";
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

  const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
    }),
  });

  const AuthPayloadType = new GraphQLObjectType({
    name: "AuthpayLoad",
    fields: () => ({
      token: {
        type: GraphQLString,
      },
      message: {
        type: GraphQLString,
      },
      user: {
        type: UserType,
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: AuthPayloadType,
      args: {
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      async resolve(parent, { username, email, password }) {
        const id = uuidv4();
        await db("users").insert({
          id,
          username,
          email,
          password: await bcrypt.hash(password, 10),
        });

        const token = generateToken(id, email);
        return {
          token,
          user: {
            id,
            username,
            email,
          },
          message: "User registered successfully",
        };
      },
    },
  },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
  });
  