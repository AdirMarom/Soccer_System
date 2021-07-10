<template>
  <div>
    <br/>
    <br/>
    <h3 class="title">MY FAVORITE TEAMS</h3>
    <b-container>
    <b-row>

         <div v-if="!this.load">
      <div class="text-center">
        <b-spinner label="Spinning" style="color: white"></b-spinner>
        <b-spinner label="Spinning" style="color: white"></b-spinner>
        <b-spinner label="Spinning" style="color: white"></b-spinner>
      </div>
    </div>
    <div v-else>
            <b-card-group deck>
              <div v-if="!teams.length" class="text-center">
                  <b-button variant="primary">
                        there is no Favorite Games
                  </b-button>
              </div>
              <div v-else>
                <teamPreview
                v-for="team in this.teams"
                :key="team.id"
                :team="team"
                ></teamPreview>
              </div>
            </b-card-group>
    </div>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import teamPreview from "../components/teamPreview.vue";
import { BSpinner } from "bootstrap-vue";

export default {
  name: "FavoriteTeams",
  props: {},
  components: {
    BSpinner,
    teamPreview,
  },
  data() {
    return {
      load: false,
      teams: [],
    };
  },
  methods: {
    async setTeams() {
      const response1 = await this.axios.get(
        "http://localhost:3000/users/favoriteTeams"
      );
      if (response1.data) {
        this.teams = response1.data;
      }
      this.load = true;
    },
  },
  mounted() {
    this.setTeams();
  },
};
</script>

<style>
.favorite_card {
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
}
</style>