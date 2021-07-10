<template>

<div>

      <b-container>
                <h2 id="mainTitle">SUPERLIGA</h2>
        <b-row>
            <b-col>
                    <LeagueInfo></LeagueInfo>
            </b-col>
                    <LoginPage v-if="!$root.store.username"></LoginPage>
                    <FavoriteGames v-else :isMain="true"></FavoriteGames>
        </b-row>

      </b-container>

</div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../pages/FavoriteGames";
import LoginPage from "../pages/LoginPage";

export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
  },
};
</script>

<style>
#mainTitle{
    font-family: 'Zen Tokyo Zoo', cursive;
    font-size: 100px;
    text-align: center;
    color: cornsilk;
}
@import url('https://fonts.googleapis.com/css2?family=Zen+Tokyo+Zoo&display=swap');
.title{
  font-family: 'Zen Tokyo Zoo', cursive;
  font-size: 50px;
}
.mainDiv {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  display: inline-flex;
}
#app {
  background-image: url('../../resource/playerWallpaper.jpg');
}
.left_container {
  margin-left: 10%;
  margin-right: 8%;
  height: 70%;
}
.right_container {
  display: block;
  margin-top: 5%;
}
.title {
  text-align: center;
  position: relative;
  color: rgb(255, 255, 255);
  font: icon italic;
}
.leagueName {
  color: rgb(255, 255, 255);
  text-decoration: underline;
}

.title{
  text-align: center;
  color:whitesmoke;
}
</style>