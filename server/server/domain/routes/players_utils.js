const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

// const TEAM_ID = "85";

function sortPlayersByName(players) {

    return players.slice().sort(function (player1, player2) {

        return player2.name - player1.name;

    });

}

async function getPlayerIdsByTeam(team_id) {

    let player_ids_list = [];
    const team = await axios.get(`${api_domain}/teams/${team_id}`, {

        params: {

            include: "squad",
            api_token: process.env.api_token

        }

    });
    team.data.data.squad.data.map((player) => player_ids_list.push(player.player_id));
    return player_ids_list;

}
async function getPlayerbyName(playerName) {

    let playerList = [];
    const res = await axios.get(`${api_domain}/players/search/${playerName}`, {

        params: {

            api_token: process.env.api_token

        }

    });

    res.data.data.map((player) => playerList.push(player));
    let players_info = await Promise.all(playerList);
    return players_info
    //return extractRelevantPlayerData(players_info);

}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
      for(let i=0 ; i<players_info.length;i++){
      results.push(extractRelevantPlayerData(players_info[i]));
    }
    //let players_info = await getPlayersInfo(player_ids_list);
    results=await Promise.all(results);
  return results;
}

//function extractRelevantPlayerData(players_info) {
//  return players_info.map((player_info) => {
//    const { player_id,fullname, image_path, position_id } = player_info.data.data;
//    const { name } = player_info.data.data.team.data;
//    return {
//      player_id: player_id,
//      full_name: fullname,
//      team_name: name,
//      pic: image_path,
//      position_number: position_id
//    };
//  });
//}

async function getPlayersByTeam(team_id) {

    let player_ids_list = await getPlayerIdsByTeam(team_id);
    console.log(player_ids_list);
    let results=[]
  
    for(let i=0 ; i<player_ids_list.length;i++){
      results.push(getPlayersInfoBySingleID(player_ids_list[i]));
    }
    //let players_info = await getPlayersInfo(player_ids_list);
    results=await Promise.all(results);
    return results;

}

function extractRelevantPlayerData(players_info) {

  const details=players_info.data.data;
  console.log(
    details
  )
  const final_details= {
  player_id: details.player_id,
  full_name: details.fullname,
  team_name: details.team_id,
  pic:details.image_path,
  position_number: details.position_id,
    common_name: details.common_name , nationality: details.nationality,
                        birthdate: details.birthdate , birthcountry: details.birthcountry , height: details.height,
                        weight: details.weight}

  return final_details;
}

//
function extractPlayerData(players_info) {

    return players_info.map((player_info) => {

        const {

            common_name,
            nationality,
            birthdate,
            birthplace,
            height,
            weight

        } = player_info;

        return {

            commonname: common_name,
            nationality: nationality,
            birthdate: birthdate,
            birthplace: birthplace,
            height: height,
            weight: weight

        };

    });

}
//
async function getPlayersInfoBySingleID(players_id) {
  try{
    res = await axios.get(`${api_domain}/players/${players_id}`, {
      params: {
        api_token: process.env.api_token,
        include: "team",
      },
    });
    return extractRelevantPlayerData(res);
  }
  catch(e){
    console.log(e);
  }

}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);

  //extractRelevantPlayerData(players_info);
  return results;
}

exports.getPlayersInfoBySingleID=getPlayersInfoBySingleID;
exports.sortPlayersByName = sortPlayersByName;
exports.getPlayerbyName = getPlayerbyName;
exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
