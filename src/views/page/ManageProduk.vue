<template>
    <div>
        <navbar-user />
        <div style="padding-left: 1em; padding-right: 1em;" class="container">

            <div class="buttons">
                <b-button type="is-primary" expanded>Ambil Produk Instagram</b-button>
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