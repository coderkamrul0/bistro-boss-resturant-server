const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.mjrrjle.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection = client.db("bistroDb").collection("menu")
    const reviewsCollection = client.db("bistroDb").collection("reviews")

    app.get('/menu', async(req,res) => {
        const result = await menuCollection.find().toArray();
        res.send(result)
    })
    app.get('/reviews', async(req,res) => {
        const result = await reviewsCollection.find().toArray();
        res.send(result)
    })












    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get('', (req,res) => {
    res.send("Restaurant server is running")
})
app.listen(port, ()=> {
    console.log(`Restaurant server is running on port ${port}`);
})