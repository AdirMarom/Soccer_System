<template>
<div class="page">
    <center>
<div class="playerCard">
  <b-card
    no-body
    style="max-width: 20rem;"
  >
    <template #header>
      <h4 class="mb-0">Player Page</h4>
    </template>
      <img :src="this.player.image_path" height="300" width="300" >
    <b-card-body>
      <b-card-text>
            <p v-if="this.player.fullname"> Full Name:{{this.player.fullname}}</p>
            <p>Team Name: {{this.player.team_name}}</p>
            <p>Position: {{this.player.position_id}}</p>
            <p>Nationality: {{this.player.nationality}}</p>
            <p> Birth Date: {{this.player.birthdate}}</p>
            <p>Birth Place: {{this.player.birthcountry}}</p>
            <p>Height: {{this.player.height}}</p>
            <p v-if="this.player.weight">Weight: {{this.player.weight}}</p>
      </b-card-text>
    </b-card-body>


    <b-card-body>
    </b-card-body>

    <b-card-footer>
   <div v-if="$root.store.username" >
       <div v-if="!this.favorite==true">
       <FavoritePlayerButton :id="this.player.player_id" ></FavoritePlayerButton>
        </div>
       <div v-else>
        <img :src="this.icon" height="60" width="60" >
       </div>
    </div>  
    </b-card-footer>

  </b-card>
</div>
</center>
</div>
</template>

<script>
import FavoritePlayerButton from '../components/FavoritePlayerButton.vue';
import icon from '../../resource/favorite-icon.jpg';

export default {
    components: { FavoritePlayerButton},
    data(){
        return{
            player:undefined,
            favorite:false,
            favoriteMatchs:[],
            icon:icon,

            }
    },
    mounted(){
        try{
            
            this.playersDetails();
            this.isFavorite();
            
            }
        catch(error){console.log(error);}
    },
    methods:{
        async playersDetails(){
            const response=await this.axios.get(`http://localhost:3000/players/playersDetailsById/${this.$route.params.Player_id}`);
            if(response.status==200)
                this.player=response.data;
            
        },
        async isFavorite(){
            const response=await this.axios.get(`http://localhost:3000/users/favoritePlayers`);
            if(response.status==200){
               let matchArray=response.data;
               let flag = false;
               if (matchArray){
                   matchArray.map((match)=>{
                       if (match.player_id == this.player.player_id);
                            this.favorite=true;
                   })
               }


                //for(let i=0; i<matchArray.length; i++){
                //    if(matchArray[i].player_id==this.player.player_id)
                //        console.log("player exist");
                //        this.favorite=true;
                //        return;
                //}
                //console.log("player exist");
                if(this.favorite!=true)
                    this.favorite=false;
            }
        }
    }
}
</script>
<style>

#app {
  background-image: url('../../resource/playerWallpaper.jpg');
}
.page{
    margin-top:20px ;
}
.playerCard{
    width: 50%;
    height: 80%;
}
</style>