<template>
  <div class="player-info">
    <div title="id" class="player-title">
      <b @click="this.moveToPlayerPage">Player Name:</b> {{ full_name }}
    </div>
    <ul class="game-content">
      <li>Team Name: {{ team_name }}</li>
      <li>Player Position: {{ Position }}</li>
    </ul>
    <img
      @click="this.moveToPlayerPage"
      :src="image"
      alt="player"
      width="50"
      height="50"
    />
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
  },
  data() {
    /*
        "player_id": 164,
        "team_id": 1435,
        "country_id": 38,
        "position_id": 4,
        "common_name": "D. de Ridder",
        "display_name": "Daniel De Ridder",
        "fullname": "Daniël de Ridder",
        "firstname": "Daniël",
        "lastname": "de Ridder",
        "nationality": "Netherlands",
        "birthdate": "06/03/1984",
        "birthcountry": "Netherlands",
        "birthplace": "Amsterdam",
        "height": "180 cm",
        "weight": "69 kg",
        "image_path": "https://cdn.sportmonks.com/images/soccer/players/4/164.png"
    */
    return {
      full_name: this.player.fullname,
      team_name: this.player.team_name,
      image: this.player.image_path,
      Position: this.player.position_id
    };
  },
  async mounted() {
    this.image = this.player.image_path;
    console.log("Player preview mounted");
  },

  methods: {
    moveToPlayerPage() {
      this.$router.push({
        name: "Player",
        params: { Player_id: this.player.player_id },
      });
    },
  },
};
</script>

<style>
.player-info {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: black;
  background: whitesmoke;
}

.game-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>