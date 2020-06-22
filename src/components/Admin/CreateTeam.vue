<template>
  <section>
    <b-field label="Name">
      <b-input v-model="name"></b-input>
    </b-field>

    <b-field label="Stadium">
      <b-input v-model="location"></b-input>
    </b-field>
    <b-button @click="submit()">submit</b-button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      location: "",
    };
  },
  methods: {
    async submit() {
      const data = {
        name: this.name,
        location: this.location,
        token: this.$store.state.admin.token,
      };
      const res = await this.$store.dispatch("createTeam", data);
      if (res.status === 201) {
        alert("Created");
      } else alert(res.message);
    },
  },
};
</script>
<style scoped></style>
