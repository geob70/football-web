<template>
  <b-tabs>
    <b-tab-item label="LOG IN" icon="google-photos">
      <div class="box">
        <b-field label="Email" type="is-info">
          <b-input v-model="auth.email" type="email" maxlength="30"> </b-input>
        </b-field>

        <b-field label="Password">
          <b-input v-model="auth.password" type="password" password-reveal>
          </b-input>
        </b-field>

        <b-button @click="login()" type="is-link">LOGIN</b-button>
      </div>
    </b-tab-item>
    <b-tab-item label="SIGN UP" icon="library-music">
      <section>
        <b-field label="Username">
          <b-input v-model="auth.username"></b-input>
        </b-field>

        <b-field label="Email">
          <b-input v-model="auth.email" type="email"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input v-model="auth.password" type="password"></b-input>
        </b-field>
        <b-button @click="signUp()">submit</b-button>
      </section>
    </b-tab-item>
    <div class="container is-centered">
      <b-message
        auto-close
        class="message"
        title="Error!"
        type="is-danger"
        has-icon
        :active.sync="isActive"
        aria-close-label="Close message"
      >
        {{ errorMessage }}
      </b-message>
    </div>
  </b-tabs>
</template>
<script>
export default {
  async mounted() {
    console.log("here", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      let res = await this.$store.dispatch(
        "verifyToken",
        localStorage.getItem("token")
      );
      if (res === 200) {
        this.$router.push({
          path: "/admin-team",
        });
      } else {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", false);
      }
    }
  },
  data() {
    return {
      auth: {
        email: null,
        password: null,
        username: null,
      },
      isActive: false,
      errorMessage: null,
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("login", this.auth);
      if (res.status === 200) {
        this.$router.push({
          path: "/admin-team",
        });
      } else {
        this.errorMessage = res.message;
        this.isActive = true;
      }
    },

    async signUp() {
      let res = await this.$store.dispatch("signUp", this.auth);
      if (res.status === 201) {
        alert("created");
        let res = await this.$store.dispatch("login", { res });
        if (res.status === 200) {
          this.$router.push({
            path: "/admin-team",
          });
        } else {
          this.errorMessage = res.message;
          this.isActive = true;
        }
      } else {
        this.errorMessage = res.message;
        this.isActive = true;
      }
    },
  },
};
</script>
<style scoped>
.box {
  margin: 10%;
  margin-bottom: 4%;
}
</style>
