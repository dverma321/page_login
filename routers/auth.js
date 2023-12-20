const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authenciate = require('../middleware/authenciate.js');


require('../db/conn');
const User = require('../model/userSchema');


router.get("/", (req, res) => {
    res.send("Hello HomePage from Router");
});

// posting through promises

// router.post("/registration", (req, res) => {

//     const { name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error: "Please Fill all the Details..."});
//     }

//     User.findOne({email: email})
//     .then((userExits) => {
//         if(userExits)
//         {
//         return res.status(422).json({error: "Email already exits..."});

//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message:'user registered Successfully'})
//         }).catch( (err) => {
//             res.status(500).json({error: 'Failed to Register'})
//         })
//     })

//     .catch((err)=> {
//         console.log(err);
//             })

//     // console.log(name);
//     // console.log(email);
//     // console.log(req.body);
// });

// posting through async await

router.post("/registration", async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill all the Details..." });
    }

    try {

        const userEmail = await User.findOne({ email: email });
        const userPhone = await User.findOne({ phone: phone });


        if (userEmail) {
            return res.status(422).json({ error: "Email already exits..." });
        }

        if (userPhone) {
            return res.status(422).json({ error: "Phone Number already exits..." });
        }

        const user = new User({ name, email, phone, work, password, cpassword });
        await user.save();

        console.log(`${user} user Registered successfully`);
        res.status(201).json({ message: "User Registered Successfully..." });



    }

    catch (err) {

        console.log(err);

    }

});

// login authorization

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message: 'Nice working'})

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Please Fill the Details...' })
    }

    try {
        const userExits = await User.findOne({ email: email });

        if (userExits) {
            const isMatched = await bcrypt.compare(password, userExits.password);

            const token = await userExits.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25940000),
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                credentials: 'include'
            } )

            console.log(userExits);

            if (isMatched) {
                res.status(200).json({ message: 'Login Successfully' })
            }
            else {
                res.status(400).json({ message: 'Invalid Credentials' })
            }


        }
        else {
            res.status(400).json({ message: 'Invalid Credentials' })

        }


    }

    catch (err) {
        console.log(err);
    }
})

// about Me page

router.get("/aboutme", authenciate, (req, res) => {
    console.log("Hello About me page, here we will fetch the data from Database");
    res.send(req.rootUser);
});


// here /getData could be any route name for Home page and Contact Us


router.get("/getData", authenciate, (req, res) => {
    console.log("Hello Contact page, here we will fetch the data from Database");
    res.send(req.rootUser);
});

// contactus page

router.post("/contactus", authenciate, async (req, res) => {

    try{

        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message)
        {
            console.log("Error in the contact form")
            return res.json({error:"Please fill the contact form completely..."})
        }

        const userContact = await User.findOne({_id: req.userID})

        if(userContact)
        {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();
            res.status(201).json({message:"User Contacted Successfully"})
        }

    }
    catch(err)
    {
        console.log(err);
    }

     });

// logout page

router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', {
        path:'/'
    })
    console.log("user logout successfully...");
    res.status(200).send('User Logout Successfully');
});



module.exports = router;
