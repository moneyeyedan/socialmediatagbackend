const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
app.post('/login',(req,res)=>{
    data = {
        id:369
    }
    res.send(jwt.sign(data,"manikandan"))
})
app.get('/login_user_data',verifytoken,(req,res)=>{
    res.send('the data send success fully');
});
function verifytoken(req,res,next){
    var authHeader = req.headers['authorization'];
    if(typeof authHeader!==undefined){
        var token = authHeader.split(" ")[1];
        jwt.verify(token,'manikandan',(err,data)=>{
            if(err){
                res.sendStatus(500);
            }else{
                next();
            }
        })
    }else{
        res.sendStatus(500);
    }
}
app.listen(3000,()=>{
    console.log('http is running');
});