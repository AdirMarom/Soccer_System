<template>
  <div>
    <GamePreview
      v-for="g in games"
      :date="g.date" 
      :id="g.ID"
      :hostTeam="g.homeTeam"
      :guestTeam="g.awayTeam"
      :date="g.date"
      :hour="g.time"
      :key="g.ID"
    ></GamePreview>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },
  data() {
    return {
      //games: this.axios.get("http://localhost:3000/matches/favoriteMatches")
      allMyGames: [],
      games: [],
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
      if (response1.status == 200) {
        this.games = response1.data;
      }
    },
  },
  mounted() {
    this.setGames();
  },
};
</script>

<style></style>