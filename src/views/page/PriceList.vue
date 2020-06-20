<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">
       
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://ik.imagekit.io/igtoko/icons8-shop-100_Vh7oduoMq.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Coba Gratis</p>
                    </div>
                    </div>

                    <div class="content">
                        <ol>
                            <li>Coba Gratis selama 14 hari</li>
                            <li>Gratis Update</li>
                            <li>Dapat Link Toko <strong>(http://igtoko.com/toko-anda)</strong></li>
                        </ol>
                    <br>
                    <div class="buttons">
                        <b-button size="is-large" v-on:click="toRegisterPage" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Buat Toko</b-button>
                    </div>                     
                </div>
            </div>  
        </div>       
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://ik.imagekit.io/igtoko/icons8-shop-100_Vh7oduoMq.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Basic</p>
                    </div>
                </div>

                    <div class="content">
                        <ol>
                            <li>Produk Unlimited</li>
                            <li>Gratis Update</li>
                            <li>Dapat Link Toko <strong>(http://igtoko.com/toko-anda)</strong></li>
                            <li>
                                <font style="text-decoration: line-through;">Rp 75.000</font>
                                <font style="font-weight: bold; margin-left: 10px; color: white; background-color: #4caf50; padding: 2px 5px;">Rp 35.000</font> / Bulan
                            </li>
                        </ol>
                    <br>
                    <div class="buttons">
                        <b-button size="is-large" v-on:click="kirimWhatsapp('081280057227', 'Basic')" style="background-color: #4caf50; color: white; border: 1px solid #CCC;" expanded>Pesan Paket</b-button>
                    </div>                     
                </div>
            </div>  
        </div>       
<!--         <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://ik.imagekit.io/igtoko/icons8-shop-100_Vh7oduoMq.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Pasang di Server Sendiri</p>
                    </div>
                    </div>

                    <div class="content">
                        <ol>
                            <li>Bantuan Installasi</li>
                            <li>Gratis Update</li>
                            <li>Harga Untuk Satu Lisensi Website</li>
                            <li>Belum Termasuk Domain & Hosting</li>
                        </ol>
                        <p style="text-align: center;"><strike>Rp. 300.000</strike> <br /><font style="font-weight: bold; font-size: 1.2em;">Rp 125ribu!</font></p>
                    <br>
                    <div class="buttons">
                        <b-button size="is-large" v-on:click="submitToko" type="is-success" expanded>Pesan Toko</b-button>
                    </div>                     
                </div>
            </div>  
        </div>       
 -->
    </section>
    <br />
    <br />
    <br />
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'

export default {
  name: 'PriceList',
  components: {
    'navbar-user': NavbarUser,
  },  
  data: () => ({
    isShowModal: false,
    emailUsername: false,
    form: [],
  }),
  methods: {     
      toRegisterPage: function() {
          this.$router.push('/p/buat-toko')
      },
        kirimWhatsapp: function(noHp, paket) {

            let parameter = '';
            let urlWa = 'https://api.whatsapp.com/send';
            let no_hp = noHp;
                no_hp = no_hp.replace('0', '+62');

            parameter = urlWa + '?phone=' + no_hp + '&text=Hai, saya ingin memesan Paket ' + paket;

            var w = 960,
                h = 540,
                left = Number((screen.width / 2) - (w / 2)),
                tops = Number((screen.height / 2) - (h / 2)),
                popupWindow = window.open(parameter, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

                popupWindow.focus();  

        }       
  },
  created() {
      
  } 
}
</script>
