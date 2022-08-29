const express = require ('express');
const router = express.Router();
const Skill = require('../models/skill');


// Get skills in a drop down
router.get('/all', async (req,res)=>{
    console.log("in skill route");
    
    try{
        const getSkill = await Employer.find(); 
        res.json(getSkill);
        console.log("getSkill"+getSkill);
    }catch(err){
        console.log("In error /Skill");
        res.json({message: err})
    }
})