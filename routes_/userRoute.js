const express = require('express');

const { create, findUser, find,  update, findAll } = require('../controllers/userControllers');
const router = express.Router();


const { createToken, passwordEncryption } = require('../utils/authFunctions');


router.post('/register', async (req,res)=>{
    
    const hashedPassword = await passwordEncryption(req.body.password);
   
    req.body.password = hashedPassword;
    let entry_ = {
        ...req.body, 
        spent : 0,
        total : 0
    }
    try{
        const entry = await create(entry_);
        console.log(entry);
        let message = "";
        let token = "";
        if(entry===1){
            message="Email Exists";
        }else{
        
            token =await createToken(entry);
            console.log(token);
            message="Success";
        }
        res.send({
            result : message,
            token : token
        })
    }catch(e){
        console.log(e);
    }

});

router.get('/users',async(req,res) => {
    try{
        const entries = await findAll();
        res.send({
            result:"success",
            data : entries
        })
    }catch(e){
        console.log(e);
    }
})

router.post('/signin', async(req, res) => {
    console.log(req.body);
    const entry = await findUser(req.body);
    console.log(entry);
    if(entry==1){
        res.send({
            result:"failure",
            message : "Email not exists"
        })
    }
    else if(entry==2){
        res.send({
            result:"failure",
            message : "Incorrect Password"
        })
    }else{
        entry.password = "";
        const token =await createToken(entry);
        console.log(token);
        res.send({
            result:"success",
            data : entry,
            token : token
        })
    }
});


router.put('/update/:id', async(req,res) => {
    const {id} = req.params;
    console.log(req.body);
    console.log(id);

    try{
        let entry = await update(id, req.body);
        entry = await find(id);
        console.log(entry);
        let token =await createToken(entry);
        console.log(token)
        res.send({
            result : "success",
            token : JSON.stringify(token)
        });
    }catch(error){
        console.log(error);
    }

})


module.exports = router;