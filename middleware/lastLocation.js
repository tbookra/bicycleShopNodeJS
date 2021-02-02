const Items = require("../models/mySql/Items");
// const PORT = process.env.PORT

module.exports = async (req, res, next) => {
  try {
    let product = await Items.getItemByID(req.params.item_id);
    product = product[0][0];
    req.session.lastLocation = product;
    // req.session.lastLocation = req.params.item_id
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};
