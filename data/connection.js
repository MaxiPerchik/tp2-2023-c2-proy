const MongoClient = require('mongodb').MongoClient;

//TODO: sacar a variable de entorno la cadena de conexion
const uri = "mongodb+srv://admin:tp2@cluster0.3bm3a.azure.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let instance = null;

async function getConnection(){
    try {
        if(instance == null){
            instance = await client.connect();
        }
    } catch (error) {
        console.log(error);
    }
    return instance;
}

module.exports = getConnection;

