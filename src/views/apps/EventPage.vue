<template>
  <v-card elevation="2" class="my-5 mx-10">
  <!-- <v-container fluid fill-height> -->
    <pre>
      a = {{ a }}, b = {{ b }}, sum = {{ sum }}
    </pre>
    <form @submit.prevent="submit" >
    <!--  -->
      <v-text-field 
      label="a" 
      v-model.number="a" 
      maxlength="7" 
      @input="print('a',a)" 
      counter 
      outlined
      ></v-text-field>

      <v-text-field 
      label="b" 
      v-model.number="b" 
      maxlength="7"  
      @input="print('b',b)" 
      counter outlined
      ></v-text-field>
    <!-- -->

    </form>
    </v-card> 
  <!-- </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      namePage: this.$route.name,
      routePage: this.$route.path,

      a: null,
      b:null,

    }
  }, //data

  mounted() { },
  computed: {
    sum(){
      return this.a+this.b;
    },
  },

  methods: {
    print(label, value){
      console.log(`${ label } ==> `,value)
    }
  },
};
</script>