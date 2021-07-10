<template>
  <div>
             <h3 class="title">CURRENT STAGE GAMES</h3>
    <b-container>
      <b-row>
          <h1 class="title">Future Games</h1>
      </b-row>
      <b-row>
          <div v-if="!this.pastLoad">
              <div class="text-center">
                   <b-spinner  label="Spinning" style="color:white"></b-spinner>
                   <b-spinner label="Spinning" style="color:white"></b-spinner>
                   <b-spinner  label="Spinning" style="color:white"></b-spinner>
              </div>
          </div>
          <div v-else>
              <div v-if="futureGames">
                <b-card-group deck>
                    <div v-for="game in this.futureGames" :class="card" :key="game.id">
                        <GamePreview 
                        :id="game.ID" 
                        :hostTeam="game.homeTeam" 
                        :guestTeam="game.awayTeam" 
                        :date="game.date"
                        :hour="game.time" 
                        :stadium="game.stadium" >
                        </GamePreview> 
                        <center>
                        <FavoriteFutureGameButton v-if="$root.store.username" :id="game.ID" ></FavoriteFutureGameButton>
                        </center>
                    </div>
                </b-card-group>
              </div>
          </div>

      </b-row>
        <h1 class="title">Past Games</h1>
      <b-row>
      <b-row>
        <div v-if="!this.pastLoad">
              <div class="text-center">
                   <b-spinner  label="Spinning" style="color:white"></b-spinner>
                   <b-spinner label="Spinning" style="color:white"></b-spinner>
                   <b-spinner  label="Spinning" style="color:white"></b-spinner>
              </div>
          </div>
          <div v-else>
            <div  v-if="pastGames">
              <b-card-group deck>
                  <div  v-for="game in this.pastGames" :key="game.id">
                  <GamePreview
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
              </b-card-group>
           </div>
        </div>
         
      </b-row>

      </b-row>
    </b-container>
  </div>
</template>

<script>

import moment from 'moment';
import GamePreview from "../components/GamePreview.vue";
import FavoriteFutureGameButton from '../components/FavoriteFutureGameButton.vue';
import { BSpinner } from 'bootstrap-vue';
export default {
  components: { GamePreview, FavoriteFutureGameButton, BSpinner},
    
    data(){


        return{
            user:false,
            futureGames:[],
            pastGames:[],
            futureLoad:false,
            pastLoad:false
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
            this.futureLoad=true;
                
        
        },

        async past_matches(){
            const response=await this.axios.get(
                `http://localhost:3000/matches/getAllPastGames`);
            if(response){
                console.log(response.data)
                this.pastGames= response.data;
            }    
            this.pastLoad=true;    
        }
    }
}
</script>

<style>
.card {
  display: inline-block;
  width: 250px;
  height: 400px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}
.card-group .card {
    max-width: 25%;
}

.container {
    display: grid;
    width: 100%; /*Optional*/
    table-layout: fixed; /*Optional*/
    border-spacing: 10px; /*Optional*/
}




.blueContent{
  height:100px;
  background:#0C7D8B;
  position:relative;
}


.blueDiagonal{
   width: 0;
   height:0;
   border-top: 100px solid #0C7D8B;
   border-left: 100vw solid transparent;
}


.greenContent{

  background:#97C839;

  position:relative;
}

.whiteDiagonal{
   width: 0;
   height:0;
   position:absolute;
   bottom:0px;
   border-bottom: 100px solid white;
   border-left: 100vw solid transparent;
}


.whiteContent{
  height:200px;
  background:white;
  overflow:hidden;
}

.footer{
  background:#282828;
  height:100px;
}



</style>