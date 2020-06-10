<template>
    <div>
    <b-navbar style="width: 100%; z-index: 9999; top: 0">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <router-link to="/p/login">
                <b-navbar-item>
                    Masuk
                </b-navbar-item>
            </router-link>
            <b-navbar-item href="#">
                Tentang
            </b-navbar-item>
            <b-navbar-item href="#">
                Panduan
            </b-navbar-item>
        </template>
    </b-navbar>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Buat Toko [IG].
                </h1>

                <b-button v-on:click="toPendaftaran" type="is-primary">Buat Sekarang</b-button>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  name: 'HomeLandingPage',
  data: () => ({
    isShowModal: false,
    form: []
  }),
  methods: {
      toPendaftaran: function() {
          this.$router.push('/p/buat-toko')
      }
  },
  created() {

  } 
}
</script>
