<template>
  <div>
        <b-button style="margin-left: 1%; margin-top:0.5%;margin-bottom:0.5%" variant="outline-primary" @click="addGames">Add To Favorites </b-button>
        <b-alert v-if="addFlag" show dismissible>Game was successfully added!</b-alert>
  </div>
</template>

<script>
export default {

    props:{
    id:{
        type:String,
        required:true
    }
},
    data(){
    return{
        addFlag:false
    }
},
methods:{
    async addToFavorites(){
        try{
            const response=await this.axios.post(`http://localhost:3000/users/addfavoriteMatchs`,
            {match_id:this.id});
            if(response.status==201){
                this.addFlag=true;
                
            }
        }
        catch(error){
            console.log(error);
        }
    }
}

}
</script>

<style>

</style>