<template>


  <div class="search">
            <b-container>
                    <b-row>
                        <h1 class="title">Search Page</h1>
                    </b-row>

                    <b-row>
                      <b-col>
                          <b-input-group prepend="Search Player/Team:" id="search-input">
                            <b-form-input v-model="searchQuery"></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" @click="search">Search</b-button>
                              <div>
                                <b-dropdown class="dropDown" text="Click To Sort">
                                  <b-dropdown-item @click="sortDescendingTeams(true)">
                                    ↑ Ascending Teams Names ↑
                                  </b-dropdown-item>
                                  <b-dropdown-item @click="sortDescendingTeams(false)">
                                    ↓ Descending Teams Names ↓
                                  </b-dropdown-item>
                                  <b-dropdown-item> </b-dropdown-item>
                                  <b-dropdown-item @click="sortDescendingPlayers(true)">
                                    ↑ Ascending Players Names ↑
                                  </b-dropdown-item>
                                  <b-dropdown-item @click="sortDescendingPlayers(false)">
                                    ↓ Descending Players Names ↓
                                  </b-dropdown-item>
                                </b-dropdown>
                              </div>
                            </b-input-group-append>
                          </b-input-group>
                      </b-col>
                      <b-col>
                          <b-input-group v-if="this.players"
                          prepend="filter By Postion/Team name:"
                          id="search-input1"
                        >
                          <b-form-input v-model="filter"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="success" @click="filterBy_Position_team">
                              Position
                            </b-button>
                            <b-button variant="success" @click="clearFilter">
                              Clear Filter
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                    </b-row>
                                      
                    <b-row >
                        <h2 class="headerSearch">Last Search: {{  this.$root.store.lastSearch}}</h2>
                    </b-row>
                    <b-row>
                        <div v-if="players">
                         <h1  class="subheaderSearch">Players</h1>
                          <b-card-group deck>
                         <playerInfo
                           v-for="player in this.players"
                           :key="player.player_id"
                           :player="player"
                         ></playerInfo>
                          </b-card-group>
                       </div>


                    </b-row>
                    <b-row>
                          <div v-if="teams">
                             <h1  class="subheaderSearch">Teams</h1>
                              <b-card-group deck>
                             <teamPreview
                               v-for="team in this.teams"
                               :key="team.id"
                               :team="team"
                             ></teamPreview>
                              </b-card-group>
                          </div>
                    </b-row>
            </b-container>
  </div>
</template>

<script>
import playerInfo from "../components/playerInfo.vue";
import teamPreview from "../components/teamPreview.vue";

export default {
  components: {
    playerInfo,
    teamPreview,
  },
  data() {
    return {
      searchQuery: "",
      players: null,
      teams: null,
      messege: "there is no result!",
      filter: null,
      userName: localStorage.username,
      lastSearch: window.localStorage[window.localStorage.name],
    };
  },
  mounted() {
    if (localStorage.lastQuery) {
      this.lastSearch = localStorage.lastQuery[localStorage.username];
    }
  },
  methods: {
    clearFilter() {
      this.filter = null;
      this.search();
    },
    async getTeamName(teamId) {
      if (teamId) {
        const response = await this.axios.get(
          `http://localhost:3000/teams/getById/${teamId}`
        );
        if (response.data.team.data) {
          const teamData = response.data.team.data;
          return teamData.name;
        }
      }
    },
    async filterBy_Position_team() {
      let input = this.filter;
      let res = [];

      if (this.players) {
        this.players.map(async (player) => {
          if (player.team_name) {
            let teamName = player.team_name;
            if (teamName) {
              teamName = teamName.toLowerCase();
            }
            if (input) {
              input = input.toLowerCase();
            }
            if (player.position_id == input || teamName == input) {
              res.push(player);
            }
          }
        });
        if (res.length > 0) {
          this.players = res;
        }
      }
    },
    async searchTeam() {
      if (this.searchQuery) {
        const res = await this.axios.get(
          `http://localhost:3000/teams/teamByName/${this.searchQuery}`
        );
        if (res.status == 200) {
          if (res.data != []) {
            this.teams = res.data.team.data;
          }
        }
      }
    },

    sortDescendingPlayers(bool) {
      if (!this.players) {
        return;
      }
      if (bool) {
        const sorted_players = this.players.sort(function (player1, player2) {
          if (player2.lastname < player1.lastname) {
            return -1;
          }
          if (player2.lastname > player1.lastname) {
            return 1;
          }
          return 0;
        });
        this.players = sorted_players;
      } else {
        const sorted_players = this.players.sort(function (player1, player2) {
          if (player2.lastname < player1.lastname) {
            return 1;
          }
          if (player2.lastname > player1.lastname) {
            return -1;
          }
          return 0;
        });
        this.players = sorted_players;
      }
    },

    sortDescendingTeams(bool) {
      if (!this.teams) {
        return;
      }
      if (bool) {
        const sorted_teams = this.teams.sort(function (team1, team2) {
          if (team2.name < team1.name) {
            return -1;
          }
          if (team2.name > team1.name) {
            return 1;
          }
          return 0;
        });
        this.teams = sorted_teams;
      } else {
        const sorted_teams = this.teams.sort(function (team1, team2) {
          if (team2.name < team1.name) {
            return 1;
          }
          if (team2.name > team1.name) {
            return -1;
          }
          return 0;
        });
        this.teams = sorted_teams;
      }
    },

    async searchPlayers() {
      if (this.searchQuery) {
        console.log(this.searchQuery);
        const res = await this.axios.get(
          `http://localhost:3000/players/playersDetails/${this.searchQuery}`
        );
        console.log(res.data);

        if (res.status == 200) {
          this.players = res.data;
        }
      }
    },
    async search() {
      this.$root.store.lastSearch=this.searchQuery;
      //if (this.$root.store) {
      //  const qur = this.searchQuery;
      //  const name = localStorage.username;
//
      //  if (!localStorage[name]) {
      //    window.localStorage.setItem(name, qur);
      //  }
      //  window.localStorage[name] = qur;
      //  this.lastSearch = qur;
      //}
      await this.searchTeam();
      await this.searchPlayers();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis&family=Zen+Tokyo+Zoo&display=swap');

#search-input {
  margin-left: 20px;
  width: 500px;
}
#search-input1 {
  margin-left: 20px;
  width: 500px;
}
.dropDown {
  color: blue;
}

.headerSearch{
  font-family: 'Dosis', sans-serif;
font-family: 'Zen Tokyo Zoo', cursive;
  color:white;
}
.subheaderSearch{
    font-family: 'Dosis', sans-serif;
    font-family: 'Zen Tokyo Zoo', cursive;
    color:white;
}

</style>