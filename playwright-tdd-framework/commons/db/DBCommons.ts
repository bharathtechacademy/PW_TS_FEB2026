import {Client} from 'pg';
import config from '../../config/config.json' with {type: 'json'};

export class DBCommons{

    async getData(query:string) : Promise<Array<Map<string, any>>>{

        //Create a new client instance configuration to connect with the database. 
        const dbConfig = new Client({
            host: config.db.host,
            port: config.db.port,
            user: config.db.username,
            password: config.db.password,
            database: config.db.database
        });

        //Connect with database with above connection details
        await dbConfig.connect();

        //Execute query and get the data 
        const data = await dbConfig.query(query);

        //Close the database connection
        await dbConfig.end();

        //return all the records from the results
        return data.rows;

    }

}

let db = new DBCommons();
const query = `SELECT FILM.TITLE AS MOVIE_NAME, CATEGORY.NAME AS MOVIE_CATEGORY , LANGUAGE.NAME AS MOVIE_LANGUAGE FROM CATEGORY 
JOIN
FILM_CATEGORY
ON
CATEGORY.CATEGORY_ID = FILM_CATEGORY.CATEGORY_ID
JOIN
FILM
ON 
FILM_CATEGORY.FILM_ID = FILM.FILM_ID
JOIN
LANGUAGE
ON
FILM.LANGUAGE_ID = LANGUAGE.LANGUAGE_ID
WHERE 
CATEGORY.NAME = 'Horror'
AND
LANGUAGE.NAME = 'English'
AND 
FILM.TITLE LIKE '%Devil'
ORDER BY FILM.TITLE ASC
LIMIT 10`;

const data = await db.getData(query);
console.log(data[1]["movie_name"]);
