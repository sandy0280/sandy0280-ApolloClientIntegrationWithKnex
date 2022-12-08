const express = require('express');
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

const app = express();



app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
  );
  
  app.listen(4000, () => {
    console.log(`Now listening on port 4000`);
  });
  