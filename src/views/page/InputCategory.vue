<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-field label="Nama Kategori">
            <b-input
                size="is-medium" 
                icon-pack="fas"
                icon="cookie-bite"
                v-model="form.nama_kategori" 
                placeholder="Nama Kategori..."></b-input>
        </b-field>      
        <div style="margin-top: 1em;" class="buttons">
            <b-button size="is-medium" v-on:click="submit" type="is-primary" expanded>
                Buat Kategori
            </b-button>
        </div>
        <p style="text-align: center; font-weight: bold; margin-bottom: 0.6em;">Daftar Kategori</p>
        <div style="overflow-x: auto; max-height: 400px; padding-left: 0.7em; padding-right: 0.7em; padding-top: 1em;" class="columns">
            <div v-for="(item, index) in dataCategory" :key="index" :ref="index" style="background-color: #00d1b2; text-align: center; color: white; font-weight: bold; margin-top: 5px;" @click="clickEditPop(item)" class="column">
                {{item.NAMA_KATEGORI}}
            </div>
        </div>        
        <br />
        <br />
        <br />
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'

export default {
  name: 'InputCategory',
  components: {
    'navbar-user': NavbarUser 
  },  
  data: () => ({
    isShowModal: false,
    form: [],
    dataCategory: [],
    isLoading: false,
    isUpdate: false,
    isEdit: false,
  }),
  methods: {

      clickEditPop: function(item) {
        this.$buefy.dialog.prompt({
            message: `Edit Kategori`,
            inputAttrs: {
                value: item.NAMA_KATEGORI,
            },            
            trapFocus: true,
            cancelText: 'Hapus Kategori',
            onCancel: () => {
                console.log('hapus kategori')
                console.log(item)
                this.$http.post(this.$api + '/category/hapusCategory?id=' + item.ID + '&email=' + this.$store.getters.getUser.EMAIL + '&token=' + this.$store.getters.getUser.TOKEN + '&u=' + this.$store.getters.getUser.USERNAME)
                .then((res) => {
                        console.log(res)
                        if(res.data.status == true) {
                            this.$buefy.dialog.alert('Kategori berhasil di hapus!')
                            this.fetchData(this.$store.getters.getUser.USERNAME)
                        } else {
                            this.$buefy.dialog.alert('Terjadi kesalahan!')
                        }
                    })                 
            },
            confirmText: 'Update',
            onConfirm: (value) => {
                let data = {
                    NAMA_KATEGORI: value,
                    EMAIL: this.$store.getters.getUser.EMAIL,
                    USERNAME: this.$store.getters.getUser.USERNAME,
                    TOKEN: this.$store.getters.getUser.TOKEN,
                    ID_CATEGORY: item.ID
                };
                this.updateCategorySubmit(data)
            }
        })
      },

    updateCategorySubmit: function(item) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }        
        this.$http.post(this.$api + '/category/updateCategory', item, {
            headers: headers
        }).then((res) => {
                console.log(res)
                if(res.data.status == true) {
                    this.$buefy.dialog.alert('Kategori berhasil di edit!')
                    this.fetchData(this.$store.getters.getUser.USERNAME)
                } else {
                    this.$buefy.dialog.alert('Terjadi kesalahan!')
                }
            }) 
    },

    submit: function() {

        if(typeof this.form.nama_kategori == 'undefined') {
            return this.$buefy.dialog.alert('Mohon isi kolom!')
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        let data = {
            NAMA_KATEGORI: this.form.nama_kategori,
            EMAIL: this.$store.getters.getUser.EMAIL,
            USERNAME: this.$store.getters.getUser.USERNAME,
            TOKEN: this.$store.getters.getUser.TOKEN
        };
        this.$http.post(this.$api + '/category/inputCategory', data, {
            headers: headers
        })
            .then((res) => {
                console.log(res)
                if(res.data.status == true) {
                    this.$buefy.dialog.alert('Kategori berhasil dibuat!')
                    this.form = []
                    this.fetchData(this.$store.getters.getUser.USERNAME)
                } else {
                    this.$buefy.dialog.alert('Terjadi kesalahan!')
                }
            })        
    },
    fetchData: function(username) {
        this.$http.get(this.$api + '/category/readCategory?u=' + username)
            .then((res) => {
                if(res.data.status == true) {
                    this.dataCategory = res.data.data;
                }
            })           
    }    
  },
  created() {
      this.fetchData(this.$store.getters.getUser.USERNAME)
  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }   
}
</script>
