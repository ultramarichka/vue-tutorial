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
  </ul>  `
})

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following errors:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <div>
      <p>Would you recommend this product?</p>
      <input type="radio" value="yes" v-model="recommend">
      <label for="yes"> Yes</label>
      <input type="radio" value="no" v-model="recommend">
      <label for="no"> No</label>
    </div>

    <p>
      <input type="submit" value="Submit">
    </p>

  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating && this.recommend){
        let onSubmitObject = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted', onSubmitObject)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if(!this.name) this.errors.push("Name required")
        if(!this.review) this.errors.push("Review required")
        if(!this.rating) this.errors.push("Rating required")
        if(!this.recommend) this.errors.push("Reccomendation required")
      }
    }
  }
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

      <product-review @review-submitted="AddReview"></product-review>

      <div>
        <h2>Reviews</h2>
        <p>There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
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
      ],
      reviews: []
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
    },
    AddReview(reviewObj) {
      this.reviews.push(reviewObj)
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
