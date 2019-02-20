import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

export default async () => {
    try{
        dotenv.config();

        let dbConfig = {};
        let env = process.env;
        let authUrl = null;
        let configApproved = true;

        // Check the existence of the parameters below in .env

        if(env.hasOwnProperty('MONGO_USER') || !!env.MONGO_USER)
            dbConfig['MONGO_USER'] = env.MONGO_USER

        if(env.hasOwnProperty('MONGO_PASSWORD') || !!env.MONGO_PASSWORD)
            dbConfig['MONGO_PASSWORD'] = env.MONGO_PASSWORD

        if(env.hasOwnProperty('MONGO_HOST') && !!env.MONGO_HOST)
            dbConfig['MONGO_HOST'] = env.MONGO_HOST
        else{
            configApproved = false
            console.log('[ MongoDB Plugin ] - There is no MONGO_HOST variable in the .env file.')
        }

        if(env.hasOwnProperty('MONGO_PORT') && !!env.MONGO_PORT)
            dbConfig['MONGO_PORT'] = env.MONGO_PORT
        else{
            configApproved = false
            console.log('[ MongoDB Plugin ] - There is no MONGO_PORT variable in the .env file.')
        }

        if(env.hasOwnProperty('MONGO_DB') && !!env.MONGO_DB)
            dbConfig['MONGO_DB'] = env.MONGO_DB
        else{
            configApproved = false
            console.log('[ MongoDB Plugin ] - There is no MONGO_DB variable in the .env file')
        }

        if((dbConfig.hasOwnProperty('MONGO_USER') && !!env.MONGO_USER) &&
           (dbConfig.hasOwnProperty('MONGO_PASSWORD') && !!env.MONGO_PASSWORD))
           authUrl = `${dbConfig.MONGO_USER}:${dbConfig.MONGO_PASSWORD}@`

        if(!configApproved){
            console.log('[ MongoDB Plugin ] - Please correct the above errors before restarting the application.')
            process.exit(-1);
        }
        else{
            let connectionUrl = `${dbConfig['MONGO_HOST']}:${dbConfig['MONGO_PORT']}/${dbConfig['MONGO_DB']}`

            if(authUrl) connectionUrl =  `${authUrl}${connectionUrl}`

            let mongoClient = null, db = null

            try{
                mongoClient = await MongoClient.connect(`mongodb://${connectionUrl}`, { useNewUrlParser: true })
                db = mongoClient.db(dbConfig['MONGO_DB'])

                if(process.env.PLUGIN_DEBUG == 'true')
                    console.log(`[ MongoDB Plugin ] - MongoDB successfully signed`)

            } catch (e) {
                throw e.message
            }

            return { mongoClient, db }
        }
    }
    catch (e) {
        console.log(`[ MongoDB Plugin ] - ${e.message}`)
    }
}
