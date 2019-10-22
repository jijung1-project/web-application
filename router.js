let express = require('express');
let multer = require('multer');
let mysql = require('./mysql');
let fileNames = Array();
let {PythonShell} = require('python-shell');


function getPrediction() {
    return new Promise(   async function (resolve, reject) {
        let options = {
            mode: 'text',
            pythonPath:'',
            pythonOptions: ['-u'],
            scriptPath: '',
            args: fileNames
        };
        await PythonShell.run('./model/model.py', options, function(err, results){
            if(err) throw err;
            console.log(results)
            resolve(results);
        });


    });
}


let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({storage: storage});

let router = express.Router();

router.route('/').get(function (req, res) {
    res.render('index.html');
});

router.route('/').post(upload.array('photo',10),function(req,res){
    fileNames = Array();
    let files = req.files;

    for(let i=0;i<files.length;i++){
        console.dir(req.files[i]);
        fileNames.push(req.files[i].path);
    }

    id = req.body.id;
    let item = req.files[0].originalname

    getPrediction().then(function(predictions){
        return predictions

    }).then(function(name){
        mysql.returnFacts(name).then(function(result){
            res.json(result)
        })
    });


});


router.route('/result').post(function(req, res){
    let name = req.body.name;
    let password = req.body.password;

});

router.route('/print').get(function (req, res) {
    let results;
    mysql.printAll().then(function(rows){
        results = rows;
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write(" <head>");
        res.write("     <title>print</title>");
        res.write(" </head>");
        res.write(" <body>");
        res.write("<ul>")
        for(i=0; i<results.length;i++){
            res.write(" <h1> Name : " + results[i].name + "</h1>");
            res.write("<br>");
        }
        res.write("</ul>");
        res.write(" </body>");
        res.write("</html>");
        res.end();
    });

});

router.route('/signup').get(function (req, res) {
    res.render('signup.html/');
});

router.route('/print').post(function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    let results;
    mysql.singUp(name, password).then(
        function () {
            mysql.printAll().then(function (rows) {
                results = rows;
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write("<!DOCTYPE html>");
                res.write("<html>");
                res.write(" <head>");
                res.write("     <title>print</title>");
                res.write(" </head>");
                res.write(" <body>");
                res.write("<ul>")
                for (i = 0; i < results.length; i++) {
                    res.write(" <h1> Name : " + results[i].name + "</h1>");
                    res.write("<br>");
                }
                res.write("</ul>");
                res.write(" </body>");
                res.write("</html>");
                res.end();
            });
        });
});

module.exports = router;