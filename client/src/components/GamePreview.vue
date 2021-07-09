<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li @click="this.moveToTeamHostPage"> host: {{ hostTeam }}</li>
      <li @click="this.moveToTeamawaytPage"> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li v-if="stadium"> stadium: {{ stadium }}</li>
      <li v-if="homeScore"> homeScore: {{ hour }}</li>
      <li v-if="awayScore"> awayScore: {{ awayScore }}</li>
      <li v-if="events"> events: {{ events }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: String,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      stadium: {
        type: String,
        required: false
      },
      homeScore: {
        type: Number,
        required: false
      },
      awayScore: {
        type: Number,
        required: false
      },
      events: {
        type: String,
        required: false
      }



  },
  mounted(){
    console.log("game preview mounted")
  } ,
  methods:{
     moveToTeamHostPage(){
       this.$router.push({name:"Team",params:{team_name:this.hostTeam}});
   //   this.$routers.push(`/Team/${this.hostTeam}`);

    },
    moveToTeamawaytPage(){
       this.$router.push({name:"Team",params:{team_name:this.guestTeam}});
   //   this.$routers.push(`/Team/${this.hostTeam}`);

    }
  } ,

};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
