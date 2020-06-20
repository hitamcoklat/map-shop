<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-field label="Username/Nama Toko">
            <b-input 
                icon-pack="fas"
                icon="cookie-bite"
                v-model="namaToko" 
                disabled
                placeholder="Username..."></b-input>
        </b-field>
        <b-field label="No Whatsapp">
            <b-input
                icon-pack="fas"
                icon="tags"             
                type="number" 
                v-model="no_hp" 
                placeholder="Nomor Whatsapp"></b-input>
        </b-field>
        <b-field label="Bio Toko">
            <b-input v-model="alamat" type="textarea"></b-input>
        </b-field>
        <b-field label="Ganti Password">
            <b-button @click="popUpGantiPass" type="is-info" size="is-small">Klik Untuk Ganti Password</b-button>
        </b-field>
        <div v-if="coverImage !== ''" style="width: 100%;">
            <p>Cover Image</p>
            <img :alt="coverImage" v-bind:src="coverImage">
        </div>  
        <div v-if="logoImage !== ''" style="width: 100%;">
            <p>Logo Image</p>
            <img :alt="logoImage" v-bind:src="logoImage">
        </div> 
        <b-field label="Keterangan">
            <p>
                <ol style="margin-left: 1em;">
                    <li>Ukuran Cover disarankan berbentuk kotak/square</li>
                    <li>Ukuran Logo disarankan berbentuk Persegi Panjang ukuran 300px * 100px</li>
                </ol>
            </p>
        </b-field>                        
        <div style="margin-top: 2em; padding-left: 0.6em; padding-right: 0.6em;" class="columns is-multiline is-mobile">
            <div style="text-align: center; width: 50%; height: 100%; background-color: #ebfffc; color: #00947e; border: 1px solid #FFF;" class="column is-half">
                <div class="file is-boxed">
                    <label class="file-label">
                        <input class="file-input" accept="image/x-png,image/gif,image/jpeg" type="file" ref="imageFile" @change="handleUpload('cover')" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <font-awesome-icon icon="upload" />
                            </span>
                            <span class="file-label">
                                Pilih Cover Toko
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div style="text-align: center; width: 50%; height: 100%; background-color: #eef3fc; color: #2160c4; border: 1px solid #FFF;" class="column is-half">
                <div class="file is-boxed">
                    <label class="file-label">
                        <input class="file-input" accept="image/x-png,image/gif,image/jpeg" type="file" ref="logoFile" @change="handleUpload('logo')" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <font-awesome-icon icon="upload" />
                            </span>
                            <span class="file-label">
                                Pilih Logo Toko
                            </span>
                        </span>
                    </label>
                </div>                
            </div>
        </div>               
        <div style="margin-top: 1em;" class="buttons">
            <b-button class="is-medium" v-on:click="submitProduk" type="is-primary" expanded>Update Toko</b-button>
        </div>
        <br />
        <br />
        <br />
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'
import ImageKit from 'imagekit-javascript';
import { IKImage, IKContext, IKUpload } from "imagekitio-vue";
let urlEndpoint= "https://ik.imagekit.io/igtoko";

export default {
  name: 'SettingToko',
  components: {
    'navbar-user': NavbarUser,
    IKImage,
    IKContext,
    IKUpload    
  },  
  data: () => ({
    isShowModal: false,
    form: [],
    file: null,
    urlEndpoint: "https://ik.imagekit.io/igtoko",
    publicKey: "public_lxCCE/BxwyGPmc6KsKr2uGXWenE=",
    authenticationEndpoint: '',
    coverImage: "",
    logoImage: "",
    namaToko: '',
    alamat: '',
    no_hp: '',
    passBaru: '',
    isLoading: false  
  }),
  methods: {

    popUpGantiPass: function() {

        this.$buefy.dialog.prompt({
            message: `Masukan password baru anda.`,
            inputAttrs: {
                placeholder: 'Input Password Baru...',
                maxlength: 100
            },
            trapFocus: true,
            onConfirm: (value) => {

                let data = {
                    PASSBARU: value,
                    EMAIL: this.$store.getters.getUser.EMAIL,
                    TOKEN: this.$store.getters.getUser.TOKEN
                }

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }

                this.$http.post(this.$api + '/api/changePassword', data, {
                    headers: headers
                }).then((res) => {
                    if(res.data.status == true) {
                        this.$buefy.toast.open({
                            message: `Password berhasil di update!`,
                            position: 'is-bottom'
                        })
                    } else {
                        alert('Terjadi kesalahan!')
                    }
                })                  
            }
        })

    },

    handleUpload: function (jenis) {

        this.isLoading = true;

        var imagekit = new ImageKit({
            publicKey : this.publicKey,
            urlEndpoint : this.urlEndpoint,
            authenticationEndpoint : this.authenticationEndpoint
        });

        let file = (jenis == 'cover') ? this.$refs.imageFile.files[0] : this.$refs.logoFile.files[0]
        
        try {
            imagekit.upload({
                file : file,
                fileName : "igtoko.jpg",
                tags : ["tag1"]
            }, (err, result) => {

                this.isLoading = false;

                if(jenis == 'cover') {
                    this.coverImage = result.url
                }

                if(jenis == 'logo') {
                    this.logoImage = result.url
                }          

            })  
        } catch(e) {
            console.log('no image selected')
        }

    },

    submitProduk: function() {

        this.isLoading = true

        let data = {
            COVER_IMAGE: this.coverImage,
            LOGO_IMAGE: this.logoImage,
            ALAMAT: this.alamat,
            NO_HP: this.no_hp,
            USERNAME: this.$store.getters.getUser.USERNAME 
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

        this.$http.post(this.$api + '/api/submitConfig', data, {
            headers: headers
        }).then((res) => {
            
            this.isLoading = false

            if(res.data.status == true) {
                this.$buefy.dialog.alert('Toko berhasil di update!')
            } else {
                this.$buefy.dialog.alert({
                    title: 'Error',
                    message: 'Terjadi kesalahan!'
                })            
            }
            
        })        

    },
    deleteDropFile(index) {
        this.dropFiles.splice(index, 1)
    },
    onSuccess(res) {
        this.fotoProduk.push(res)        
    },
    onError(err) {
    },
    onProcess() {
        // console.log(e)
        console.log('uploading...')
    },
    fetchData: function () {
        this.$http.get(this.$api + '/api/getDataConfig?user=' + this.namaToko)
        .then((res) => {
            this.namaToko = res.data.data.USERNAME
            this.no_hp = res.data.data.NO_HP
            this.alamat = res.data.data.ALAMAT
            this.coverImage = res.data.data.COVER_IMAGE
            this.logoImage = res.data.data.LOGO_IMAGE
        })
    }
  },
  created() {
      this.authenticationEndpoint = this.$api + '/Upload'
      this.namaToko = this.$store.getters.getUser.USERNAME
      this.fetchData()
  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }   
}
</script>
