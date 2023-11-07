"use strict;"
const SERVER_URL = "http://localhost:3001/api/";
import {thesis} from './MOCS';

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
   * @returns an object with two properties:
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

    /** Fetch the collection of thesis without applying filters.<br>
    * It doesn't return all the thesis, but only the ones in the given range of indexes.<br>
   * 
   * @param [start, end] : start and end indexes are both included.
   * 
   * @returns an object with two properties:
   * - ok, contains the json obj in case of success, otherwise null;
   * - err, contains some details in case of error, otherwise null.
  */
    async function getThesis([start, end])
    {
      /*
          return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                      .then(json => {ok: json, err: null})
                      .catch(err => {ok: null, err: err})
      */
  
      return end < thesis.length ? thesis.slice(start, end+1) : thesis.slice(start, thesis.length);
    }

    async function getThesisNumber()
    {
        /*
          return await getJson(SERVER_URL+ !!!! NOME API !!!!)
                      .then(json => {ok: json, err: null})
                      .catch(err => {ok: null, err: err})
      */

        //MOC
        return thesis.length;
    }

  const API = {getAllThesis, getThesis, getThesisNumber};
  export default API;