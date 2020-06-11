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
                <b-navbar-dropdown>
                    <b-navbar-item v-show="btnKelolaToko"  tag="router-link" :to="{ path: '/p/manage' }">
                        Kelola Toko
                    </b-navbar-item>
                    <b-navbar-item v-show="btnLogin"  tag="router-link" :to="{ path: '/p/login' }">
                        Masuk
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Tentang
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Panduan
                    </b-navbar-item>
                    <b-navbar-item v-on:click="doLogout" style="color: red;" v-show="btnLogout" href="#">
                        Logout
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
    </b-navbar>    
</template>
<script>
export default {
  name: 'NavbarUser',
  data: () => ({
      btnLogin: true,
      btnKelolaToko: false,
      btnLogout: false
  }),
  methods: {
      doLogout: function () {
          console.log('klik logout')
          this.$store.commit('resetUser');
          alert('Anda berhasil keluar!');
          this.$router.push('/p/login')
      }
  },
  created() {
      if(this.$store.getters.getLoginStatus == true) {
          this.btnLogout = true
          this.btnLogin = false
          this.btnKelolaToko = true
      }
  } 
}
</script>