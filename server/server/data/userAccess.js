const DButils = require("../domain/routes/DButils");

async function getUsersId(){
    const users_id = (await DButils.execQuery(
        "SELECT username FROM dbo.users "
      )
    );

    return users_id;
}

async function getUserNames(){
    const users_names = (await DButils.execQuery(
        "SELECT username FROM dbo.users"
      )
    );

    return users_names;
}
async function insertFavoriteTeam(user_id, team_id) {
  try {
    await DButils.execQuery(
      `insert into dbo.FavoriteTeams (user_id,team_id) values ('${user_id}',${team_id})`
    );
    return true;
  }
  catch (error) {
    console.log(error);
  }
}
async function getFavoriteTeam(user_id) {
  const team_ids = await DButils.execQuery(
    `select team_id from dbo.FavoriteTeams where user_id='${user_id}'`
  );
  return team_ids;
}

async function registerUser(username,firstname, lastname, country, hash_password,imageUrl, email, type){
    await DButils.execQuery(
        `INSERT INTO dbo.users (username, firstname ,lastname ,country , password, email,image_url,type)
         VALUES ('${username}','${firstname}','${lastname}','${country}', '${hash_password}','${email}','${imageUrl}','${type}')`
      );
    return true;
  }

  async function getUserInfoByName(username){
    const user = (
        await DButils.execQuery(
          `SELECT * FROM dbo.users WHERE username = '${username}'`
        )
      )[0];

    return user;
}

async function insertFavoritePlayers(user_id,player_id){
  try{
    await DButils.execQuery(
        `insert into dbo.FavoritePlayers (user_id,player_id) values ('${user_id}',${player_id})`
      );
    return true;
  }
  catch (error) {
    console.log(error);
}
  }

async function insertfavoriteMatches( user_id, match_id){
    await DButils.execQuery(
        `INSERT INTO dbo.FavoriteMatches (user_id, match_id)
         values ('${user_id}',${match_id})`
      );
  }

async function getFavoritePlayers(user_id){
    const player_ids = await DButils.execQuery(
        `select player_id from dbo.FavoritePlayers where user_id='${user_id}'`
      );
      return player_ids;
}

async function getFavoriteMatches(user_id){
    const match_ids = await DButils.execQuery(
        `select match_id from dbo.FavoriteMatches
         where user_id='${user_id}'`
      );
      return match_ids;
}


exports.getFavoriteTeam=getFavoriteTeam;
exports.insertFavoriteTeam=insertFavoriteTeam;
exports.getFavoriteMatches = getFavoriteMatches;
exports.insertfavoriteMatches = insertfavoriteMatches;
exports.insertFavoritePlayers = insertFavoritePlayers;
exports.getFavoritePlayers = getFavoritePlayers;
exports.getUserNames = getUserNames;
exports.getUsersId = getUsersId;
exports.registerUser = registerUser;
exports.getUserInfoByName = getUserInfoByName;