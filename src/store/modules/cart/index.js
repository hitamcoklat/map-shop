import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default {
    state: {
        cartItem: [],
        total: 0
    },
    getters: {
        cartSize: (state) => {
            return state.cartItem.length;
        },
        getCart: (state) => {
            return state.cartItem;
        },
        cartTotalAmount: (state) => {
            return state.cart.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0);
        },
        toast: (state) => {
            return state.toast;
        }
    },
    mutations: {

        resetCart: (state) => {
            state.cartItem = []
            state.total = 0
        },
        
        setUpProducts: (state, productsPayload) => {
            //sets the state's  products property to the products array recieved as payload
            state.products = productsPayload;
        },
        addToCart: (state, itemProduct) => {
            console.log(itemProduct.nama_produk)
            let found = state.cartItem.find(product => product.id_produk == itemProduct.id_produk)
            if(found) {
                // found.quantity++
                found.quantity = itemProduct.quantity
                state.total = itemProduct.quantity * parseInt(itemProduct.harga)
            } else {
                state.cartItem.push(itemProduct)
                state.total = itemProduct.quantity * parseInt(itemProduct.harga)
                // new Vue(itemProduct, 'totalPrice', itemProduct.quantity * parseInt(itemProduct.harga));
            }
        },
        removeFromCart: (state, productId) => {
            //find the product in the products list
            let product = state.cartItem.find((product) => product.id_produk === productId);
            product.quantity--;
            state.total = product.quantity * parseInt(product.harga)
            if(product.quantity <= 0) {
                let cartProductIndex = state.cartItem.findIndex((product) => product.id_produk === productId);                
                state.cartItem.splice(cartProductIndex, 1);
            }
        },
        deleteFromCart: (state, productId) => {
            let cartProductIndex = state.cartItem.findIndex((product) => product.id_produk === productId);
            state.cartItem.splice(cartProductIndex, 1);
        },
        showToast: (state, toastText) => {
            state.toast.show = true;
            state.toast.text = toastText;
        },
        hideToast: (state) => {
            state.toast.show = false;
            state.toast.text = "";
        }
    },
    actions: {
        fetchProducts: ({ commit }) => {
            //simulating a fake ajax request to fetch products from database
            myApi.getProducts().then((products) => {
                //passing the products recieved from response as a payload to the mutation
                commit("setUpProducts", products);
                commit("showToast", "products loaded");
            });
        },
        addToCart: ({ commit }, productId) => {
            myApi.products("add", productId).then((productId) => {
                commit("addToCart", productId);
                commit("showToast", "added to cart");
            });
        },
        removeFromCart: ({ commit }, productId) => {
            myApi.products("remove", productId).then((productId) => {
                commit("removeFromCart", productId);
                commit("showToast", "removed from cart");
            });
        },
        deleteFromCart: ({ commit }, productId) => {
            myApi.products("delete", productId).then((productId) => {
                commit("deleteFromCart", productId);
                commit("showToast", "deleted from cart");
            });

        }
    }
};