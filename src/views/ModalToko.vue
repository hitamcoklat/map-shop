<template>
    <div class="modal-card" style="width: 75%; margin: 0 auto;">
        <header class="modal-card-head">
            <p style="font-size: 1.2em;" class="modal-card-title">Info</p>
        </header>
        <section class="modal-card-body">
            <p style="font-weight: bold; margin-bottom: 0.7em;">Toko @{{dataToko.usernameToko}}</p>
            <center>
                <img :src="dataToko.imageCover" />
                <p>{{dataToko.bioToko}}</p>
            </center>
        </section>
        <footer class="modal-card-foot">
            <button v-on:click="toShop(dataToko.usernameToko)" class="button is-primary" style="width: 100%;">Menuju ke Toko</button>
        </footer>
    </div>   
</template>
<script>
export default {
    props: ['dataToko'],
    methods: {
      toShop: function(username) {
          this.$router.push('/' + username)
      },        
    }
}
</script>