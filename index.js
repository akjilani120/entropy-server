const express = require('express')
const app = express()
const cors = require ("cors")
const port = process.env.PORT || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uddhpex.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const techCollection = client.db("blog").collection("tech");

  }finally{
    await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})