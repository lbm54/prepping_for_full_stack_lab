const mysql = require("mysql");

let connect = () => {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "chirprapp",
    password: "blahblah",
    database: "chirpr"
  });
  return connection;
};

let select = (query, res) => {
  let connection = connect();
  let promise = new Promise(function(resolve, reject) {
    connection.query(query, (err, results, fields) => {
      if (err) {
        connection.end();
        resolve(err);
      } else {
        let formatObject = {};
        results.forEach(result => {
          formatObject[result.id] = {
            name: result.name,
            body: result.body
          };
        });
        connection.end();
        resolve(formatObject);
      }
    });
  });
  return promise;
};

let getIdFromUsername = name => {
  let connection = connect();
  let query = `select id from users where name like '${name}'`;
  let promise = new Promise(function(resolve, reject) {
    connection.query(query, (err, results, fields) => {
      if (err) {
        connection.end();
        reject(err);
      } else {
        connection.end();
        if (results) {
          resolve(results[0].id);
        }
      }
    });
  });
  return promise;
};

let insert = query => {
  let connection = connect();
  let promise = new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if (err) {
        connection.end();
        reject(console.log(err));
      } else {
        connection.end();
        if (results.insertId) {
          resolve(results.insertId);
        } else {
          resolve('ok');
        }
      }
    });
  });
  return promise;
};

let retrieveChirpsUserIsMentionedIn = (query, res) => {
  let connection = connect();
  let promise = new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if (err) {
        connection.end();
        resolve(err);
      }
      let formatObject = {};
      results[0].forEach(result => {
        formatObject[result.ChirpId] = {
          chirpText: result.ChirpText
        };
      });
      connection.end();
      resolve(formatObject);
    });
  });
  return promise;
};

module.exports = {
  select,
  insert,
  retrieveChirpsUserIsMentionedIn,
  getIdFromUsername
};
