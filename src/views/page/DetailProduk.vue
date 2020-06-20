<template>
<div>
  <div style="max-width: 500px;" class="container">
    <NavbarUser v-bind:alias="alias" />
    <div style="margin-bottom: 2.5em;" v-for="item in dataProduk" :key="item.ID" :ref="item.ID" class="column" :id="item.SLUG">
        <b-carousel>
            <b-carousel-item v-for="(carousel, i) in item.IMAGES" :key="i">
                <img :alt="item.NAMA_PRODUK" v-lazy="carousel.img">
            </b-carousel-item>
        </b-carousel>                
        <div style="padding-left: 1em; padding-right: 1em;">
            <p style="font-weight: normal;">{{item.NAMA_PRODUK}}</p>
            <p>
                <span v-if="item.HARGA_CORET != null" style="margin-right: 10px;">
                <font style="font-weight: normal; text-decoration: line-through;">Rp {{formatPrice(item.HARGA_CORET)}}</font>
                </span>
                <font style="font-weight: bold;">Rp {{formatPrice(item.HARGA)}}</font>
            </p>
            <p style="border-top: 1px dashed #ccc; padding-top: 1em; margin-top: 1em;" v-html="item.CAPTION"></p>
            <button style="width: 100%; margin-top: 10px;" v-on:click="popBeli(item)" class="button is-info">
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
                            <img :alt="selectedProduk.NAMA_PRODUK" v-bind:src="selectedProduk.IMAGES[0].thumb">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5">{{selectedProduk.NAMA_PRODUK}}</p>
                        <p class="subtitle is-6">Rp {{formatPrice(selectedProduk.HARGA)}}</p>
                    </div>
                </div>

                <div style="width: 100%;" class="content">
                    <p style="margin-bottom: 0 !mportant;"><strong>Jumlah</strong></p>
                    <div class="columns is-mobile">
                        <div class="column is-1">
                            <button v-on:click="decQuantity()" class="button is-normal">-</button>
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
                            <button v-on:click="incQuantity()" class="button is-normal is-pulled-right">+</button>
                        </div>
                    </div>    
                    <button v-on:click="addToCart()" class="button is-success is-fullwidth">
                        Beli
                    </button>                            
                </div>
            </div>
        </div>
    </b-modal>
    <div v-on:click="toCheckoutPage()" style="background-color: white; position: fixed; bottom: 0; z-index: 9999; width: 100%; border-top: 1px solid #ccc;" class="columns is-mobile is-gapless">
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
                {{jmlProduk}} Produk
            </div>
        </div>
    </div>  
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>     
</div>
</template>
<script>

import { requestServer } from "@/api";
import NavbarUser from './_NavbarUser'

export default {
  name: 'DetailProduk',
  props: ['slug', 'alias'],
  components: {
    NavbarUser
  },  
  data: () => ({
    isShowModal: false,
    isCardModalActive: false,
    dataProduk: [],    
    quantity: 1,
    selectedProduk: [],
    jmlProduk: 0,
    isLoading: false,
    user: ''
  }),
  methods: {

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },    
    
    incQuantity: function () {
        this.quantity++;
    },

    toCheckoutPage: function() {
        this.$router.push('/' + this.alias + '/checkout')
    },

    decQuantity: function () {
        if(this.quantity !== 0) {
            this.quantity--;
        }
    },

    fetchData: async function() {
        this.isLoading = true
        const response = await requestServer(this.$api + '/api/getAllProduk?user=' + this.user, 'get')
        this.isLoading = false
        this.dataProduk = response.data.data;
    },

    popBeli: function(item) {
        // this.$store.commit('resetCart');
        this.isCardModalActive = true;
        this.selectedProduk = item;
    },

    addToCart: function() {
        this.selectedProduk.quantity = this.quantity;
        this.$store.commit('addToCart', this.selectedProduk);
        this.isCardModalActive = false;
        this.jmlProduk = this.$store.getters.cartSize;

        // dialog lanjut belanja?
        this.$buefy.dialog.confirm({
            message: 'Produk berhasil dimasukan ke keranjang.',
            confirmText: 'Checkout',
            cancelText: 'Lanjut Belanja',
            onConfirm: () => this.$router.push('/' + this.alias + '/checkout')
        })        
    }    

  },
  created() {
      this.user = this.alias
      try{
        this.fetchData();
        this.fetchDataUser(this.user);
      } catch(e) {}
      this.jmlProduk = this.$store.getters.cartSize;
  },
  updated() {
    document.getElementById(this.slug).scrollIntoView();
  }
  
}
</script>