<template>
  <main
    class="grid place-items-center p-5"
    style="background: linear-gradient(to right, #141e30, #243b55); background-attachment: fixed;">
    <section>
    <router-view></router-view>
      <div class="mt-6 sm:mt-12 lg:mt-24 bg-white border border-gray-200 shadow-2xl rounded-lg p-3 bg-opacity-60 max-w-2xl sm:w-screen sm:min-w-full">
        <div class="group relative px-6 pb-4">
          <div class="inset-0 flex justify-center">
            <div class="text-gray-900 pb-2 pt-3 border-b border-gray-200">
              <input class="appearance-none bg-transparent border-none outline-none placeholder-gray-600" type="text" placeholder="Search song by title" v-model="songSearchString" />
            </div>
          </div>
          <div class="inset-0 flex justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap overflow-hidden min-h-screen">
              <div class="transform hover:-translate-y-1 duration-150 m-5" v-for="song in filteredSongFeed" v-bind:key="song._id">
                <router-link :to="'/play/'+song._id">
                  <img class="rounded" v-bind:src="song.cover_art" />
                  <span class="text-gray-900">{{ song.title }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>




<script>
export default {
  data() {
    return {
      name: "create",
      songSearchString: "",
      songFeed: null
    }
  },
	mounted() {
		fetch('http://localhost:9000/api/getTotalSongs')
      .then(response => response.json())
      .then(response => {
        this.songFeed = response;
      })
			.catch(error => console.log(error))
	},
	 computed: {
        filteredSongFeed: function () {
            var songs = this.songFeed;
            var songSearchString = this.songSearchString.toLowerCase();
            if(!songSearchString){
                return songs;
            }

            songs = songs.filter(function(item){
                if(item.title.toLowerCase().indexOf(songSearchString) !== -1){
                    return item;
                }
            })
            return songs;
        }
	 }
};
</script>
