<template>
    <div style="max-width: 450px;" class="container">
        <navbar-user />
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
import NavbarUser from './page/_NavbarUser'
export default {
  name: 'HomeLandingPage',
  components: {
    'navbar-user': NavbarUser
  },    
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
