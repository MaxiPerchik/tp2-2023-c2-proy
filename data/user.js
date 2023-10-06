const getConnection = require('./connection.js');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

async function getUsers(){
    console.log('getusers');
    const connectiondb = await getConnection();
    const users = await connectiondb.db("sample_tp2").collection("users").find().toArray();

    return users;
}

async function findByCredentials(email, password){
    const connection = await getConnection();

    const user = await connection.db("sample_tp2").collection("users").findOne({email: email});
    // TODO: Sacar mesajes reveladores
    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // TODO: Sacar mesajes reveladores
    if(!isMatch){
        throw new Error("Password no corresponde a usuario");
    }

    return user;
}

function generateAuthToken(user){
    const token = Jwt.sign({_id: user._id, email: user.email, username: user.username}, "clavesecreta");
    return token;
}

async function addUser(user){
    user.password  = await bcrypt.hash(user.password, 8);
    const connection = await getConnection();
    const result = await connection.db("sample_tp2").collection("users").insertOne(user);
    return result;
}

module.exports = {getUsers, findByCredentials, generateAuthToken, addUser};