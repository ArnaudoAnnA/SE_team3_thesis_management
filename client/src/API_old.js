"use strict;"
const SERVER_URL = "http://localhost:3001/api/";
import {thesis} from './MOCKS';

/**
 * A utility function for parsing the HTTP response.
 * 
 * TO DO: redesign it basing on API.
 */
function getJson(httpResponsePromise) {
    // server API always return JSON, in case of error the format is the following { error: <message> } 
    return new Promise((resolve, reject) => {
      httpResponsePromise
        .then((response) => {
          if (response.ok) {
           // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
           response.json()
              .then( json => resolve(json) )
              .catch( err => reject({ error: "Cannot parse server response" }))
  
          } else {
            // analyzing the cause of error
            response.json()
              .then(obj => {
                if(typeof obj.error == 'string') reject(obj);
                else reject({"error": "Internal Server Error"});
              }
                ) // error msg in the response body
              .catch(err => reject({ error: "Cannot parse server response" })) // something else
          }
        })
        .catch(err => 
          reject({ error: "Cannot communicate"  })
        ) // connection error
    });
  }

  /** Fetch the collection of all thesis without applying filters.<br>
   * 
   * Returns an object with two properties:
   * - ok, contains the json obj in case of success, otherwise null;
   * - err, contains some details in case of error, otherwise null.
  */
  async function getAllThesis()
  {
    /*
        return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                    .then(json => {ok: json, err: null})
                    .catch(err => {ok: null, err: err})
    */

    return thesis;
  }

  export {getAllThesis};