<template>
  <section>
    <b-field label="Home Team">
      <b-select v-model="teamA" placeholder="Select a team">
        <option v-for="option in teams" :value="option._id" :key="option._id">
          {{ option.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Away Team">
      <b-select v-model="teamB" placeholder="Select a team">
        <option v-for="option in teams" :value="option._id" :key="option._id">
          {{ option.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Select Date and Time">
      <b-datetimepicker
        placeholder="Type or select a date..."
        v-model="date_time"
        icon="calendar-today"
        :timepicker="{ enableSeconds, hourFormat: format }"
        horizontal-time-picker
      >
      </b-datetimepicker>
    </b-field>

    <b-button @click="submit()">submit</b-button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      teamA: "",
      teamB: "",
      date_time: null,
      formatAmPm: false,
      enableSeconds: false,
    };
  },
  computed: {
    teams() {
      return this.$store.state.teamStore.teams;
    },
    format() {
      return this.formatAmPm ? "12" : "24";
    },
  },
  methods: {
    async submit() {
      let items = this.date_time;
      let date =
        items.getUTCMonth() +
        1 +
        "/" +
        items.getUTCDate() +
        "/" +
        items.getFullYear();
      let time = items.getUTCHours() + 1 + ":" + items.getUTCMinutes();
      const data = {
        teamA: this.teamA,
        teamB: this.teamB,
        date: date,
        time: time,
        token: this.$store.state.admin.token,
      };
      console.log(data);
      const res = await this.$store.dispatch("createFixture", data);
      if (res.status === 201) {
        alert("Created");
      } else alert(res.message);
    },
  },
};
</script>
<style scoped></style>
