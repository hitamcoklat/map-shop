<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-field label="Nama Produk">
            <b-input 
                icon-pack="fas"
                icon="cookie-bite"
                v-model="form.nama_produk" 
                placeholder="Nama Produk..."></b-input>
        </b-field>
        <b-field label="Kategori Produk">
            <b-select
                placeholder="Pilih Kategori"
                icon="globe"
                icon-pack="fas"
                v-model="form.id_kategori"
                expanded>
                <option v-for="(item, index) in dataCategory" :key="index" :ref="index" :value="item.ID">{{item.NAMA_KATEGORI}}</option>
            </b-select>
        </b-field>        
        <b-field label="Harga Asli">
            <b-input
                icon-pack="fas"
                icon="tags"             
                type="number" 
                v-model="form.harga" 
                placeholder="Masukan harga"></b-input>
        </b-field>
        <b-field label="Harga Coret">
            <b-input
                icon-pack="fas"
                icon="tags"             
                type="number" 
                v-model="form.hargaCoret"
                placeholder="Masukan harga coret jika ada"></b-input>
                Masukan harga coret jika ada.
        </b-field>
        <b-field label="Deskripsi">
            <b-input v-model="form.caption" type="textarea"></b-input>
        </b-field>
        <b-field label="Berat (gram)">
            <b-input
                icon-pack="fas"
                icon="balance-scale-right"             
                type="number" 
                v-model="form.berat" 
                placeholder="Masukan berat produk"></b-input>
        </b-field>        
        <div v-if="fotoProduk.length > 0">
            <b-field label="Foto Produk">
            </b-field> 
            <div style="display: flex; flex-direction: row; margin-bottom: 1em;">
                <figure v-for="(item, index) in fotoProduk" :key="index" :ref="index" style="margin-right: 1px;" class="image is-64x64" v-on:click="hapusImage(index)">
                    <img :alt="item.thumb" v-bind:src="item.thumb">
                </figure>
            </div>
        </div>
        
        <div style="margin-bottom: 1em;" class="file">
            <label class="file-label">
                <input class="file-input" accept="image/x-png,image/gif,image/jpeg" type="file" ref="imageFile" @change="handleUpload">
                <span class="file-cta">
                    <span class="file-icon">
                        <font-awesome-icon icon="upload" />
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                </span>
            </label>
        </div>        
        <div style="margin-top: 1em;" class="buttons">
            <b-button v-on:click="submitProduk" type="is-primary" expanded>
                <span v-if="isUpdate">Edit Produk</span>
                <span v-else>Buat Produk</span>
            </b-button>
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
  name: 'InputProduk',
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
    fotoProduk: [],
    isLoading: false,
    isUpdate: false,
    idProdukEdit: "",
    dataCategory: []
  }),
  methods: {

    handleUpload: function () {

        this.isLoading = true;

        var imagekit = new ImageKit({
            publicKey : this.publicKey,
            urlEndpoint : this.urlEndpoint,
            authenticationEndpoint : this.authenticationEndpoint
        });

        imagekit.upload({
            file : this.$refs.imageFile.files[0],
            fileName : "igtoko.jpg",
            tags : [this.$store.getters.getUser.USERNAME]
        }, (err, result) => {
            this.isLoading = false;
            let dataImage = {
                thumb: result.thumbnailUrl,
                img: result.url,
                fileId: result.fileId
            }
            this.fotoProduk.push(dataImage)
        })        

    },

    fetchDataCategory: function(username) {
        this.$http.get(this.$api + '/category/readCategory?u=' + username)
            .then((res) => {
                if(res.data.status == true) {
                    this.dataCategory = res.data.data;
                }
            })           
    },    

    submitProduk: function() {

        this.isLoading = true;

        let data = {
            IMAGES: this.fotoProduk,
            NAMA_PRODUK: this.form.nama_produk,
            HARGA: this.form.harga,
            ID_KATEGORI: this.form.id_kategori,
            HARGA_CORET: this.form.hargaCoret,
            CAPTION: this.form.caption,
            BERAT: this.form.berat,
            USERNAME: this.$store.getters.getUser.USERNAME,
            EMAIL: this.$store.getters.getUser.EMAIL,
            TOKEN: this.$store.getters.getUser.TOKEN,
            UPDATE: this.isUpdate
        }

        if(this.isUpdate) {
            data['ID'] = this.idProdukEdit
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

        this.$http.post(this.$api + '/api/submitProduk', data, {
            headers: headers
        }).then((res) => {
            if(res.data.status == true) {
                this.form = {
                    nama_produk: '',
                    harga: '',
                    hargaCoret: '',
                    id_kategori: '',
                    caption: '',
                    berat: ''
                };
                this.fotoProduk = []
                this.isLoading = false;
                this.$buefy.dialog.alert('Produk berhasil ditambahkan!')
            } else {
                alert('Terjadi kesalahan!')
            }
        })        

    },
    hapusImage: function(id) {
        const index = this.fotoProduk.indexOf(id);
        this.$buefy.dialog.confirm({
            message: 'Apakah anda yakin ingin menghapus foto ini?',
            onConfirm: () => {
                if(typeof this.fotoProduk[id].fileId !== 'undefined') {
                    this.$http.get(this.$api + '/upload/deleteImage?q=' + this.fotoProduk[id].fileId)
                        .then((res) => {
                        })                      
                }              
                this.fotoProduk.splice(index)
                this.$buefy.toast.open({
                    message: `Foto berhasil dihapus`,
                    position: 'is-bottom',
                    type: 'is-success'
                })  
            }
        })      
    },
    fetchDataProduk: function(id) {

        let u = this.$store.getters.getUser.USERNAME;
        
        this.$http.get(this.$api + '/api/getProdukById?id=' + id + '&u=' + u)
            .then((res) => {
                this.form = {
                    nama_produk: res.data.data.NAMA_PRODUK,
                    berat: res.data.data.BERAT,
                    caption: res.data.data.CAPTION,
                    harga: res.data.data.HARGA,
                    id_kategori: res.data.data.ID_KATEGORI,
                    hargaCoret: res.data.data.HARGA_CORET
                }
                this.fotoProduk = res.data.data.IMAGES;
            })

    },
    deleteDropFile(index) {
        this.dropFiles.splice(index, 1)
    },
    onSuccess(res) {
        this.fotoProduk.push(res)        
    },
    onError(err) {
        console.log(err)
    },
    onProcess() {
        // console.log(e)
        console.log('uploading...')
    }
  },
  created() {
      if(typeof this.$route.params.id == 'undefined' || typeof this.$route.params.id == null) {
          this.isUpdate = false
          console.log('Input Produk')
      } else {
          this.isUpdate = true
          this.idProdukEdit = this.$route.params.id
          this.fetchDataProduk(this.idProdukEdit)
          console.log('Edit Produk')
      }
      this.fetchDataCategory(this.$store.getters.getUser.USERNAME)
      this.authenticationEndpoint = this.$api + '/Upload'
  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }   
}
</script>
