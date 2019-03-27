<template>
  <div>
    <nav v-show="toggleTag" class="navbar navbar-expand-lg navbar-dark bg-dark tag-bar background-card">
      <!-- search tag  -->
      <form
        autocomplete="off"
        class="form-inline my-2 mr-3 my-lg-0"
        @submit.prevent.stop="FILTER_QUESTIONS(`[TAGS]${findTags}`)">
        <div class="input-group-append">
          <div class="autocomplete auto-filler md-form my-0">
            <input
              id="search-tags"
              class="form-control mr-sm-2"
              type="text" placeholder="Search Tags..."
              aria-label="Search" name="searchQuestions"
              v-model="findTags">
            <button
              class="btn btn-outline-success my-2 my-sm-0 white-black-button"
              type="submit"><i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <!-- pick tag -->
      <div v-if="tags" class="d-flex justify-content-center row">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="mr-2 ">
          <button class="BW-button" @click.prevent.stop="filterByTag(tag)">{{tag}} 
            <div v-if="isLogin">
              <button v-if="!isBookmarked(tag)" class="WB-button" @click.prevent.stop="bookmark(tag)">
                <i class="material-icons icon-middle">school</i>
              </button>
              <button v-if="isBookmarked(tag)" class="WW-button" @click.prevent.stop="bookmark(tag)">
                <i class="material-icons icon-middle">school</i>
              </button>
            </div>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import serverAPI from '@/api/serverAPI'


export default {
  props: ['toggleTag'],  
  data() {
    return {
      findTags: '',
      tags: []
    }
  },
  computed: {
    ...mapState ([
      'isLogin', 'questions', 'watchTag'
    ]),
  },
  mounted() {
    let watchTag = []
    if(localStorage.getItem('watchTag')){
      watchTag = localStorage.getItem('watchTag').split(',')
    }
    watchTag.unshift('my own')
    this.tags = watchTag
  },
  methods: {
    ...mapMutations([
      'SET_WATCHTAG',
      'FILTER_QUESTIONS'
    ]),
    filterByTag(tag) {
      this.FILTER_QUESTIONS(`[TAGS]${tag}`)
    },
    isBookmarked(tag) {
      let checkTag = localStorage.getItem('watchTag')
        console.log(checkTag)
      if(this.watchTag) {
        checkTag = this.watchTag
      }
      if(checkTag.length > 1) {
        return checkTag.split(',').includes(tag.toLowerCase())
      } else {
        return false
      }
    },
    bookmark(tag) {
      let status = localStorage.getItem('watchTag')
      if(!status) {
        status = 'watch'
      } else if(status.indexOf(tag.toLowerCase()) !== -1) {
        status = 'unwatch'
      } else {
        status = 'watch'
      }
      serverAPI
        .put('/users/watchTag', {
          status: status,
          watchTag: tag
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.successSWAL(data.message)
          let watchtag = data.userLogin.watchTag ? data.userLogin.watchTag.join(',') : ''
          localStorage.setItem('watchTag', watchtag)
          this.SET_WATCHTAG(watchtag)
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
        })
    }
  }
}
</script>

<style>

.BW-button{
  background-color: black !important;
  color: white !important;
  border-radius: 5px;
}

.BW-button:hover {
  background-color: white !important;
  color: black !important;
  border-color: black
}

.WB-button{
  background-color: transparent !important;
  border-color: transparent;
  border-radius: 100%;
  color: orange !important;
}

.WB-button:hover {
  color: seagreen !important;
}

.WW-button{
  background-color: transparent !important;
  border-color: transparent;
  border-radius: 100%;
  color: seagreen !important;
}

.WW-button:hover {
  color: orange !important;
}

</style>
