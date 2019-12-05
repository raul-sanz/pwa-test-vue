<template>
  <q-page class="flex justify-center ">
    <div class="q-pa-md">
      <q-card class="q-mb-md">
        <q-card-section class="flex justify-center">
          <q-btn color="primary" label="add new product" dense icon="add_circle" @click="create = true" />
        </q-card-section>
      </q-card>
      
      <q-markup-table class="full-width">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Description</th>
            <th class="text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td class="text-left">{{product.name}}</td>
            <td class="text-left">{{product.price}}</td>
            <td class="text-left">{{product.description}}</td>
            <td class="text-left">
               <q-btn-group>
                <q-btn color="red" dense icon="remove_circle" @click="removeProduct(index)"/>
                <q-btn color="secondary" dense icon="edit" @click="editPro(index, product)" />
              </q-btn-group>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <q-dialog v-model="create" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter data for new product</div>
        </q-card-section>

        <q-card-section>
          <q-input class="q-mt-sm" label="Name" outlined dense v-model="newProduct.name" autofocus />
          <q-input class="q-mt-sm" label="Price" outlined dense v-model="newProduct.price"  />
          <q-input class="q-mt-sm" label="Description" outlined dense v-model="newProduct.description"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn flat label="Create" color="green" v-close-popup @click="createProduct(newProduct)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter data for new product</div>
        </q-card-section>

        <q-card-section>
          <q-input class="q-mt-sm" label="Name" outlined dense v-model="forUpdate.item.name" autofocus />
          <q-input class="q-mt-sm" label="Price" outlined dense v-model="forUpdate.item.price"  />
          <q-input class="q-mt-sm" label="Description" outlined dense v-model="forUpdate.item.description"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn flat label="Save" color="green" v-close-popup @click="updateProduct(forUpdate)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: 'PageIndex',
  data() {
    return {
      edit:false,
      create:false,
      forUpdate:{
        index:0,
        item:{
          'name':'',
          'description':'',
          'price':0
        },
      },
      newProduct:{}
    }
  },
  computed: {
    ...mapState('data',['products'])
  },
  mounted() {
    console.log(this.products)
  },
  methods: {
    ...mapMutations('data',['createProduct','deleteProduct','updateProduct']),
    removeProduct(index){
       this.$q.dialog({
        title: 'Confirm',
        message: 'Be sure to remove this product?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log(index)
        this.deleteProduct(index)
      })
      
    },
    editPro(index,item){
      this.forUpdate = {
        index,
        item:{...item}
      }
      console.log(this.forUpdate)
      this.edit = true
    }
  },

}
</script>
