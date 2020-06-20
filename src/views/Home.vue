<template>
<div>
  <vue-headful
      :title="`IGToko - ${namaToko}`"
      :description="dataUser.ALAMAT"
  />  
  <div style="max-width: 450px;" class="container">

    <NavbarUser v-bind:alias="alias" />

        <div style="margin-top: 1em; box-shadow: none !important;" class="card">
            <div class="card-content">
                <div class="media">
                  <div class="media-left">
                      <figure class="image is-48x48">
                      <img src="https://ik.imagekit.io/igtoko/icons8-shop-100_Vh7oduoMq.png" alt="Placeholder image">
                      </figure>
                  </div>
                  <div class="media-content">
                      <p class="title is-4">{{namaToko}}</p>
                      <p class="subtitle is-6">
                        <strong>Bio: </strong>
                        <br />{{dataUser.ALAMAT}}
                      </p>
                  </div>
                </div>

                <div class="content">
                    <div class="buttons">
                        <b-button 
                        @click="kirimWhatsapp(dataUser.NO_HP)"
                        type="is-primary" expanded>Hubungi Toko via WA</b-button>
                    </div>
                </div>
            </div>
        </div>

        <div style="overflow-y: auto; margin: 0 !important;" class="columns is-mobile">
            <div v-bind:style="{backgroundColor: (selectedCategory == '') ? '#b4b5b8' : 'white'}" style="text-align: center; padding-top: 1em; color: black; border: 1px solid #CCC; font-weight: bold; border-radius: 5px; margin-right: 10px;" @click="fetchData" class="column is-5">
                Semua
            </div>
            <div v-for="(item, index) in dataCategory" :key="index" :ref="index" v-bind:style="{backgroundColor: (item.ID == selectedCategory) ? '#b4b5b8' : 'white'}" style="text-align: center; padding-top: 1em; color: black; font-weight: bold; border-radius: 5px; margin-right: 10px; border: 1px solid #CCC;" @click="getDataByCategory(item.ID)" class="column is-5">
                {{item.NAMA_KATEGORI}}
            </div>
        </div>                    
    <div style="width: 100%; margin-top: 1.5em;" class="listProduk">
      <div style="" class="columns is-multiline is-mobile">
        <div v-for="(item, index) in dataProduk" :key="index" :ref="index" class="column is-half">
          <router-link v-bind:to="alias + '/product/' + item.SLUG">
            <img style="width: 100%;" :alt="item.nama_produk" v-lazy="item.IMAGES[0].img">
          </router-link>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
      <footer v-show="btnKelolaToko" style="position: fixed;
                bottom: 0;
                width: 100%;
                color: white;
                text-align: center;
                padding: 1em;
                max-width: 450px;">
        <div class="content has-text-centered">
          <div class="buttons">
              <b-button @click="() => this.$router.push('/p/manage')" size="is-large" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Kelola Toko.</b-button>
          </div>          
        </div>
      </footer>    
  </div>
  <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>      
</div>
</template>

<style scoped>
  .listProduk .column {
    background-color: white;
    padding: 1px;
  }
  .listProduk .column:hover {
    opacity: 1;
  }
  img {
      vertical-align:middle
  }  
</style>

<script>

import { requestServer } from "@/api";

import Footer from './page/_footer'
import NavbarUser from './page/_NavbarUser'

export default {
  name: 'Home',
  props: ['alias'],  
  components: {
    'footer-component': Footer,
    NavbarUser
  },
  data: () => ({
    isShowModal: false,
    dataProduk: [],
    namaToko: '',
    isLoading: false,
    dataUser: [],
    btnKelolaToko: false,
    dataCategory: [],
    selectedCategory: '',
    email: '',
    linkToko: '',
    arrayColor: ['#00d1b2', '#00a8a7', '#18b285', '#683882', '#3d67a9', '#00a3b4', '#462066', '#f88379', '#00659d']    
  }),
  methods: {

      getDataByCategory: function(id) {
        this.isLoading = true
        this.$http.get(this.$api + '/api/readProdukByCat?u=' + this.namaToko + '&id=' + id)
            .then((res) => {
              this.isLoading = false
              this.selectedCategory = id
              this.dataProduk = res.data.data;
            })            
      },

      fetchDataCategory: function(username) {
          this.isLoading = true
          this.$http.get(this.$api + '/category/readCategory?u=' + username)
              .then((res) => {
                  this.isLoading = false
                  if(res.data.status == true) {
                      this.dataCategory = res.data.data;
                  }
              })           
      },

      fetchData: function() {
        this.isLoading = true
        this.$http.post(this.$api + '/api/getAllProduk/?user=' + this.namaToko)
            .then((res) => {
              if(res.data.status ==  false) {
                this.$buefy.dialog.alert({
                  message: `Ops, toko tidak ditemukan :(`,
                    onConfirm: () => this.$router.push('/')
                })            
              } else {
                this.selectedCategory = ''
                this.isLoading = false
                this.dataProduk = res.data.data;
              }
            })  
      },

      fetchDataUser: function(username) {
        this.isLoading = true
        this.$http.get(this.$api + '/api/getUserByUsername?u=' + username)
            .then((res) => {
                this.isLoading = false
                this.dataUser = res.data.data;
            })
      }, 
      
      kirimWhatsapp: function(noHp) {

        let parameter = '';
        let urlWa = 'https://api.whatsapp.com/send';
        let no_hp = noHp;
            no_hp = no_hp.replace('0', '+62');

        parameter = urlWa + '?phone=' + no_hp + '&text=Hai, ada yang ingin saya tanyakan';

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(parameter, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

            popupWindow.focus();  

        }      

  },
  created() {
    this.namaToko = this.alias;
    this.fetchData();
    this.fetchDataUser(this.namaToko);
    this.fetchDataCategory(this.alias)
    if(this.$store.getters.getLoginStatus == true) {
        this.btnKelolaToko = true
    }    
  },
  beforeCreate() {
    // this.fetchData();
  }
}
</script>
