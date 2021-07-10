<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="button"
      aria-pressed="false"
      autocomplete="off"
      @click="addTeam"
    >
      Add To Favorites
    </button>
    <b-alert v-if="addFlag" show dismissible
      >Player was successfully added!</b-alert
    >
  </div>
</template>

<script>
export default {
  name: "FavoriteTeamButton",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      addFlag: false,
    };
  },
  methods: {
    async addTeam() {
      try {
        const response = await this.axios.post(
          `http://localhost:3000/users/addFavoriteTeam`,
          { team_id: this.id }
        );
        if (response.status == 201) {
          this.addFlag = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>