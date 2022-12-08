import knex from 'knex';
const configs = require('./knexfile')

const config = configs[process.env.NODE_ENV || 'development'];

const db = knex(config);

export default db;
