<template>
<div>
   <div v-if="$root.store.username" >
       <div v-if="!this.favorite==true">
       <FavoritePlayerButton :id="this.player.player_id" ></FavoritePlayerButton>
        </div>
       <div v-else>
       <h2>this player is favorite </h2>
       </div>

    </div>  
  <div>
      <h2 style="color:black">Player Page</h2>
      <div id="playerDiv"> 
      <p > Full Name: {{this.player.full_name}}</p>
      <p>Team Name: {{this.player.team_name}}</p>
      <img :src="this.player.image_path" height="300" width="300" >
      <p>Position: {{this.player.position_number}}</p>
      <p >Common Name: {{this.player.common_name}}</p>
      <p>Nationality: {{this.player.nationality}}</p>
      <p> Birth Date: {{this.player.birthdate}}</p>
      <p>Birth Place: {{this.player.birthcountry}}</p>
      <p>Height: {{this.player.height}}</p>
      <p v-if="this.player.weight">Weight: {{this.player.weight}}</p>
    </div>
</div>
</div>
</template>

<script>
import FavoritePlayerButton from '../components/FavoritePlayerButton.vue';
export default {
    components: { FavoritePlayerButton},
    data(){
        return{
            player:undefined,
            favorite:false,
            favoriteMatchs:[],
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