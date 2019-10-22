let mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'hwang261!',
    database: 'nutrition',
    debug: false
});

exports.printAll = function() {
    return new Promise(async function(resolve, reject){
        await connection.query('SELECT * from NamePassword', function(err, rows){
            resolve(rows);
        });
    })
}

exports.returnFacts = function(name) {
    return new Promise(async function(resolve, reject){
        let params = name[0];
        await connection.query('SELECT * from facts where name=?', params, function (err, rows, fields) {
            if (!err) {
                console.log("sql query success");
                console.log(rows);
                if(rows.length) resolve(rows);
                else resolve(false);
            }
            else{
                console.log('Error while performing Query.', err);
            }
        });
    });
}

exports.singUp = function(name, password) {
    return new Promise(async function(resolve, reject){
        let params = [name, password];
        await connection.query('INSERT INTO NamePassword (name, password) VALUES(?,?)', params,function (err, rows, fields) {
            if (!err) {
                console.log("success");
                resolve();
            }
            else
                console.log('Error while performing Query.', err);
        });
    });
}
