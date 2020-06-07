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
    <b-modal v-if="isCardModalActive" :active.sync="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img :alt="selectedProduk.nama_produk" v-bind:src="selectedProduk.gambar[0]">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">{{selectedProduk.nama_produk}}</p>
                        <p class="subtitle is-6">Rp {{formatPrice(selectedProduk.harga)}}</p>
                    </div>
                </div>

                <div style="width: 100%;" class="content">
                    <p style="margin-bottom: 0 !mportant;"><strong>Jumlah</strong></p>
                    <div class="columns is-mobile">
                        <div class="column is-1">
                            <button class="button is-normal">-</button>
                        </div>
                        <div class="column">
                            <b-field>
                                <b-input
                                    v-model="quantity"
                                    type="number"
                                    min="10"
                                    max="20">
                                </b-input>
                            </b-field>                        
                        </div>
                        <div class="column is-1">
                            <button class="button is-normal is-pulled-right">+</button>
                        </div>
                    </div>    
                    <button class="button is-success is-fullwidth">
                        Beli
                    </button>                            
                </div>
            </div>
        </div>
    </b-modal>
    <div style="background-color: white; position: fixed; bottom: 0; z-index: 9999; width: 100%; border-top: 1px solid #ccc;" class="columns is-mobile is-gapless">
        <div class="column">
            <div style="padding: 10px;" class="">
                <font-awesome-icon style="margin-right: 5px;" icon="cart-plus" /> Cart
            </div>
        </div>
        <div class="column">
            <div style="padding: 10px; text-align: center;" class="">
                <font-awesome-icon style="margin-right: 5px;" icon="chevron-circle-up" />
            </div>
        </div>
        <div class="column">
            <div style="padding: 10px; text-align: left;" class="">
                Rp 2.000.000
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
    isCardModalActive: false,
    dataProduk: [],
    quantity: 1,
    selectedProduk: []
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
        this.selectedProduk = item;
        this.isCardModalActive = true;
        console.log(this.selectedProduk)
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