<template>
  <div>
        <b-container>
                    <b-row>
                          <h2 id="mainTitle">Team Page</h2>
                    </b-row>
                    <b-row class="title">
                          <p>{{this.curr_team}} Team</p>
                    </b-row>
                        <b-row>
                            <h2 class="title">Players</h2>
                        </b-row>
                    <b-row>
                            <div v-if="!this.playersLoad">
                                <div class="text-center">
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="players">
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

                    <b-row>
                            <h3 class="title">Future Games</h3>
                    </b-row>
                    <b-row>
                            <div v-if="!this.futurLoad">
                                <div class="text-center">
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                </div>
                            </div>
                            <div v-else>
                                <div  id="futureGames" v-if="futureGames">
                                    <div>
                                        <b-card-group deck>
                                        <GamePreview v-for="game in this.futureGames" :key="game.id"
                                        :id="game.ID" 
                                        :hostTeam="game.homeTeam" 
                                        :guestTeam="game.awayTeam" 
                                        :date="game.date"
                                        :hour="game.time" 
                                        :stadium="game.stadium" ></GamePreview> 
                                        </b-card-group>
                                    </div>
                                </div>
                            </div> 
                    </b-row>
                    <b-row>
                        <h3  class="title" style="text-align: center;">Past Games</h3>
                    </b-row>
                    <b-row>
                            <div v-if="!this.futurLoad">
                                <div class="text-center">
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner label="Spinning" style="color:white"></b-spinner>
                                     <b-spinner  label="Spinning" style="color:white"></b-spinner>
                                </div>
                            </div>
                            <div v-else>
                                 <div  id="pastGames" v-if="pastGames">
                                <b-card-group deck>
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
                                </b-card-group>
                                </div>
                            </div>
                    </b-row>
        </b-container>

</div>
</template>

<script>

import GamePreview from "../components/GamePreview.vue";
import playerInfo from "../components/playerInfo.vue";
import { BSpinner } from 'bootstrap-vue'

export default {
    components: { GamePreview ,playerInfo,BSpinner},
    data(){
        return{
            details:null,
            players:[],
            futureGames:[],
            pastGames:[],
            curr_team:null,
            playersLoad:false,
            futurLoad:false,
            PastLoad:false
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
            if(response.status==200)
                this.players= response.data;
            this.playersLoad=true;
        },

       async future_matches(){
            const response=await this.axios.get(
                `http://localhost:3000/matches/futureSeasonGames/${this.$route.params.team_name}`);
            if(response){
                this.futureGames = response.data;
            }               
            this.futurLoad=true;
        },
        async past_matches(){
            const response=await this.axios.get(
                `http://localhost:3000/matches/pastSeasonGames//${this.$route.params.team_name}`);
            if(response){
                console.log(response.data)
                this.pastGames= response.data;
            }
            this.past=true;        
        }

    }
}
</script>
<style scoped>
.title{
  font-family: 'Zen Tokyo Zoo', cursive;
  font-size: 50px;
  text-align: center;
}
</style>