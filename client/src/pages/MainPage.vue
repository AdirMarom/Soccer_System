<template>
  <div class="mainDiv">
    <div class="left_container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <LeagueInfo></LeagueInfo>
    </div>
    <br />
    <br />
    <img src='../../resource/SuperLiga.png' height="80" width="250">


    <div class="right_container">
      <br />
      <LoginPage v-if="!$root.store.username"></LoginPage>
      <FavoriteGames v-else :isMain="true"></FavoriteGames>
    </div>
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

<style >
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
</style>