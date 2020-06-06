<template>
<div>
  <div style="max-width: 500px;" class="container">
    <b-navbar>
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
    <div v-for="item in dataProduk" :key="item.id_produk" :ref="item.id_produk" class="column">
        <b-carousel>
            <b-carousel-item v-for="(carousel, i) in item.gambar" :key="i">
                <img :alt="item.nama_produk" v-bind:src="carousel">
            </b-carousel-item>
        </b-carousel>                
        <div style="padding-left: 1em; padding-right: 1em;">
            <p style="font-weight: bold;">{{item.nama_produk}}</p>
            <p v-html="item.deskripsi"></p>
            <button style="width: 100%; margin-top: 10px;" class="button is-info">Beli</button>
        </div>
    </div>
  </div>
</div>
</template>
<script>

import { requestServer } from "@/api";

export default {
  name: 'DetailProduk',
  props: ['slug'],
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
      console.log(this.slug)
      this.fetchData();
  } 
}
</script>