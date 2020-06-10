<template>
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
            <b-navbar-item href="#">
                Kelola Produk
            </b-navbar-item>
            <b-navbar-item href="#">
                Lihat Pesanan
            </b-navbar-item>
            <b-navbar-item style="color: red;">
                Log Out
            </b-navbar-item>
        </template>
    </b-navbar>    
</template>
<script>
export default {
  name: 'NavbarUser',
  data: () => ({
  }),
  methods: {
  },
  created() {
  } 
}
</script>