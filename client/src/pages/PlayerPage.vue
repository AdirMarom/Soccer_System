<template>
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
</template>

<script>
export default {
    
    data(){
        return{player:undefined }
    },
    mounted(){
        try{this.playersDetails();}
        catch(error){console.log(error);}
    },
    methods:{
        async playersDetails(){
            const response=await this.axios.get(`http://localhost:3000/players/playersDetailsById/${this.$route.params.Player_id}`);
            if(response.status==200)
                this.player=response.data;
            
        }
    }
}
</script>