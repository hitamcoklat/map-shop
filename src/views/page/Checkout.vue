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
    <br clear="all" />
    <section style="padding-left: 1em; padding-right: 1em;">
        <b-field>
            <b-input placeholder="Nama Lengkap"
                type="text"
                icon-pack="fas"
                size="is-medium"
                icon="user">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="No. WhatsApp"
                type="number"
                icon-pack="fas"
                size="is-medium"
                icon="phone-alt">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Email Aktif"
                icon-pack="fas"
                size="is-medium"
                icon="at">
            </b-input>
        </b-field>

        <b-field>
            <b-input 
                type="textarea"
                minlength="10"
                placeholder="Detail Alamat">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Kode POS (opsional)"
                icon-pack="fas"
                size="is-medium"
                icon="mail-bulk">
            </b-input>
        </b-field>        

    </section>
    <section style="padding-left: 1em; padding-right: 1em; margin-top: 2em;">
        
        <h2 style="text-align: center;">DETAIL PEMBELIAN</h2>
        <br />
        <div v-for="item in listProduk" :key="item.id_produk" :ref="item.id_produk" class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img :alt="item.nama_produk" v-bind:src="item.gambar[0]">
                </figure>
            </div>
            <div class="media-content">
                <div class="columns is-centered is-vcentered is-mobile">
                    <div class="column is-9">
                        <p>{{item.nama_produk}}</p>
                        <p style="font-weight: bold;">{{item.quantity}} item(s)</p>                        
                    </div>
                    <div v-on:click="removeCart(item.id_produk)" class="column is-3 is-danger is-narrow has-text-centered">
                        <font-awesome-icon style="margin-right: 5px; color: red;" icon="times-circle" />
                    </div>
                </div>
            </div>
        </div>
            
    </section>  
    <section style="padding-left: 1em; padding-right: 1em; margin-top: 2em;">
                    
    </section>    

  </div>
</div>
</template>
<script>

import { requestServer } from "@/api";

export default {

  name: 'Checkout',
  data: () => ({
      listProduk: []
  }),
  methods: {

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    removeCart(id) {
        console.log(id)
        this.$store.commit('removeFromCart', id);
        // this.$store.commit('resetCart');
        const { cart } = this.$store.state;
        this.listProduk = cart.cartItem;        
    }

  },
  created() {
      const { cart } = this.$store.state;
      this.listProduk = cart.cartItem;
      console.log(this.listProduk);
  },
  updated() {
  }
  
}
</script>