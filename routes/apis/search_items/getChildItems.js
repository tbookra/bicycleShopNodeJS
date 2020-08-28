const express = require("express");
const Items = require('../../../models/mySql/Items');
const router = express.Router();

router.get("/", async (req,res)=>{
let items = await Items.getItemsByCategory('child');
res.json(items);
})


module.exports = router;