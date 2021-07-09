var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const players_utils = require("../domain/routes/players_utils");
const coach_utils = require("../domain/routes/coaches_utils");
const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

async function getTeamByName(teamName){
  if(!teamName){return}
  
  const res = await axios.get(`${api_domain}/teams/search/${teamName}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  return res.data;
}

router.get("/getById/:teamId", async (req, res, next) => {
  const id = req.params.teamId;

  try {
    teamDetails = await getTeamById( id );
    
    res.send({
      team: teamDetails,
    });
  } catch (error) {
    next(error);
  }
});

async function getTeamById(teamId){
  if(!teamId){return}
  
  const res = await axios.get(`${api_domain}/teams/${teamId}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  return res.data;
}
function sortPlayers(players){
  if (!players){return}
  players = team_players.sort(function(player1, player2){
    if(player2.name < player1.name) { return -1; }
    if(player2.name > player1.name) { return 1; }
    return 0;
  })
  return players;
}

router.get("/teamFullDetails/:teamName", async (req, res, next) => {

  try {
  
    const teamName = req.params.teamName;    

    teamDetails = await getTeamByName(teamName);

    teamId=teamDetails.data[0].id;
    const team_players = await players_utils.getPlayersByTeam(teamId);
   // console.log(team_players);





    //team_players = await players_utils.getPlayersByTeam(teamId);
   // console.log(team_players)
    res.send(team_players);
  } catch (error) {
    next(error);
  }
});

router.get("/teamFullDetailsbyID/:teamId", async (req, res, next) => {
  //const sorted = req.body.sorted;
  //const filter = req.body.filter;
  let team_details = [];
  try {
  
    const teamId = req.params.teamId;
   // const team_coach = await coach_utils.getCoachbyTeamId(teamId);
    const team_players = await players_utils.getPlayersByTeam(teamId);

   // if (sorted)
  //    team_players = sortPlayers(team_players);
    //this function sort the players
    

    //we should keep implementing team page.....
    res.send(team_players);
  } catch (error) {
    next(error);
  }
});




router.get("/getCoachByTeamId/:teamId", async (req, res, next) => {
  try {
  const id = req.params.teamId;
  const coach = await coach_utils.getCoachbyTeamId( id );
  res.status(200).send(coach);

  } catch (error) {
    next(error);
  }
});

router.get("/teamByName/:teamName", async (req, res, next) => {
  const name = req.params.teamName;

  try {
    teamDetails = await getTeamByName( name );
    console.log(teamDetails.data);

    res.send({
      team: teamDetails,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
