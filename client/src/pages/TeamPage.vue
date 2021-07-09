<template>
  <div>
      <h2 style="color:black">Team Page</h2>
      <div id="TeamDiv"> 
      <p>Team Name: {{this.curr_team}}</p>
      </div>
    <div class="team_players">
      <h2>Players</h2>   
        <div v-if="players">
        <playerInfo
            v-for="player in this.players"
            :key="player.player_id"
            :player="player"
        ></playerInfo>
      </div>

      <div id="future"> 
          <div  id="futureGames" v-if="futureGames">
                <h3>Future Games</h3>
                <div>
                    
                    <GamePreview v-for="game in this.futureGames" :key="game.id"
                    :id="game.ID" 
                    :hostTeam="game.homeTeam" 
                    :guestTeam="game.awayTeam" 
                    :date="game.date"
                    :hour="game.time" 
                    :stadium="game.stadium" ></GamePreview> 
                </div>
          </div>

      </div>

      <div id="past"> 
          <div  id="pastGames" v-if="pastGames">
                <h3>Past Games</h3>
                <div>
                    <GamePreview v-for="game in this.pastGames" :key="game.id"
                    :id="game.ID" 
                    :hostTeam="game.homeTeam" 
                    :guestTeam="game.awayTeam" 
                    :date="game.date"
                    :hour="game.time" 
                    :stadium="game.stadium"
                    :homeScore="game.scoreHome"
                    :awayScore="game.scoreAway"
                    :events="game.events"></GamePreview> 
                </div>
          </div>

      </div>
  </div>
</div>
</template>

<script>

import GamePreview from "../components/GamePreview.vue";
import playerInfo from "../components/playerInfo.vue";
export default {
    components: { GamePreview ,playerInfo},
    data(){
        return{
             details:null,
             players:[],
             futureGames:[],
             pastGames:[],
             curr_team:null
        }
    },
    mounted(){
        try{
            this.curr_team=this.$route.params.team_name;
            this.future_matches();
            this.past_matches();
            this.TeamDetails();
        }
        
        catch(error){
            console.log(error);
        }
    },
    methods:{
        async TeamDetails(){
            const response=await this.axios.get(`http://localhost:3000/teams/teamFullDetails/${this.$route.params.team_name}`);
            this.players= response.data;
        },

       async future_matches(){
            const response=await this.axios.get(
                `http://localhost:3000/matches/getAllFutureGames`);
            if(response){
                this.futureGames = response.data;

            }               
        },
        async past_matches(){
            const response=await this.axios.get(
                `http://localhost:3000/matches/getAllPastGames`);
            if(response){
                console.log(response.data)
                this.pastGames= response.data;
            }        
        }

    }
}
</script>