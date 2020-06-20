<template>
    <div style="max-width: 480px;" class="container">
        
        <navbar-user />

        <div style="padding-left: 1em; padding-right: 1em;">
            <div style="margin-top: 1em;" class="card">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://ik.imagekit.io/igtoko/icons8-shop-100_Vh7oduoMq.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{{username}}</p>
                        <p class="subtitle is-6">{{email}}</p>
                    </div>
                    </div>

                    <div class="content">
                        <div class="buttons">
                            <b-button 
                            v-clipboard:copy="linkToko"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            type="is-primary" expanded>Copy URL Toko</b-button>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 2em; padding-left: 0.7em; padding-right: 0.7em;" class="columns is-multiline is-mobile">
                <div v-on:click="toPage('input-produk')" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__8__lg7HycXJM.png'); background-repeat: no-repeat; background-size: 80%; color: black; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Input Produk</div>
                <div v-on:click="toPage('input-category')" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__10__E0vcP1HxC.png'); background-repeat: no-repeat; background-size: 80%; color: black; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Input Kategori Produk</div>
                <div v-on:click="toPage('list-produk')" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__9__o3Af-pBRT.png'); background-repeat: no-repeat; background-size: 70%; color: black; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Kelola Produk</div>
                <div v-on:click="toPage('list-order')" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__4__Uz4hREtN6.png'); background-repeat: no-repeat; background-size: 80%; color: black; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Daftar Pesanan</div>
                <div v-on:click="toPage('setting-toko')" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__5__bQAX05xCR.png'); background-repeat: no-repeat; background-size: 70%; color: black; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Setting Toko</div>
                <div v-on:click="logOut" style="text-align: center; background-image: url('https://ik.imagekit.io/igtoko/Frame_1__7__y3R0b6RbE.png'); background-repeat: no-repeat; background-size: 70%; color: red; font-weight: bold; padding: 30px; border: 1px solid #677696; border-radius: 5px; margin: 0 10px 10px 0; cursor: pointer;" class="column is-full">Log Out</div>
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
        email: '',
        username: '',
        linkToko: ''
    }),
    methods: {
        onCopy: function (e) {
            this.$buefy.dialog.alert('URL Toko berhasil di salin!')
            // alert('You just copied: ' + e.text)
        },
        onError: function (e) {
            alert('Failed to copy texts')
        },         
        toPage: function(page) {
            this.$router.push('/p/' + page)
        },
        logOut: function() {
          this.$store.commit('resetUser');
          alert('Anda berhasil keluar!');
          this.$router.push('/p/login')            
        }
    }, 
    created() {
        this.email = this.$store.getters.getUser.EMAIL
        this.username = this.$store.getters.getUser.USERNAME
        this.linkToko = 'http://igtoko.com/' + this.$store.getters.getUser.USERNAME
    },
    beforeCreate() {
        if(this.$store.getters.getLoginStatus == false) {
            alert('Anda belum login!')
            this.$router.push('/p/login')
        }      
    }
}
</script>