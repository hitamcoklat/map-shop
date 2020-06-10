<template>
    <div>
        <navbar-user />
        <div style="padding-left: 1em; padding-right: 1em;" class="container">
            <b-message title="Info" type="is-info" aria-close-label="Close message">
                Selamat Datang, silahkan pilih menu kelola produk di Menu Navbar atau klik tombol dibawah ini.
            </b-message>

            <div class="buttons">
                <b-button type="is-primary" expanded>Kelola Produk</b-button>
            </div>

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


  },
  created() {
    this.fetchData();
    console.log(this.alias)
  } 
}
</script>