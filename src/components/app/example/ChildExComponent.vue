<template>
  <div class="child">
    <p>ข้อมูลจาก Parent: {{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>
