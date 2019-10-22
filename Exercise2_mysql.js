let mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'hwang261!',
    database: 'accounts',
    debug: false
});

exports.printAll = function() {
    return new Promise(async function(resolve, reject){
        await connection.query('SELECT * from NamePassword', function(err, rows){
            resolve(rows);
        });
    })
}

exports.login = function(name, password) {
    return new Promise(async function(resolve, reject){
        let params = [name, password];
        await connection.query('SELECT * from NamePassword where name=? and password=?', params,function (err, rows, fields) {
            if (!err) {
                console.log("success");
                console.log(rows);
                if(rows.length) resolve(true);
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
