<template>
    <div style="max-width: 500px;" class="container">
        <navbar-user />
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" style="padding-left: 1em; padding-right: 1em;" class="container">

            <div v-for="(item, index) in dataOrder" :key="index" :ref="index" style="margin-top: 1em;" class="card">
                <header class="card-header">
                    <p style="text-transform: Capitalize;" class="card-header-title">
                        {{item.NAMA_LENGKAP}}
                    </p>
                </header>
                <div style="padding: 0.5em;" class="card-content">
                    <div class="content">
                        <div v-for="(itm, index) in item.DETAILS" :key="index" :ref="index">
<pre>-------------------------------------
Produk : {{itm.NAMA_PRODUK}}
Harga: Rp {{formatPrice(itm.HARGA)}} x {{itm.quantity}} item(s)
</pre>
</div>
<p style="margin-left: 0.5em; margin-top: 1em;"><strong>Sub Total:</strong> Rp {{formatPrice(item.TOTAL)}}
<br />
<strong>Alamat:</strong> {{item.ALAMAT}}
<br />
<strong>Email:</strong> {{item.EMAIL}}
<br />
<strong>Tgl Order:</strong> {{item.CREATED_AT}}
</p>
                    </div>
                </div>
                <br />
                <footer class="card-footer">
                    <span v-on:click="kirimWhatsapp(item.NO_HP, item.NAMA_LENGKAP)" style="color: white; font-weight: bold; cursor: pointer; background-color: #009688;" class="card-footer-item"><font-awesome-icon style="margin-right: 5px; color: white;" icon="comments" />Follow Up</span>
                    <span v-on:click="confirmCustom(item.ID)" style="color: white; cursor: pointer; background-color: #ff3434;" class="card-footer-item">Delete</span>
                </footer>
            </div>
            <br />
            <br />
            <br />
        </div>    
        <b-loading :is-full-page="true" :active.sync="busy" :can-cancel="false"></b-loading>

    </div>
</template>
<script>

import NavbarUser from './_NavbarUser'
import { requestServer } from "@/api";

export default {
  name: 'ListProduk',
  components: {
    'navbar-user': NavbarUser
  },
  data: () => ({
      dataOrder: [],
      page: 1,
      busy: false,
      dataExist: true,
      email: '',
      username: '',
      token: ''
  }),
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },       
      fetchData: async function(page = 1) {
          let username = this.$store.getters.getUser.USERNAME;
          const response = await requestServer(this.$api + '/api/getAllOrderByUsername?u=' + username + '&page=' + page, 'get')
          this.dataOrder = response.data.data;
      },
      editProduk: function (id) {
          this.$router.push({name: 'InputProduk', params: { id: id }})
      },    
      loadMore: async function () {
          if(this.dataExist) {
            this.busy = true
            this.page = this.page + 1;
            let username = this.$store.getters.getUser.USERNAME;
            const response = await requestServer(this.$api + '/api/getAllOrderByUsername?u=' + username + '&page=' + this.page, 'get')
            if(response.data.status == true) {
                this.dataOrder.push(...response.data.data);
                this.busy = false
            } else {
                this.busy = false
                this.dataExist = false
            }
          }
      },
      alertOrderEmpty: function() {
        this.$buefy.dialog.alert({
            message: 'Ops! Belum ada pesanan masuk :(',
            confirmText: 'Kembali',
            onConfirm: () => this.$router.back()
        })          
      },
    kirimWhatsapp: function(noHp, namaLengkap) {
        let parameter = '';
        let urlWa = 'https://api.whatsapp.com/send';
        let no_hp = noHp;
            no_hp = no_hp.replace('0', '+62');

        parameter = urlWa + '?phone=' + no_hp + '&text=Halo '+namaLengkap + ', pesanan anda sedang kami proses...';

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(parameter, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

            popupWindow.focus();        
    }       
  },
  created() {
    this.fetchData()
        .then(() => {
            if(this.dataOrder.length <= 0) {
                this.alertOrderEmpty()
            }            
        })

    this.token = this.$store.getters.getUser.TOKEN;
    this.email = this.$store.getters.getUser.EMAIL;
    this.username = this.$store.getters.getUser.USERNAME;
  } 
}
</script>