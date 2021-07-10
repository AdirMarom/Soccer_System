<template>
  <div>
    <br/>
    <br/>
    <h3 class="title">MY FAVORITE PLAYERS</h3>
    <b-container>
      <b-row>
          <div v-if="!this.load">
            <div class="text-center">
              <b-spinner label="Spinning" style="color: white"></b-spinner>
              <b-spinner label="Spinning" style="color: white"></b-spinner>
              <b-spinner label="Spinning" style="color: white"></b-spinner>
            </div>
          </div>
          <div v-else>
            <div v-if="!players.length" class="text-center">
              <b-button variant="primary">
                there is no Favorite Games
                <b-badge variant="light">
                  <span class="sr-only">unread messages</span></b-badge
                >
              </b-button>
            </div>
            <div v-else>
              <b-card-group deck>
              <playerInfo
                v-for="player in this.players"
                :key="player.player_id"
                :player="player"
              ></playerInfo>
              </b-card-group>
            </div>
          </div>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import playerInfo from "../components/playerInfo.vue";
import { BSpinner } from "bootstrap-vue";

export default {
  name: "FavoritePlayers",
  props: {},
  components: {
    playerInfo,
    BSpinner,
  },
  data() {
    return {
      load: false,
      allMyGames: [],
      games: [],
      shownGames: [],
      players: [],
    };
  },
  methods: {
    async setPlayers() {
      const response1 = await this.axios.get(
        "http://localhost:3000/users/favoritePlayers"
      );
      if (response1.data) {
        this.players = response1.data;
      }
      this.load = true;
    },
  },
  mounted() {
    this.setPlayers();
  },
};
</script>

<style>
.favorite_card {
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
}
</style>