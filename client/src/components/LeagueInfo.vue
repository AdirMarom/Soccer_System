<template>
  <div>
    <div>
      <b-card
        title="SuperLiga"
        img-src="https://www.logofootball.net/wp-content/uploads/danish-superliga-logo.png"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          Season: {{ season }}
          <br />
          Season Id: {{ season_id }}
          <br />
          Stage: {{ stage }}

          
        </b-card-text>
        <b-card-text v-if="game">
          <h5> Closet Game</h5>
           home Team :{{game.homeTeam}}
          <br/>
           away Team :{{game.awayTeam}} 
          <br/>
           date :{{game.date}} 
          <br/>
           time :{{game.time}} 
          <br/>
           stadium :{{game.stadium}} 

        
        </b-card-text>
      
      </b-card>
    </div>
  </div>
</template>


<script>
/*
current_stage_id: null
name: "Superliga"
season: "2021/2022"
season_id: 18334
*/
import icon from '../../resource/danish-superliga-logo.png';
export default {

  data() {
    return {
      leagueName: "superliga",
      season: "season",
      stage: "stage",
      season_id: "",
      icon:icon,
      game:null,
    };
  },
  methods: {
    async getDetails() {
      const res = await this.axios.get(
        `http://localhost:3000/league/getDetailsPage`
      );
      if (res) {
        const league = res.data;
        this.season = league.season;
        this.stage = league.current_stage_id;
        this.season_id = league.season_id;
        this.game=league.closetGame;
      }
    },
  },
  mounted() {
    this.getDetails();
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
</style>