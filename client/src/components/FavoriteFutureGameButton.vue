<template>
  <div>
        <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" @click="addGame">Add To Favorites </button>
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
    async addGame(){
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