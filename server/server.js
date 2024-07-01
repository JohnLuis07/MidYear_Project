const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/ScholarFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

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

const user = mongoose.model("users", newSchema);

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await user.findOne({ email: email });
        if (check) {
            if (check.password === password) {
                return res.status(200).json({ message: "Login Successful" });
            } else {
                return res.status(200).json({ message: "Invalid Password" });
            }
        } else {
            return res.status(200).json({ message: "User not found!" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/signup", async (req, res) => {
    const { username, fullname, email, password } = req.body;

    const data = {
        username: username,
        fullname: fullname,
        email: email,
        password: password
    };

    try {
        const check = await user.findOne({ email: email });

        if (check) {
            res.status(200).json({ message: "Email already exists" });
        } else {
            await user.insertMany([data]);
            res.status(201).json({ message: "User created successfully." });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/profile', async (req, res) => {
    const email = req.query.email;
    
    try {
        const userData = await user.findOne({ email: email });
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
