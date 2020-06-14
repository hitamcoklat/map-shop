<template>
<div>
  <div style="max-width: 500px;" class="container">
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
                Home
            </b-navbar-item>
            <b-navbar-dropdown label="Category">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
    <div style="width: 100%;" class="listProduk">
      <div class="columns is-multiline is-mobile">
        <div v-for="(item, index) in dataProduk" :key="index" :ref="index" class="column is-half">
          <router-link v-bind:to="alias + '/product/' + item.SLUG">
            <img style="width: 100%;" :alt="item.nama_produk" v-bind:src="item.IMAGES[0].img">
          </router-link>
        </div>
      </div>
    </div>

    <footer-component></footer-component>

  </div>
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

export default {
  name: 'Home',
  props: ['alias'],
  components: {
    'footer-component': Footer
  },
  data: () => ({
    isShowModal: false,
    dataProduk: [],
    namaToko: ''
  }),
  methods: {

      fetchData: async function() {
          const response = await requestServer(this.$api + '/api/getAllProduk/?user=' + this.namaToko, 'get')
          if(response.data.status ==  false) {
            this.$buefy.dialog.confirm({
                title: 'Info',
                message: `Ops, toko tidak ditemukan :(`,
                cancelText: 'Batal',
                confirmText: 'Ok',
                type: 'is-success',
                onConfirm: () => this.$router.push('/')
            })            
          } else {
            this.dataProduk = response.data.data;
          }
          console.log(this.dataProduk)
      }

  },
  created() {
    this.namaToko = this.alias;
    this.fetchData();
    console.log(this.alias)
  },
  beforeCreate() {
    // this.fetchData();
  }
}
</script>
