<template>
  <v-container>
    <h1>This is Dialog</h1>
    <br />
    <br />
    <h4>Please enter text</h4>

    <v-text-field v-model="message" label="กรอกข้อความ" outlined dense class="mt-4"></v-text-field>

    <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="300" max-width="500"
      src="https://picsum.photos/id/11/500/300"></v-img>

    
    <v-btn color="success" class="mt-4" @click="openDialog">
      Click Here
    </v-btn>

    <div id="app">
  <v-app id="inspire">
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>
  
      <v-card-title>
        Top western road trips
      </v-card-title>
  
      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn
          color="orange lighten-2"
          text
        >
          Explore
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn color="success" class="mt-4" @click="openDialog">
      Click Here
    </v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-app>
</div>


    <!-- ใช้ Child Component -->
    <HelloDialog v-model="showDialog" :message="message" />
  </v-container>
</template>

<script>
import HelloDialog from "@/components/app/example/HelloDialog.vue";

export default {
  message: "ParentPage",
  components: { HelloDialog },

  data() {
    return {
      showDialog: false,
      message: "",
    };
  },

  methods: {
    openDialog() {
      this.showDialog = true;
    },
  },
  
};

</script>
