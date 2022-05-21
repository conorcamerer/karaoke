<template>
<main>
  <div class="flex select-none h-screen w-screen bg-gray-800 justify-center content-center flex-wrap flex-col">
    <center class="font-sans text-gray-100 text-8xl">Error {{ errorcode }}</center>
    <center class="inset-0 font-sans text-gray-300 text-md mt-2" id="description"></center>
  </div>
</main>
</template>

<script>
export default {
  props: {
    errorcode: {
      type: Number
    },
  },
  mounted() {
    if (this.errorcode == 400) {
      document.getElementById("description").textContent="Bad Request";
    } else if (this.errorcode == 404) {
      document.getElementById("description").textContent="Not Found";
    } else if (this.errorcode == 500) {
      document.getElementById("description").textContent="Internal Server Error";
    }
  }
};
</script>