<template>
    <div style="max-width: 450px;" class="container">
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
                Tentang
            </b-navbar-item>
            <b-navbar-item href="#">
                Panduan
            </b-navbar-item>
        </template>
    </b-navbar>
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-field label="Nama Toko / Username">
            <b-input v-model="form.username" placeholder="Masukan nama toko, Cth: toko7863"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="form.password" placeholder="Masukan password"></b-input>
        </b-field>

        <div class="buttons">
            <b-button v-on:click="submitToko" type="is-primary" expanded>Masuk</b-button>
        </div>        

    </section>
    </div>
</template>

<script>
export default {
  name: 'BuatToko',
  data: () => ({
    isShowModal: false,
    emailUsername: false,
    form: [],
    dataUser: []
  }),
  methods: {
      submitToko: function() {    

          let data = {
              USERNAME: this.form.username,
              PASSWORD: this.form.password
          };
            this.$http.post(this.$api + '/api/login', data)
                .then((res) => {
                    if(res.data.status == true) {
                        let data = {
                            USERNAME: res.data.data.USERNAME, 
                            EMAIL: res.data.data.EMAIL,
                            LEVEL: res.data.data.LEVEL,
                            TOKEN: res.data.token
                        };
                        this.$store.commit('addToUser', data);
                    } else {
                        alert(res.data.msg)
                    }
                })           
      }
  },
  created() {
      
  } 
}
</script>
