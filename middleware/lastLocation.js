const Items = require('../models/mySql/Items');

module.exports = async (req, res, next) => {
    let product = await Items.getItemByID(req.params.item_id);
    product = product[0][0];
    req.session.lastLocation = product;
    // req.session.lastLocation = req.params.item_id
      next();
      
      
    };