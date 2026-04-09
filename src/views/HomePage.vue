<template>
  <HelloWorld/>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';

export default {
  data() {
    return {
      namePage: this.$route.name,
      routePage: this.$route.path,

    };
  }, //data

  components: {
    HelloWorld,
  },

  created() {},
  async mounted() { },
  computed: {},

  methods: {

  },
};
</script>
