<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-message title="Info" type="is-info" aria-close-label="Close message">
            Silahkan lengkapi form dibawah ini untuk dapat membuat toko IG.
        </b-message>

        <b-field label="Nama Toko / Username" message="Kombinasi huruf dan angka saja yang diijinkan.">
            <b-input v-model="form.username" placeholder="Cth: toko7863"></b-input>
        </b-field>

        <b-field label="No Handphone">
            <b-input v-model="form.no_hp" placeholder="Masukan nomor handphone"></b-input>
        </b-field>

        <b-field label="Email">
            <b-input v-model="form.email" type="email" placeholder="Masukan email" value=""></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password"
                v-model="form.password"
                placeholder="Masukan password"
                password-reveal>
            </b-input>
        </b-field>

        <div class="buttons">
            <b-button v-on:click="submitToko" type="is-primary" expanded>Buat Toko</b-button>
        </div>        

    </section>
    <br />
    <br />
    <br />
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
    form: []
  }),
  methods: {
      submitToko: async function() {
            let data = {
                USERNAME: this.form.username,
                EMAIL: this.form.email,
                NO_HP: this.form.no_hp,
                PASSWORD: this.form.password
            }
            this.$http.post(this.$api + '/api/buatToko', data)
                .then((res) => {
                    console.log(res)
                    if(res.data.status == true) {
                        alert('User berhasil dibuat.\n Silahkan cek email untuk mengaktifkan toko anda.')
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
