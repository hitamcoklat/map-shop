<template>
    <div style="max-width: 450px;" class="container">
        <navbar-user />
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
    dataUser: []
  }),
  methods: {
      submitToko: function() {    
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
