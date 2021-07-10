<template>
  <b-card bg-variant="light" id="card" word-wrap>
    <b-card-title style="text-align: center; text-decoration:underline;">
      Game
    </b-card-title>
    <b-card-text >
    <ul style="list-style-type:none;" class="game-content">
      <li @click="this.moveToTeamHostPage"> host: {{ hostTeam }}</li>
      <li @click="this.moveToTeamawaytPage"> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li v-if="stadium"> stadium: {{ stadium }}</li>
      <li v-if="homeScore"> homeScore: {{ homeScore }}</li>
      <li v-if="awayScore"> awayScore: {{ awayScore }}</li>
      <li v-if="events"> events: {{ events }}</li>
    </ul>
    </b-card-text>
      <b-card-text>
      </b-card-text>
  </b-card>
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
    this.updateDate();
  } ,
  methods:{
     moveToTeamHostPage(){
       this.$router.push({name:"Team",params:{team_name:this.hostTeam}});
   //   this.$routers.push(`/Team/${this.hostTeam}`);

    },
    moveToTeamawaytPage(){
       this.$router.push({name:"Team",params:{team_name:this.guestTeam}});
   //   this.$routers.push(`/Team/${this.hostTeam}`);

    },
    updateDate() {
      this.date = this.date.split("T")[0];
      this.hour = this.hour.split("T")[1].split(".")[0];
    },
  } ,

};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 300px;
  height: 500px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}
.game-preview .game-title {
  text-align: left;

  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}
.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
#card{
  position: relative;
}



</style>
