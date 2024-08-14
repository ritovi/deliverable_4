const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post")

const getAll = catchError(async (req, res) => {
    const result = await User.findAll({ include: [Post] });


    const users = result.map(user => {
        const userObj = user.toJSON();
        delete userObj.email;
        delete userObj.password;
        return userObj;
    });

    return res.json(users);
});


const create = catchError(async(req, res) => {
    const {password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const result = await User.create({...req.body, password : hashedPassword});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id,{include: [Post]});
    if(!result) return res.sendStatus(404);
    
    const user = result.toJSON();
    
    delete user.email;
    delete user.password;

    return res.json(user);
});

const remove = catchError(async(req, res) => {
    //const { id } = req.params;
    const id = req.user.id;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    
    delete req.body.email;
    delete req.body.password;

    //const { id } = req.params;
    const id = req.user.id;

    const result = await User.update(
        req.body, // Beware that an error occurs if req.body is empty or does not contain the expected data
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req,res)=>{
    const {email, password} = req.body;
   
    const user =  await User.findOne({where: {email}});

    if(!user) return res.status(401).json({error : "Don't ask"});

    const isvalid = await bcrypt.compare(password, user.password);

    if(!isvalid) return res.status(401).json({error : "Don't ask"})
        const payload = {
            user,
        };
        
        const secretKey = process.env.SECRET_TOKEN;
        
        const options = {
           // algorithm: 'HS256', 
            expiresIn: '20m',    
           // issuer: 'issuer',  
           // audience: 'audience', 
           // subject: 'subject'  
        };

    const token = jwt.sign(payload,secretKey, options);
    return res.json({user,token});
});


// const specialSetPosts = async(req,res)=>{
//     try{
//         //const {user_id} = req.params;
//         const user_id = req.user.id;
//         user_id = req.user
//         if(!user_id) return res.status(400).json({error : "User Id is required..."});

//         const user = await User.findByPk(user_id);
//         if(!user) return res.status(404).json({error: "User not found"});

//         await user.setPosts(req.body);
         
//         const result = await user.getActors();

//         return res.json(result);
//     }catch(error){
//         console.log("Error in specialSetPosts : ", error);
//         return res.status(500).json({error: "An unexpected error ocurred"});
//     }
// };

const me = catchError(async(req,res)=>{
    return res.json(req.user);
})
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    // specialSetPosts,
    me
}