var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const players_utils = require("../domain/routes/players_utils");



router.get("/playersDetails/:playerName", async (req, res, next) => {
    
    try {
    const name = req.params.playerName;
    const players = await  players_utils.getPlayerbyName( name );
    res.status(200).send(players);

    } catch (error) {
      next(error);
    }
  });

  router.get("/playersFullData/:playerName", async (req, res, next) => {
    
    try {
    const name = req.params.playerName;
    console.log(name)
    const players = await  players_utils.getPlayerbyName(name);
    
    res.status(200).send(players);

    } catch (error) {
      next(error);
    }
  });


  router.get("/playersDetailsById/:playerID", async (req, res, next) => {
    
    try {
    const id = req.params.playerID;
    const player = await  players_utils.getPlayersInfoBySingleID( id );
    res.status(200).send(player);

    } catch (error) {
      next(error);
    }
  });

module.exports = router;
