import { approotdir } from './approot.js';
import * as dotenv from 'dotenv';

// api and static ports
export const staticPort = process.env.STATIC_PORT || 3000;
export const apiPort = process.env.API_PORT || 3030;

//database connection info
export const dbUrl = process.env.MONGO_URL || 'mongodb://mongo'; // this is set according to the 'mongo' service in docker-compose.yml
export const dbName = process.env.MONGO_DBNAME || 'test';

// use for connecting to db collection
// AND
// for naming the included endpoints
export const collectionName = process.env.BASE_COLLECTION_NAME || 'test';


export const __dirname = approotdir;