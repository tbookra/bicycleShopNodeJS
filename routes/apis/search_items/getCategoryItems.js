const express = require("express");
const Items = require('../../../models/mySql/Items');
const pagination = require('../../../models/mySql/pagination');
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
router.post("/getsort", async (req,res)=>{
    const {category,sort} = req.body;
    let items = await pagination.pageItems(category,sort,9,0);
    res.json(items);
    });


module.exports = router; 