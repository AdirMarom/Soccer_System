<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" style="background-color:#171817 !important;">
      <b-navbar-brand :to="{ name: 'main' }">Superliga</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'CurrStageGames' }">current Stage Games</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item>hello Guest</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
           {{$root.store.username}}
          </template>

          <b-dropdown-item href="#" @click="moveToMyGames">Favorite Games</b-dropdown-item>
          <b-dropdown-item href="#" @click="moveToMyPlayers">Favorite Players</b-dropdown-item>
          <b-dropdown-item href="#" @click="moveToMyTeams">Favorite Teams</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.axios.post("http://localhost:3000/Logout");
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });


    },
    moveToMyGames(){
        this.$router.push({name:"FavoriteGames" });

    },
    moveToMyTeams(){
      this.$router.push({name:"FavoriteTeams" });
    },
    moveToMyPlayers(){
      this.$router.push({name:"FavoritePlayers" });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #171817;
}
</style>
