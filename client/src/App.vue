<template>
  <body>
    <div class="flex flex-col h-screen">
      <router-view></router-view>
      <div class="fixed inset-x-0 bottom-0">
        <div class="float-left text-gray-100 transform hover:-translate-y-2 duration-150">
          <router-link to="/">
            <svg class="svg_shadow mb-10 ml-10 h-20 w-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.svg_shadow {
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.4));
}
</style>