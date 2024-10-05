//main api for the backend
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const cors=require('cors')

//initializing express
const app=express();

//using the bodyparser and cors
app.use(bodyParser.json());
app.use(cors());

//creating the route to verify page
app.use('/api/verify-code/',require('./routes/api/verifyCode'))
//port to run the server
app.get('/',(req,res)=>{
  res.send('Hi')
})

const PORT=process.env.PORT||5000

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));