<template>
    <div>
        
        <navbar-user />

        <div style="padding-left: 1em; padding-right: 1em;" class="container">
            <b-message title="Info" type="is-info" aria-close-label="Close message">
                Selamat Datang, silahkan pilih menu kelola produk di Menu Navbar atau klik tombol dibawah ini.
            </b-message>

            <div style="margin-top: 2em;" class="columns is-multiline is-mobile">
                <div v-on:click="toPage('input-produk')" style="text-align: center; background-color: #7957d5; color: white; padding: 30px; border: 1px solid #FFF;" class="column is-half">Input Produk</div>
                <div v-on:click="toPage('list-produk')" style="text-align: center; background-color: #00d1b2; color: white; padding: 30px; border: 1px solid #FFF;" class="column is-half">Kelola Produk</div>
                <div v-on:click="toPage('setting-toko')" style="text-align: center; background-color: #3298dc; color: white; padding: 30px; border: 1px solid #FFF;" class="column is-half">Setting Toko</div>
                <div style="text-align: center; background-color: #f14668; color: white; padding: 30px; border: 1px solid #FFF;" class="column is-half">Log Out</div>
            </div>          

            <!-- <div class="buttons">
                <b-button type="is-primary" expanded>Kelola Produk</b-button>
            </div> -->

        </div>        
    </div>
</template>
<script>

import NavbarUser from './_NavbarUser'

export default {
  name: 'Manage',
  components: {
    'navbar-user': NavbarUser
  },
  data: () => ({
  }),
  methods: {
      toPage: function(page) {
          this.$router.push('/p/' + page)
      }
  },
  created() {

  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }
}
</script>