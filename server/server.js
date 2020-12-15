import { typeDefs, resolvers } from "./graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import authCtx from "./middleware/authCtx";
import cors from "cors";


import dotenv from "dotenv";
dotenv.config();

const app = express();



const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app});

const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`MongoDB connected`);
  })
  .catch((err) => console.log(`MongoDB connection FAILED`, err));

module.exports = app;