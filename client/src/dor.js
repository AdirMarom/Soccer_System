const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const TEAM_ID = "85";

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}


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
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  console.log("data is:");
  console.log(players_info);

  const details=players_info.data.data;
  const final_details= {common_name: details.common_name , nationality: details.nationality,
                        birthdate: details.birthdate , birthcountry: details.birthcountry , height: details.height,
                        weight: details.weight}

  return final_details;

 //return players_info.map((player_info) => {
 //  const { fullname, image_path, position_id } = player_info.data.data;
 //  const { name } = player_info.data.data.team.data;
 //  return {
 //    name: fullname,
 //    image: image_path,
 //    position: position_id,
 //    team_name: name,
 //  };
 //});
}

function extractRelevantPlayerData2(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}


async function getPlayerByName(player_name) {
  let players_list = [];

  players_list = await axios.get(
    `${api_domain}/players/search/${player_name}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  //   team.data.data.squad.data.map((player) =>
  //     player_ids_list.push(player.player_id)
  //   );
//   console.log(teams_list.data);
  return players_list.data.data;
}

exports.getPlayerByName = getPlayerByName;
exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayersInfoBySingleID= getPlayersInfoBySingleID;