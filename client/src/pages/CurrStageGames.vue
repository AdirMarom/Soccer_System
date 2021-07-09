<template>
  <div>
      <h2 style="color:black">Current Stage Games</h2>
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
</template>

<script>

import moment from 'moment';
import GamePreview from "../components/GamePreview.vue";
export default {
  components: { GamePreview },
    
    data(){


        return{
             futureGames:[],
             pastGames:[],
        }
    },
    mounted(){
        try{
            this.future_matches();
            this.past_matches();
            //v-if="!$root.store.username"
        }
        catch(error){
            
            console.log(error);}
    },
    methods:{
        format_date(value){
         if (value) {
           return moment(String(value)).format('YYYYMMDD')
          }
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