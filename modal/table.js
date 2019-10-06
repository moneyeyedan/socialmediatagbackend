const database = require('./database');
const sql = "create table imagelist (id int not null auto_increment,image LONGBLOB,description varchar(250),mimitype varchar(50),likeid varchar(20) default 'false',totallike int default 0,primary key(id))";

database.mysqlConnection.query(sql,(err,result)=>{
    if (err) throw err;
    console.log(result);
});