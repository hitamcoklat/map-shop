<template>
    <div style="max-width: 450px;" class="container">
        <navbar-user />
        <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

            <b-field label="Nama Toko / Username">
                <b-input size="is-medium" v-model="form.username" placeholder="Masukan nama toko, Cth: toko7863"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input size="is-medium" type="password" v-model="form.password" placeholder="Masukan password" password-reveal></b-input>
            </b-field>

            <div style="margin-top: 2em;" class="buttons">
                <b-button size="is-medium" v-on:click="submitToko" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Masuk</b-button>
            </div>
            <div style="margin-top: 2em;" class="buttons">
                <b-button size="is-medium" v-on:click="submitToko" type="is-text" tag="router-link" :to="{ path: '/p/buat-toko' }" expanded>Buat Toko Baru</b-button>
            </div>

        </section>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>
import NavbarUser from './_NavbarUser'
export default {
  name: 'BuatToko',
  components: {
    'navbar-user': NavbarUser
  },  
  data: () => ({
    isShowModal: false,
    emailUsername: false,
    form: [],
    isLoading: false,
    dataUser: []
  }),
  methods: {
      submitToko: function() {    
        this.isLoading = true;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        let data = {
            USERNAME: this.form.username,
            PASSWORD: this.form.password
        };
            this.$http.post(this.$api + '/api/login', data, {
                headers: headers
            })
                .then((res) => {
                    this.isLoading = true;
                    if(res.data.status == true) {
                        let data = {
                            USERNAME: res.data.data.USERNAME, 
                            EMAIL: res.data.data.EMAIL,
                            LEVEL: res.data.data.LEVEL,
                            TOKEN: res.data.token
                        };
                        this.$store.commit('addToUser', data);
                        this.$router.push('/p/manage')
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
