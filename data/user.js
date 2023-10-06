const getConnection = require('./connection.js');
const bcrypt = require('bcrypt');

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

module.exports = getUsers, findByCredentials;