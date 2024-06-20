const express = require('express');
const mongoose = require('mongoose');
const app = express();
const corse = require('cors');


mongoose.connect('mongodb://localhost:27017/ScholarFlow')

const newSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;

app.get("/", corse(), (req, res)=>{

})

app.post("/", async(req, res)=>{
    const{email, password} = req.body;

    try{
        const check = await collection.findOne({email:email})

        if (check) {
            return res.status(201).json({ message: "Email already exists" });
        } else {
            return res.status(201).json({ message: "Email not exists" });
        }
    }
    catch (e) {
        console.log(e)
        res.json("not exist")
    }
    
})

app.post("/SignUp", async(req, res)=>{
    const{username, fullname, email, password} = req.body;

    const data = {
        username: username,
        fullname: fullname,
        email: email,
        password: password
    }

    try{
        const check = await collection.findOne({email:email})

        if (check) {
            res.json("exist")
        } else {
            res.json("not exist")
            await collection.insertMany([data])
        }
    }
    catch (e) {
        console.log(e)
        res.json("not exist")
    }
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// app.get("/getusers", (req, res) => {
//     res.json(UserModel.find({}).then(function(users){
//         res.json(users);
//     })).catch(function(err){
//         console.log(err)
//     })
// });

