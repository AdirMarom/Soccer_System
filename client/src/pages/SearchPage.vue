<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Player/Team:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="search">Search</b-button>
        <div>
          <b-dropdown text="Click To Sort">
            <b-dropdown-item @click="sortDescendingTeams(true)" > Ascending Teams Names </b-dropdown-item>
            <b-dropdown-item @click="sortDescendingTeams(false)"> Descending Teams Names </b-dropdown-item>
            <b-dropdown-item @click="sortDescendingPlayers(true)">
              Ascending Players Names
            </b-dropdown-item>
            <b-dropdown-item @click="sortDescendingPlayers(false)">
              Descending Players Names
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-input-group-append>
    </b-input-group>

    <br />
    <div v-if="players">
      <playerInfo
        v-for="player in this.players"
        :key="player.player_id"
        :player="player"
      ></playerInfo>
    </div>
     <div v-if="teams">
      <teamPreview
        v-for="team in this.teams"
        :key="team.id"
        :team="team"
      ></teamPreview>
    </div>
  </div>
</template>

<script>
import playerInfo from "../components/playerInfo.vue";
import teamPreview from "../components/teamPreview.vue";

export default {
  components: {
    playerInfo,
    teamPreview,
  },
  data() {
    return {
      searchQuery: "",
      players: null,
      teams: null,
    };
  },
  methods: {
    async searchTeam() {
      if (this.searchQuery) {
        const res = await this.axios.get(
          `http://localhost:3000/teams/teamByName/${this.searchQuery}`
        );
        if (res.status == 200) {
          if (res.data != []) {
            console.log(res);
            this.teams = res.data.team.data;
          }
        }
      }
    },

    sortDescendingPlayers( bool ) {
      if (!this.players) {
        return;
      }
      if (bool){
        const sorted_players = this.players.sort(function (player1, player2) {
        if (player2.lastname < player1.lastname) {
          return -1;
        }
        if (player2.lastname > player1.lastname) {
          return 1;
        }
        return 0;
      });
      this.players = sorted_players;
      }
      else{
        const sorted_players = this.players.sort(function (player1, player2) {
        if (player2.lastname < player1.lastname) {
          return 1;
        }
        if (player2.lastname > player1.lastname) {
          return -1;
        }
        return 0;
      });
      this.players = sorted_players;
      }
    },

    sortDescendingTeams( bool ) {
      if ( !this.teams ) {
        return;
      }
      if (bool){
        const sorted_teams = this.teams.sort(function (team1, team2) {
        if (team2.name < team1.name) {
          return -1;
        }
        if (team2.name > team1.name) {
          return 1;
        }
        return 0;
      });
      this.teams = sorted_teams;
      }
      else{
        const sorted_teams = this.teams.sort(function (team1, team2) {
        if (team2.name < team1.name) {
          return 1;
        }
        if (team2.name > team1.name) {
          return -1;
        }
        return 0;
      });
      this.teams = sorted_teams;
      }
    },

    async searchPlayers() {
      if (this.searchQuery) {
        console.log(this.searchQuery);
        const res = await this.axios.get(
          `http://localhost:3000/players/playersDetails/${this.searchQuery}`
        );
        console.log(res.data);
        if (res.status == 200) {
          this.players = res.data;
        }
      }
    },

    async search() {
      this.teams = null;
      await this.searchTeam();
      await this.searchPlayers();
    },
  },
};
</script>

<style scoped>
#search-input {
  margin-left: 20px;
  width: 500px;
}
</style>