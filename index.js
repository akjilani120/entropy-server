const express = require('express')
const app = express()
const cors = require ("cors")
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = `mongodb+srv://akjilani:Rp7pHWKAN3kd9ibC@cluster0.uddhpex.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors())
app.use(express.json())

async function run() {
  
  try{   
    await client.connect();

    const blogCollection = client.db("blog").collection("tech");
    
    app.get("/blog/all",   async (req , res)=>{     
     const result = await blogCollection.find().toArray()  
     res.send(result)
    })

    app.get("/blog",   async (req , res)=>{
      const blogType = req.query.blogType         
      const query ={ blogType : blogType}       
     const result = await blogCollection.find(query).toArray()    
     res.send(result)
    })

    app.post('/blog', async(req, res) =>{
      const blog = req.body
      console.log(blog)
      const result = await blogCollection.insertOne(blog)
      res.send(result)
    })
  }finally{
    
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})