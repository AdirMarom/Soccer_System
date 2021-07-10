<template>
  <div class="team-info">
    <div  @click="this.moveToTeamPage" title="id" class="team-title"><b>Team Name:</b> {{ team_name }}</div>
    <br/>
    <center>
      <img  @click="this.moveToTeamPage" :src="image" alt="player" width="100" height="100" />
    </center>

  </div>
</template>

<script>
export default {
  name: "teamPreview",
  props: {
    team: Object,
  },
  data() {
    /*
        "id": 939,
        "legacy_id": 513,
        "name": "Midtjylland",
        "short_code": "FCM",
        "twitter": null,
        "country_id": 320,
        "national_team": false,
        "founded": 1999,
        "logo_path": "https://cdn.sportmonks.com/images//soccer/teams/11/939.png",
        "venue_id": 342,
        "current_season_id": 18334,
        "is_placeholder": false
    */
    return {
      team_name: this.team.name,
      image: this.team.logo_path,
    };
  },
  mounted() {
    console.log(this.props);
    this.team_name = this.team.name;
    this.image = this.team.logo_path;
    console.log("team preview mounted");
  },
  methods:{
     moveToTeamPage(){
       this.$router.push({name:"Team",params:{team_name:this.team_name}});

    },

  } ,




};
</script>

<style>
.team-info {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: black;
  background: whitesmoke;
}

.team-info .team-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(8, 8, 8);
}

.team-info .game-content {
  width: 100%;
  overflow: hidden;
}
</style>