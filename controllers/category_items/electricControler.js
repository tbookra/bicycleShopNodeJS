const express = require("express");
const Items = require('../../models/mySql/Items');
const Pagination = require('../../models/mySql/pagination');

const electricPage = async function (req, res, next) {
    try{
    let productsInfo = await Pagination.pageItems('electric','asc',9,0);
    let arr = productsInfo[0];
    if (req.query.search) {
        arr = productsInfo[0].filter((item) => {
        return item.item_name.search(req.query.search) >= 0;
      });
    }
      res.status(200).render("electric", {
      title: "Express",
      ...req.nav,
      electricarr: arr,
    });
  } catch (e) {
    res.status(400).json(e);
  }
  };

  const electricPost = async function (req, res, next) {
    try{
      const {limit,offset,sort} = req.body;
      let productsInfo = await Pagination.pageItems('electric',sort,limit,offset);
      let arr = productsInfo[0];
      res.status(200).json(arr);
  } catch (e) {
    res.status(400).json(e);
  }
  
  };

  const electricItem =  async (req, res) => {

    let place = await Items.getItemByID(req.params.item_id);
    place = place[0][0];
    res.status(200).render("place_ditales", { ...req.nav, title: place.item_name, place: place });
  };

  module.exports.electricPage = electricPage;
  module.exports.electricPost = electricPost;
  module.exports.electricItem = electricItem;