const express = require('express');
const database = require('../modal/database');
const expressFileUploader = require('express-fileupload');
const app = express();
const promise = require('promise');
const ip = process.env.ip;
const port = process.env.port || 2000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(expressFileUploader());
app.use(bodyParser.json());
app.post('/image',(req,res)=>{
    let params  = {
        mimitype:req.files.image.mimetype,
        image:req.files.image.data, //upload imagefile  came to list of json .You select buffer data;if you convert base64 here memory is not enough
        description:req.body.description
    }
    console.log(req.files.image);
    let sql = "insert into imagelist set ?";
    let sql2 = "select * from imagelist";
    new promise((resolve,reject)=>{
        database.mysqlConnection.query(sql,params,(err,result)=>{
            if(err) throw err;
            resolve(result);
        });
    }).then(data=>{
        database.mysqlConnection.query(sql2,(err,result)=>{
            if(err) throw err;
            res.send(result[0]);
        });
    })
});
app.get('/listofimage',(req,res)=>{
    let sql2 = "select * from imagelist order by id desc";
    database.mysqlConnection.query(sql2,(err,result)=>{
        if(err) throw err;
        let i =0;
        new promise((resolve,reject)=>{
            result = result.map(data=>{
                i = i+1;
                data.image =`data:${data.mimitype};base64,`+data.image.toString('base64');//it's convert to base64 using of .toString('base64')
                return data;
            })
            if(i===result.length){
                resolve(result);
            }
        }).then(data=>{
            res.send(data);
        })
    });
});
app.get('/likepage/:id/:like',(req,res)=>{
    console.log("meet 1"+req.params.id+req.params.like);
    let select = 'select totallike from imagelist where id= ?';
    let insert = 'update imagelist set totallike= ?,likeid= ? where id= ?';
    new promise((resolve,reject)=>{
        database.mysqlConnection.query(select,req.params.id,(err,result)=>{
            if(err) throw err;
            resolve(result[0].totallike);
        })
    }).then(data=>{
        console.log("meet 2");
        new promise((resolve,reject)=>{
            if(req.params.like=='true'){
                data = data+1;
                resolve(data);
            }else{
                data = data-1;
                resolve(data);
            }
        }).then(count=>{
            console.log(count);
            database.mysqlConnection.query(insert,[count,req.params.like,req.params.id],(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        })
        
    })
})
app.listen(port,()=>{
    console.log('http://localhost:'+port);
});
