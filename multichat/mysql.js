var mysql = require("mysql");
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306
});
db.query("USE eatmeCard",function(err){
    if(err)
        console.log('user error');
        });

db.query('select sum(amountPaid) from orderPhase1;',function(err,results,fields){

    if(err)
        console.log("mysql error");
    else{
        var q_result = results;
        console.log(q_result);
        } 
    });
db.end();
