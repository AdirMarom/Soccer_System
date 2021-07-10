<template>
  <div>
    <div>
      <b-card
        title="SuperLiga"
        img-src="https://www.pe.com/wp-content/uploads/2021/05/xxxx_spo_ocr-l-soccer-generic-stock-001-17.jpg?w=1280"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          Season: {{ season }}
          <br />
          Season Id: {{ season_id }}
          <br />
          Stage: {{ stage }}
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>


<script>
/*
current_stage_id: null
name: "Superliga"
season: "2021/2022"
season_id: 18334
*/
export default {
  data() {
    return {
      leagueName: "superliga",
      season: "season",
      stage: "stage",
      season_id: "",
    };
  },
  methods: {
    async getDetails() {
      const res = await this.axios.get(
        `http://localhost:3000/league/getDetailsPage`
      );
      if (res) {
        const league = res.data;
        this.season = league.season;
        this.stage = league.current_stage_id;
        this.season_id = league.season_id;
      }
    },
  },
  mounted() {
    this.getDetails();
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
</style>