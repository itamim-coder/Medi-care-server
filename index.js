const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
var ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srriw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run(){
    try{
        await client.connect();
        const database = client.db('mediCare');
        const departmentsCollection = database.collection('department');

          //GET API
          app.get('/department', async (req, res) => {
            const cursor = departmentsCollection.find({});
            const department = await cursor.toArray();
            res.send(department);
        } )
             //Get Single Course            
             app.get("/department/:id", async(req, res) =>{
                const result = await departmentsCollection
                .find({_id: ObjectId(req.params.id)})
                .toArray();
                res.send(result[0])
            } )  
       


        console.log('connected database')

    }
    finally{
        //await client.close();
    }

}

run().catch(console.dir)

app.get('/', (req, res)  =>{
    res.send('ruuning medicare')
})

app.listen(port, ()=>{
    console.log('running medicare', port)
})