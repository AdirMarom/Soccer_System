var express = require('express');
var router = express.Router();
const DButils = require('./utils/DButils');
const players_utils = require('./utils/players_utils');
const teams_utils = require("./utils/teams_utils");


router.get("/searchPlayerByName/:playerName", async (req, res, next) => {
  //let players = [];
  try {
    const players = await players_utils.getPlayerByName(
      req.query.playerName
    );
    //console.log("Player name is:");
    console.log(req.query.playerName);
    //console.log(players);
    res.send(players);
  } catch (error) {
    next(error);
  }
});


router.get("/searchPlayerById/:playerid", async(req,res,next) =>{
  //let playerdata = []
  try{
    //let idArr=[];
    //idArr.push(req.query.playerid)
    console.log("param is:");
    console.log(req.query.playerid);
    const res1= await players_utils.getPlayersInfoBySingleID(req.query.playerid);
    //const data = await players_utils.getPlayersInfoBySingleID(req.query.playerid);
    res.send(res1);
  }catch(error){
    console.log("There was a mistake fetching player data")
    next(error);
  }
})


module.exports = router;