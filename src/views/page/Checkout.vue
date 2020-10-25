<template>
<div>
  <div style="max-width: 500px;" class="container">
    <NavbarUser v-bind:alias="alias" />
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
            <b-input placeholder="No. WA, Cth: 081283978"
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
                type="email"
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
        <div v-for="item in listProduk" :key="item.ID" :ref="item.ID" class="media">
            <div v-on:click="toProduct(item.SLUG)" class="media-left">
                <figure class="image is-48x48">
                    <img :alt="item.NAMA_PRODUK" v-bind:src="(item.IMAGES.length > 0) ? item.IMAGES[0].thumb : 'https://ik.imagekit.io/igtoko/no-image-icon-11_evq7Xk7Mt.PNG'" />
                </figure>
            </div>
            <div class="media-content">
                <div class="columns is-centered is-vcentered is-mobile">
                    <div class="column is-9">
                        <p>{{item.NAMA_PRODUK}}</p>
                        <p style="font-weight: bold;">Rp {{formatPrice(item.HARGA)}} x {{item.quantity}} item(s)</p>                        
                    </div>
                    <div v-on:click="removeCart(item.ID)" class="column is-3 is-danger is-narrow has-text-centered">
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
        <button size="is-medium" style="font-size: 1.1em;" v-on:click="submitPesanan()" class="button is-success is-fullwidth">
            <font-awesome-icon style="margin-right: 5px; color: white;" icon="comments" />Buat Pesanan
        </button>             
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        {{dataUser.ALAMAT}}
      </div>
    </footer>

  </div>
</div>
</template>
<script>

import { requestServer } from "@/api";
import Footer from './_footer'
import NavbarUser from './_NavbarUser'

export default {

  name: 'Checkout',
  props: ['alias'],
  components: {
    'footer-component': Footer,
    NavbarUser
  },
  data: () => ({
      listProduk: [],
      openCatatan: false,
      form: [],
      dataUser: [],
      totalPrice: 0
  }),
  methods: {

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    toProduct: function(slug) {
        this.$router.push('/'+this.alias+'/product/' + slug)
    },

    removeCart: function(id) {
        this.$store.commit('removeFromCart', id)
        // this.$store.commit('resetCart');
        const { cart } = this.$store.state;
        this.listProduk = cart.cartItem;
        this.totalPrice = cart.total             
    },

    fetchDataUser: function(username) {
        this.$http.get(this.$api + '/api/getUserByUsername?u=' + username)
            .then((res) => {
                this.dataUser = res.data.data;
            })
    },      

    submitPesanan: function() {
        
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
            TOTAL_HARGA: this.$store.getters.cartTotalAmount
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }        

        this.$http.post(this.$api + '/api/inputPesanan?u=' + this.alias, data, {
            headers: headers
        })
            .then((res) => {
                if(res.data.status == true) {
                    this.kirimWhatsapp()
                    this.$store.commit('resetCart');
                    this.form = []
                } else {
                    alert(res.data.msg)
                }
                // if(res.statu)
            })
    
    },
    kirimWhatsapp: function() {
        let parameter = '';
        // let urlWa = 'https://web.whatsapp.com/send';
        let urlWa = 'https://api.whatsapp.com/send';
        // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //     urlWa = 'whatsapp://send';
        // }
        let no_hp = this.dataUser.NO_HP;
            no_hp = no_hp.replace('0', '+62');

        let dataKirim = '';
        let dataProduk = this.$store.state.cart.cartItem;

        Object.keys(dataProduk).forEach((key) => {
            dataKirim += '-----------------------------%0A';
            dataKirim += 'Nama Produk: ' + dataProduk[key].NAMA_PRODUK + '%0A';
            dataKirim += 'Harga: Rp' + dataProduk[key].HARGA + '%0A';
            dataKirim += 'Qty: ' + dataProduk[key].quantity + '%0A';
            dataKirim += '-----------------------------%0A';
        })

        parameter = urlWa + '?phone=' + no_hp + '&text=Halo Admin Toko *' + this.alias + '*, saya *'+this.form.NAMA_LENGKAP + '*, %0A mau pesan: %0A '+dataKirim+ '*Atas nama:* %0A' + this.form.NAMA_LENGKAP + ', %0A*E-mail:* %0A'+this.form.EMAIL + ', %0A*Alamat:* %0A'+this.form.ALAMAT + ', %0A*KODE POS:* %0A'+this.form.KODE_POS + ', %0A*CATATAN:* %0A' + this.form.CATATAN;

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(parameter, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

            popupWindow.focus();        
    }

  },

  created() {

      if(this.$store.getters.cartSize <= 0) {
          this.$buefy.dialog.alert('Keranjang anda masih kosong!')
          this.$router.push('/' + this.alias)
          return false;
      }

      const { cart } = this.$store.state;
      this.listProduk = cart.cartItem;
      this.totalPrice = this.$store.getters.cartTotalAmount
      this.fetchDataUser(this.alias)
      
  },

  updated() {
      if(this.$store.getters.cartSize <= 0) {
          this.$buefy.dialog.alert('Keranjang anda masih kosong!')
          this.$router.push('/' + this.alias)
      }
      this.listProduk = this.$store.getters.getCart;  
  }
  
}
</script>