<template>
<div>
  <div style="max-width: 500px;" class="container">
    <b-navbar style="position: fixed; width: 100%; z-index: 9999; top: 0">
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
    <div style="position: fixed; width: 100%; z-index: 9999; bottom: 0">
        <section>
            <b-message title="Cart" type="is-info" size="is-small" :active.sync="isShowModal" aria-close-label="Close message">
                Lorem ipsum dolor
            </b-message>
        </section>
    </div>    
    <div v-for="item in dataProduk" :key="item.id_produk" :ref="item.id_produk" class="column" :id="item.slug">
        <b-carousel>
            <b-carousel-item v-for="(carousel, i) in item.gambar" :key="i">
                <img :alt="item.nama_produk" v-bind:src="carousel">
            </b-carousel-item>
        </b-carousel>                
        <div style="padding-left: 1em; padding-right: 1em;">
            <p style="font-weight: normal;">{{item.nama_produk}}</p>
            <p style="font-weight: bold;">Rp {{formatPrice(item.harga)}}</p>
            <p style="border-top: 1px dashed #ccc; padding-top: 1em; margin-top: 1em;" v-html="item.deskripsi"></p>
            <button style="width: 100%; margin-top: 10px;" v-on:click="addToCart(item)" class="button is-info">
                <font-awesome-icon style="margin-right: 5px;" icon="cart-plus" /> Beli
            </button>
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

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },      

    fetchData: async function() {
        const response = await requestServer(this.$api + '/api/getAllProduk', 'get')
        this.dataProduk = response.data.data;
        console.log(this.dataProduk)
    },

    addToCart: function(item) {
        this.$store.commit('addToCart', item);
    }    

  },
  created() {
      console.log(this.slug)      
      this.fetchData();
  },
  updated() {
    document.getElementById(this.slug).scrollIntoView();
  }
}
</script>