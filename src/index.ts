const express = require('express');
import { graphqlHTTP } from 'express-graphql';
// import * as jwt from 'express-jwt';
const {expressjwt:jwt} = require('express-jwt');
import schema from './schema/schema';


const app = express();

app.use( '/protected', 
jwt({
    secret: 'very long json webtoken phrase(){}/',
    algorithms: ['HS256'],
  }),
  (request: { user: any; }, response: { send: (arg0: string) => any; }) => {
    if (request.user) return response.send(`Welcome, ${JSON.stringify(request.user)}`);
  }
); 




app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: {
          headerEditorEnabled:true,
        }
        
    })
  );
  
  app.listen(4000, () => {
    console.log(`Now listening on port 4000`);
  });
  