var express = require("express");
var router = express.Router();
const league_utils = require("../domain/routes/league_utils");


router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();

    res.send(league_details);
  } catch (error) {
    next(error);
  }
});


router.get("/getDetailsPage", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    const season_res = league_details.data.season.data;
    const name =  league_details.data.name;
    const season = season_res.name;
    const season_id = season_res.id;
    const current_stage_id = league_details.data.current_stage_id;
    const season_details = league_utils.getSeasonDetails( season_id );
    
    let result = {
      name: name,
      season: season,
      season_id: season_id,
      current_stage_id: current_stage_id,
      closetGame: {
        "ID": "1111116",
        "awayTeam": "Randers",
        "date": "22-08-2021",
        "events": null,
        "homeTeam": "Nordsjælland",
        "referee": "Heldermartinez1",
        "scoreAway": null,
        "scoreHome": null,
        "stadium": "Right to Dream Park",
        "time": "20:00"
    }
    }
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});






router.get("/currSeasonTeams", async (req, res, next) => {
  try {
    sorted =  req.body.sorted;
    const season = await league_utils.getTeams(sorted);
    res.send(season);
  } catch (error) {
    next(error);
  }
});





module.exports = router;
