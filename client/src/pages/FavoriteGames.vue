<template>
  <div>
    <br/>
    <br/>
    <h3 class="title">MY FAVORITE GAMES</h3>
    <b-container>
      <b-row>
            <div v-if="!this.load">
      <div class="text-center">
        <b-spinner  label="Spinning" style="color:white"></b-spinner>
        <b-spinner label="Spinning" style="color:white"></b-spinner>
        <b-spinner  label="Spinning" style="color:white"></b-spinner>
      </div>
            </div>
    <div v-else>
        <div v-if="!games.length" class="text-center">
        <b-button variant="primary">
        there is no Favorite Games
        </b-button>
          </div>
        <div v-else>
          <b-card-group deck >
            <GamePreview class="favorite_card"
              v-for="g in shownGames"
              :id="g.ID"
              :hostTeam="g.homeTeam"
              :guestTeam="g.awayTeam"
              :date="g.date"
              :hour="g.time"
              :key="g.ID"
            ></GamePreview>
      </b-card-group>
        </div>
    </div>
      </b-row>
    </b-container>


    </div>

</template>

<script>
import GamePreview from "../components/GamePreview.vue";
import { BSpinner } from 'bootstrap-vue'

export default {

  name: "FavoriteGames",
  props: {
    isMain: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    GamePreview,
    BSpinner,
  },
  data() {
    return {
      //games: this.axios.get("http://localhost:3000/matches/favoriteMatches")
      load:false,
      allMyGames: [],
      games: [],
      shownGames: [],
      //  {
      //    id:25,
      //    hostTeam: "Maccabi Tel-Aviv",
      //    guestTeam: "Hapoel Beer-Sheva",
      //    date: "27/5/21",
      //    hour: "20:00"
      //  },
      //  {
      //    id:39,
      //    hostTeam: "Hapoel Tel-Aviv",
      //    guestTeam: "Maccabi Haifa",
      //    date: "29/5/21",
      //    hour: "20:00"
      //  }
    };
  },
  methods: {
    async setGames() {
      const response1 = await this.axios.get(
        "http://localhost:3000/matches/favoriteFutureMatches"
      );
      if (response1.data) {
        this.games = response1.data;
        if (this.isMain)
          this.shownGames = this.games.slice(0, 3);
        else 
          this.shownGames = this.games;

      }
      this.load=true;
    },
  },
  mounted() {
    this.setGames();
  },
};
</script>

<style>
.favorite_card{
  text-align: center;
  margin-left: 10%;
  margin-right:10% ;
  
}
</style>