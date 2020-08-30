const express = require("express");
const Items = require('../../../models/mySql/Items');
const router = express.Router();

router.get("/getchild", async (req,res)=>{
    let items = await Items.getItemsByCategory('child');
    res.json(items);
    });

router.get("/getmountain", async (req,res)=>{
    let items = await Items.getItemsByCategory('mountain');
    res.json(items);
    });

router.get("/getelectric", async (req,res)=>{
    let items = await Items.getItemsByCategory('electric');
    res.json(items);
    });

router.get("/getall", async (req,res)=>{
    let items = await Items.getAllItems();
    res.json(items);
    })

router.post("/", async (req,res)=>{
    let {str,category} = req.body;
    let search = await Items.getItemsByitemAndCategoty(str,category);
   search = search[0];
   res.json(search);
});

router.post("/getall", async (req,res)=>{
    let str = req.body.str;
    let search = await Items.getItemsBySearch(str);
   search = search[0];
   res.json(search);
})


module.exports = router; 