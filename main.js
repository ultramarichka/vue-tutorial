Vue.component('product', {
  template: '<h1>I'm a single component element</h1>',
  /*<div class="product">
    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <h2>we have only {{ description }} in our stock.</h2>
      <p v-if="onSale > 10">In Stock</p>
      <p v-if="onSale <= 10 && onSale > 0">Almost sold out!</p>
      <p v-else>Out of stock</p>

      <p v-show="vShow">KUKUC :)</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <ul>
        <li v-for="size  in sizes">{{ size }}</li>
      </ul>

      <div v-for="(variant, index) in variants"
           :key="variant.variantId"
           class="color-box"
           :style="{ backgroundColor: variant.variantColor }"
           @mouseover="changeColor(index)"  >
      </div>
    </div>

    <br>
    <button v-on:click="removeItem"
            :disabled="!onSale"
            :class="{ disabledButton: !onSale }">Remove one from the Cart</button>
    <div class="cart">Cart({{ cart }})</div>

    <div :class="{ lineThrough: !onSale}">Line-through</div>

  </div>*/
  data() {
    return {
      brand: "MS Brand",
      product: 'Boots',
      description: "green",
      vShow: false,
      selectedVariant: 0,
      details: ['80% cotton', "20% poliester", "Gender -Male"],
      sizes: ["S", "M", "L"],
      variants: [
        { variantId: 1,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 10
        },
        { variantId: 2,
          variantColor: "blue",
          variantImage: "./assets/blue.jpeg",
          variantQuantity: 0
        }
      ],
      cart: 10
    }
  },
  methods: {
    removeItem(){ this.cart -= 1 },
    changeColor(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    onSale() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }

})

const app = new Vue({
  el: '#app',


  }


  /*created () {
    fetch('/myjson.json')
    .then(response => response.json())
    .then(json => {
      this.products = json.products
    })
  }*/

});
