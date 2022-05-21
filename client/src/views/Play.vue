<template>
  <main>
    <error v-bind:errorcode="errorCode" v-if="errorCode">
    </error>
    <section
    class="grid place-items-center min-h-screen p-5"
    v-show="title"
    :style="
      'background-image: url(' +
        bg +
        '); background-position: center;background-repeat: no-repeat;background-size: cover;'
    "
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          class="bg-white border border-gray-200 shadow-2xl rounded-lg p-3 bg-opacity-60"
          style="backdrop-filter: blur(20px);"
        >
          <div class="group relative">
            <img
              class="w-screen md:w-72 pt-4 px-4 pb-2"
              :src="cover"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <button
                @click="play"
                class="text-gray-100 w-20 h-20 transform hover:scale-110 duration-150"
                style="outline: none;"
              >
                <svg
                  v-if="isTimerPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-5 -mt-4 w-full" ref="progress">
            <h3 class="text-gray-600 font-bold text-lg">{{ artist }}</h3>
            <p class="text-gray-500">{{ title }}</p>
            <div class="shadow-sm h-1.5 w-full bg-gray-300 inline-block rounded-md">
              <div class="bg-gray-400 rounded-md h-full" :style="{ width: barWidth }"></div>
            </div>
            <div class="text-gray-400 font-semibold text-sm">{{ currentTime }} / {{ duration }}</div>
          </div>
        </div>

        <div
          class="bg-gray-900 border border-gray-200 shadow-2xl rounded-lg p-3 bg-opacity-60"
          style="backdrop-filter: blur(20px);"
        >
          <div class="p-5">
            <div>
              <h3 class="text-white text-lg inline">Lyrics</h3>
            </div>
            <small class="text-gray-400">Last Updated {{ last_updated }}</small>
            <div
              class="text-gray-200 text-md pt-4 overflow-clip overflow-hidden h-72"
              style="max-width:14rem; -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0));"
              id="text"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import error from '@/components/error.vue';

export default {
  components: {
    error
  },
  data() {
    return {
      lyrics: {},
      artist: null,
      title: null,
      bg: null,
      last_updated: null,
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aihiK1bzHiB9UJ2HDTUBYj_S4lLf8Rw5NA&usqp=CAU",
      source: null,
      errorCode: null,
    };
  },
  async mounted() {
    await this.getSongInfo();
    let vm = this;
    this.audio = new Audio();
    this.audio.src = await this.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
      let i = Math.round(vm.audio.currentTime);
      if (vm.lyrics[i] && !document.getElementById(i)) {
        let tree = document.createDocumentFragment();
        let lyricline = document.createElement("p");
        lyricline.setAttribute("id", i);
        lyricline.setAttribute("class", "font-bold pb-2");
        lyricline.appendChild(document.createTextNode(vm.lyrics[i]));
        tree.appendChild(lyricline);
        document.getElementById("text").prepend(tree);
        document
          .getElementById("text")
          .children[1].setAttribute("class", "opacity-50");
      }
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };
  },
  methods: {
    async getSongInfo() {
      const res = await fetch(
        `http://localhost:9000/api/getDataFromSongId/${this.$route.params.song_id}`
      );
      if (res.status !== 200) {
        this.errorCode = res.status;
        return;
      }
      const data = await res.json();
      this.lyrics = data[0].lyrics;
      this.artist = data[0].artist;
      this.title = data[0].title;
      this.bg = data[0].bg_img;
      this.cover = data[0].cover_art;
      this.source = data[0].src;
      this.last_updated = new Date(
        data[0].date_updated * 1000
      ).toLocaleDateString("en-US");
    },
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    }
  }
};
</script>