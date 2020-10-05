<template>
    <b-navbar style="width: 100%; z-index: 9999; top: 0">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: homeButton }">
                <img
                    v-bind:src="logoImage"
                    alt=""
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-dropdown>
                <b-navbar-item v-show="btnKelolaToko"  tag="router-link" :to="{ path: '/p/manage' }">
                    Kelola Toko
                </b-navbar-item>
                <b-navbar-item v-show="btnLogin"  tag="router-link" :to="{ path: '/p/login' }">
                    Masuk
                </b-navbar-item>
                <b-navbar-item v-on:click="tentangDialog">
                    Tentang
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/p/faq' }">
                    FAQ
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
  props: ['alias'],
  data: () => ({
      btnLogin: true,
      btnKelolaToko: false,
      btnLogout: false,
      homeButton: '/',
      logoImage: 'https://ik.imagekit.io/igtoko/104392337_590864341567072_4672269824495009672_n_4KFSaP6-G.png',
      dataUser: []
  }),
  methods: {
        doLogout: function () {
            this.$store.commit('resetUser');
            this.$buefy.dialog.alert('Anda berhasil keluar!')
            this.$router.push('/p/login')
        },
        tentangDialog() {
            this.$emit('tentangDialog', true)
            this.$buefy.dialog.confirm({
                title: 'Tentang IGtoko.com',
                message: `<strong>IGToko</strong> merupakan Platform untuk menghubungkan para penjual dan pembeli di lingkungan desa dan ditampilkan berdasarkan map/peta untuk memudahkan para pembeli mengetahui lokasi para penjual. Nama <strong>IGToko</strong> sendiri dibuat berdasarkan tampilan menyerupai Instagram untuk memudahkan para pengguna dalam mengelola platform ini. Platform ini dikelola oleh: <a href="https://instagram.com/teras.ukm">Teras UKM</a>`,
                type: 'is-success',
                animation: 'zoom-out',
                onCancel: () => {
                    this.$emit('tentangDialog', false)
                },
                onConfirm: () => {
                    this.$emit('tentangDialog', false)
                }
            }) 
        },
        fetchDataUser: function(username) {
            this.$http.get(this.$api + '/api/getUserByUsername?u=' + username)
                .then((res) => {
                    if(res.data.status == true) {
                        this.logoImage = res.data.data.LOGO_IMAGE
                        this.homeButton = '/' + username
                    }
                    // this.dataUser = res.data.data;
                })
        },             
  },
  created() {
      console.log(this.alias)
      this.fetchDataUser(this.alias)
      if(this.$store.getters.getLoginStatus == true) {
          this.btnLogout = true
          this.btnLogin = false
          this.btnKelolaToko = true
      }
  } 
}
</script>