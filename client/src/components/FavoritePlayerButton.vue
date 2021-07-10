<template>
  <div>
        <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" @click="addPlayer">Add To Favorites </button>
        <b-alert v-if="addFlag" show dismissible>Player was successfully added!</b-alert>
  </div>
</template>

<script>
export default {
    name: "FavoritePlayerButton",
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
    async addPlayer(){
        try{
            const response=await this.axios.post(`http://localhost:3000/users/addFavoritePlayer`,
            {playerId:this.id});
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