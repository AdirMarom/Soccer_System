<template>
  <div>
    <teamPreview key="team.id" v-if="this.team" :team="this.team"></teamPreview>

    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Player/Team:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="search">Search</b-button>
        <div>
          <b-dropdown text="Click To Sort">
            <b-dropdown-item href="#"> Ascending Teams Names </b-dropdown-item>
            <b-dropdown-item href="#"> Descending Teams Names </b-dropdown-item>
            <b-dropdown-item @click="sortDescending">
              Ascending Players Names
            </b-dropdown-item>
            <b-dropdown-item @click="AscendingDescending">
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
    <teamPreview key="team.id" v-if="this.team" :team="this.team"></teamPreview>
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
      team: null,
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
            this.team = res.data.team.data[0];
          }
        }
      }
    },

    sortDescending() {
      if (!this.players) {
        return;
      }
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
    },
    sortAscending() {
      if (!this.players) {
        return;
      }
      const sorted_players = this.players.sort(function (player1, player2) {
        if (player2.lastname > player1.lastname) {
          return -1;
        }
        if (player2.lastname < player1.lastname) {
          return 1;
        }
        return 0;
      });
      this.players = sorted_players;
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
      this.team = null;
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