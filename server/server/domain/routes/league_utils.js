const axios = require("axios");
const LEAGUE_ID = 271;
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

async function getLeagueDetails() {
  
  const res = await axios.get(`${api_domain}/leagues/${LEAGUE_ID}`, {
    params: {
      include: 'season',
      api_token: process.env.api_token,
    },
  });
  return res.data;
}

async function getTeams(sorted){
  
  league = await getLeagueDetails();
  if (!league){ return }
  let id =  league.data.season.data.id;
  const teams = getSeasonTeams(id);
  if ( sorted == 'false' )
    return teams;
  
  teams = teams.sort(function(team1, team2){
    if(team2.name < team1.name) { return -1; }
    if(team2.name > team1.name) { return 1; }
    return 0;
})
return teams;
}

async function getSeasonTeams(seasonId){
  const res = await axios.get(`${api_domain}/teams/season/${seasonId}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  return res.data.data;
}


async function getSeasonDetails(season_id){
  const seasonId = req.params.seasonId;
  try {
    const result = await axios.get(`${api_domain}/seasons/${seasonId}`, {
      params: {
        api_token: process.env.api_token,
      },
    });
  return result.data;
  } catch (error) {
    next(error);
  }
}



exports.getSeasonDetails = getSeasonDetails;
exports.getTeamByName = getTeamByName;
exports.getTeams = getTeams;
exports.getLeagueDetails = getLeagueDetails;
