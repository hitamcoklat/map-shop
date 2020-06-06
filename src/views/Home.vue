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
          <router-link v-bind:to="'product/' + item.slug">
            <img :alt="item.nama_produk" v-bind:src="item.gambar[0]">
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <p></p>
    </div>
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

export default {
  name: 'Home',
  data: () => ({
    isShowModal: false,
    dataProduk: []
  }),
  methods: {

      fetchData: async function() {
          const response = await requestServer(this.$api + '/api/getAllProduk', 'get')
          this.dataProduk = response.data.data;
          console.log(this.dataProduk)
      }

  },
  created() {
    this.fetchData();
  } 
}
</script>
