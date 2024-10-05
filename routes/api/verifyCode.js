const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
  res.send('Hello from verify')
})

//geting the code and verifying the code
router.post('/',(req,res)=>{
  const{code}=req.body

  if(code.length!==6 || code[5]==='7'){
    return res.status(400).json({msg:"Verification Error"})
  }

  res.status(200).json({msg:"Verification Success"})
})

module.exports=router