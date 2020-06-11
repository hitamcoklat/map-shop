<template>
<div>
  <div style="max-width: 500px;" class="container">
    <navbar-user />
    <br clear="all" />
    <h1 class="" style="text-align: center; font-weight: bold; font-size: 1.2em;">CHECKOUT</h1>
    <br />      
    <section style="padding-left: 1em; padding-right: 1em;">
        <b-field>
            <b-input placeholder="Nama Lengkap"
                v-model="form.NAMA_LENGKAP"
                type="text"
                icon-pack="fas"
                size="is-medium"
                icon="user">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="No. WhatsApp"
                v-model="form.NO_HP"
                type="number"
                icon-pack="fas"
                size="is-medium"
                icon="phone-alt">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Email Aktif"
                v-model="form.EMAIL"
                icon-pack="fas"
                size="is-medium"
                icon="at">
            </b-input>
        </b-field>

        <b-field>
            <b-input
                v-model="form.ALAMAT" 
                type="textarea"
                minlength="10"
                placeholder="Detail Alamat">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Kode POS (opsional)"
                v-model="form.KODE_POS"
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
            <div v-on:click="toProduct(item.slug)" class="media-left">
                <figure class="image is-48x48">
                    <img :alt="item.nama_produk" v-bind:src="item.gambar[0]">
                </figure>
            </div>
            <div class="media-content">
                <div class="columns is-centered is-vcentered is-mobile">
                    <div class="column is-9">
                        <p>{{item.nama_produk}}</p>
                        <p style="font-weight: bold;">Rp {{formatPrice(item.harga)}} x {{item.quantity}} item(s)</p>                        
                    </div>
                    <div v-on:click="removeCart(item.id_produk)" class="column is-3 is-danger is-narrow has-text-centered">
                        <font-awesome-icon style="margin-right: 5px; color: red;" icon="times-circle" />
                    </div>
                </div>
            </div>
        </div>
            
    </section>  
    <section style="padding-left: 1em; padding-right: 1em; margin-top: 2em;">
        <table style="width: 100%;">
<!--             <tr>
                <td style="padding: 1em; border-bottom: 1px solid #ccc;"><font style="font-size: 1.1em; color: black;">Total Ongkir</font></td>
                <td style="text-align: right; border-bottom: 1px solid #ccc; padding: 1em;"><font style="font-size: 1.1em; color: black;">Rp 50000</font></td>
            </tr> -->
            <tr>
                <td style="padding: 1em;"><font style="font-size: 1.1em; color: black;">Total Biaya</font></td>
                <td style="text-align: right; padding: 1em;"><font style="font-size: 1.1em; color: black;">Rp {{formatPrice(totalPrice)}}</font></td>
            </tr>
            <tr>
                <td style="padding: 1em;"><font style="font-size: 1.1em; color: black;">Catatan ke penjual</font></td>
                <td style="text-align: right; padding: 1em;">
                    <font v-on:click="openCatatan = !openCatatan" style="font-size: 1.1em; color: #3b97ee; font-weight: bold;">Tulis Catatan</font>
                </td>
            </tr>
        </table>
    </section>
    <section v-if="openCatatan" style="padding-left: 1em; padding-right: 1em;">
        <b-field>
            <b-input
                v-model="form.CATATAN" 
                type="textarea"
                placeholder="Masukan catatan">
            </b-input>
        </b-field>
    </section>

    <section style="padding-left: 1em; padding-right: 1em; margin-top: 2em;">
        <button style="font-size: 1.1em;" v-on:click="submitPesanan()" class="button is-success is-fullwidth">
            Buat Pesanan
        </button>             
    </section>

    <footer-component /> 

  </div>
</div>
</template>
<script>

import { requestServer } from "@/api";
import Footer from './_footer'
import NavbarUser from './_NavbarUser'

export default {

  name: 'Checkout',
  components: {
    'footer-component': Footer,
    'navbar-user': NavbarUser
  },
  data: () => ({
      listProduk: [],
      openCatatan: false,
      form: [],
      totalPrice: 0
  }),
  methods: {

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    toProduct: function(slug) {
        this.$router.push('/product/' + slug)
    },

    removeCart: function(id) {
        console.log(id)
        this.$store.commit('removeFromCart', id)
        // this.$store.commit('resetCart');
        const { cart } = this.$store.state;
        this.listProduk = cart.cartItem;
        this.totalPrice = cart.total             
    },

    submitPesanan: function() {
        console.log(this.form)
        const { cart } = this.$store.state;
        let data = {
            DATA_KUSTOMER: {
                NAMA_LENGKAP: this.form.NAMA_LENGKAP,
                NO_HP: this.form.NO_HP,
                EMAIL: this.form.EMAIL,
                ALAMAT: this.form.ALAMAT,
                KODE_POS: this.form.KODE_POS,
                CATATAN: this.form.CATATAN
            },
            DATA_ORDER: cart.cartItem,
            TOTAL_HARGA: cart.total
        }
        this.$http.post(this.$api + '/api/inputPesanan', data)
    }

  },

  beforeCreate() {
      if(this.$store.getters.cartSize <= 0) {
          alert('Your cart is empty');
          this.$router.push('/')
      }
  },

  created() {
      const { cart } = this.$store.state;
      this.listProduk = cart.cartItem;
      this.totalPrice = cart.total
      console.log(this.listProduk);
  },
  updated() {
      if(this.$store.getters.cartSize <= 0) {
          alert('Your cart is empty');
          this.$router.push('/')
      }
      this.listProduk = this.$store.getters.getCart;  
  }
  
}
</script>