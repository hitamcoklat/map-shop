<template>
    <div style="max-width: 500px;" class="container">
        <NavbarUser />
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" style="padding-left: 1em; padding-right: 1em;" class="container">

            <div v-for="(item, index) in dataProduk" :key="index" :ref="index" style="margin-top: 1em;" class="card">
                <header class="card-header">
                    <p style="text-transform: Capitalize;" class="card-header-title">
                        {{item.NAMA_PRODUK}}
                    </p>
                </header>
                <div style="padding: 0.5em;" class="card-content">
                    <div class="content">
                        <p style="text-align: left;">
                            <img style="width: 64px; float: left; margin-right: 10px;" :alt="(item.IMAGES.length == 0) ? 'https://ik.imagekit.io/igtoko/no-image-icon-11_evq7Xk7Mt.PNG' : item.IMAGES[0].thumb" v-bind:src="(item.IMAGES.length == 0) ? 'https://ik.imagekit.io/igtoko/no-image-icon-11_evq7Xk7Mt.PNG' : item.IMAGES[0].thumb" />
                            {{item.CAPTION}}
                            <br />
                        </p>
                        <span style="margin-right: 10px;" class="tag is-success is-light">Harga: Rp {{formatPrice(item.HARGA)}}</span>
                        <span class="tag is-warning is-light">Berat: {{item.BERAT}} gram</span>
                    </div>
                </div>
                <br />
                <footer class="card-footer">
                    <span v-on:click="editProduk(item.ID)" style="color: blue; cursor: pointer;" class="card-footer-item">Edit</span>
                    <span v-on:click="confirmCustom(item.ID)" style="color: red; cursor: pointer;" class="card-footer-item">Delete</span>
                </footer>
            </div>
            <br />
            <br />
            <br />
        </div>    
        <b-loading :is-full-page="true" :active.sync="busy" :can-cancel="false"></b-loading>    
    </div>
</template>
<script>

import NavbarUser from './_NavbarUser'
import { requestServer } from "@/api";

export default {
  name: 'ListProduk',
  components: {
    NavbarUser
  },
  data: () => ({
      dataProduk: [],
      page: 1,
      busy: false,
      dataExist: true,
      email: '',
      username: '',
      token: ''
  }),
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },       
      fetchData: async function(page = 1) {
          let username = this.$store.getters.getUser.USERNAME;
          const response = await requestServer(this.$api + '/api/getAllProdukByUsername?u=' + username + '&page=' + page, 'get')
          if(response.data.status == false) {
            this.$buefy.dialog.confirm({
                message: 'Produk masih kosong!',
                confirmText: 'Tambahkan Produk',
                onConfirm: () => this.$router.push('/p/input-produk'),
                onCancel: () => this.$router.push('/p/manage')
            })              
          }
          this.dataProduk = response.data.data;          
      },
      editProduk: function (id) {
          this.$router.push({name: 'InputProduk', params: { id: id }})
      },    
      loadMore: async function () {
          if(this.dataExist) {
            this.busy = true
            this.page = this.page + 1;
            let username = this.$store.getters.getUser.USERNAME;
            const response = await requestServer(this.$api + '/api/getAllProdukByUsername?u=' + username + '&page=' + this.page, 'get')
            if(response.data.status == true) {
                this.dataProduk.push(...response.data.data);
                this.busy = false
            } else {
                this.busy = false
                this.dataExist = false
            }
          }
      },
        confirmCustom(idProduk) {
            this.$buefy.dialog.confirm({
                title: 'Info',
                message: `Apakah anda yakin ingin menghapus produk ini?`,
                cancelText: 'Batal',
                confirmText: 'Ok',
                type: 'is-success',
                onConfirm: () => {
                    this.$http.get(this.$api + '/api/hapusProduk?email=' + this.email + '&token=' + this.token + '&id_produk=' + idProduk + '&u=' + this.username)
                        .then((res) => {
                            if(res.data.status == true) {
                                this.$buefy.toast.open({
                                    duration: 3000,
                                    message: `Berhasil dihapus!`,
                                    position: 'is-bottom',
                                    type: 'is-success'                                    
                                })
                                this.fetchData();                     
                            } else {
                                this.$buefy.toast.open({
                                    duration: 3000,
                                    message: `Terjadi kesalahan!`,
                                    position: 'is-bottom',
                                    type: 'is-danger'                                    
                                })                                
                            }
                            console.log(res)
                        })                    
                }
            })
        },      
  },
  created() {
    this.fetchData();
    this.token = this.$store.getters.getUser.TOKEN;
    this.email = this.$store.getters.getUser.EMAIL;
    this.username = this.$store.getters.getUser.USERNAME;
  } 
}
</script>