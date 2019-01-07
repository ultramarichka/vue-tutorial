Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <ul>
    <li v-for="detail  in details">{{ detail }}</li>
  </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <h2>we have only {{ description }} in our stock.</h2>
        <p v-if="onSale > 10">In Stock</p>
        <p v-if="onSale <= 10 && onSale > 0">Almost sold out!</p>
        <p v-else>Out of stock</p>

        <p>Shipping: {{ shipping }}</p>

        <p v-show="vShow">KUKUC :)</p>

        <product-details :details="details"></product-details>

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

      <button v-on:click="addItem"
              :disabled="!onSale"
              :class="{ disabledButton: !onSale }">Add to Cart</button>

      <div :class="{ lineThrough: !onSale}">Line-through</div>
    </div>
  `,
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
        { variantId: 198437,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 10
        },
        { variantId: 2928457,
          variantColor: "blue",
          variantImage: "./assets/blue.jpeg",
          variantQuantity: 0
        }
      ]
    }
  },
  methods: {
    removeItem(){
      this.$emit('remove-from-cart');
    },
    addItem() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
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
    },
    shipping() {
      if(this.premium) {
        return "Free"
      } else {
        return "2.99"
      }
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart() {
      this.cart.pop();
    },
    AddItemToCartInstanse(id) {
      this.cart.push(id);
    }
  }
  /*created () {
    fetch('/myjson.json')
    .then(response => response.json())
    .then(json => {
      this.products = json.products
    })
  }*/

});
