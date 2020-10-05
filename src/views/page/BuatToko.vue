<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-message title="Info" type="is-info" aria-close-label="Close message">
            Silahkan lengkapi form dibawah ini untuk dapat membuat IGToko anda.
        </b-message>

        <b-field label="Buat Username" message="Kombinasi huruf dan angka saja yang diijinkan.">
            <b-input v-model="form.username" placeholder="Cth: toko7863" maxlength="30" expanded></b-input>
            Username jangan ada (spasi)
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
        <b-field label="Captcha">
            <vue-recaptcha 
                sitekey="6LdQo6UZAAAAAF8Ty0Aacw-BjVl6xoHCAtQq6yYu"
                ref="recaptcha"
                @verify="onVerify"
                @expired="onExpired"></vue-recaptcha>
        </b-field>

        <div class="buttons">
            <b-button v-on:click="submitToko" type="is-primary" expanded>Buat Toko</b-button>
        </div>        

    </section>
    <br />
    <br />
    <br />
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading> 
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'BuatToko',
  components: {
    'navbar-user': NavbarUser,
    VueRecaptcha
  },  
  data: () => ({
    isShowModal: false,
    emailUsername: false,
    form: [],
    verifyCaptcha: '',
    isLoading: false
  }),
  methods: {
        onSubmit: function () {
            this.$refs.invisibleRecaptcha.execute()
        },
        onVerify: function (response) {
            console.log(response)
            this.verifyCaptcha = response
        },
        onExpired: function () {
            this.verifyCaptcha = ''
        },
        resetRecaptcha () {
            this.$refs.recaptcha.reset() // Direct call reset method
            this.verifyCaptcha = ''
        },
        hasWhiteSpace: function(s) {
            return s.indexOf(' ') >= 0;
        },  
        submitToko: async function() {

            if(typeof this.form.username == 'undefined' || typeof this.form.no_hp == 'undefined' || typeof this.form.password == 'undefined') {
                return this.$buefy.dialog.alert('Mohon isi semua kolom!')
            }

            if(this.hasWhiteSpace(this.form.username)) {
                return this.$buefy.dialog.alert('Username tidak boleh ada SPASI')
            }

            if(this.verifyCaptcha == '') {
                return this.$buefy.dialog.alert('Captcha Salah!')
                // console.log('kosong captcha')
            }
            
            this.isLoading = true;

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }          
            let data = {
                USERNAME: this.form.username,
                EMAIL: this.form.email,
                NO_HP: this.form.no_hp,
                PASSWORD: this.form.password,
                CAPTCHA: this.verifyCaptcha
            }
            this.$http.post(this.$api + '/api/buatToko?token=' + this.verifyCaptcha, data, {
                headers: headers
            }).then((res) => {
                    if(res.data.status == true) {
                        this.isLoading = false
                        this.$buefy.dialog.alert({
                            message: 'Toko anda berhasil dibuat. Silahkan login!',
                            onConfirm: () => this.$router.push('/p/login')
                        })
                    } else {
                        this.isLoading = false
                        this.$buefy.dialog.alert(res.data.msg)
                    }
                })
        }
  },
  created() {
      
  } 
}
</script>
