<template>
  <div class="row justify-content-center" style="margin: 0 auto;">
    <div 
      v-if="!updateId"
      class="col-2 mb-2 mr-0 d-flex justify-content-center align-items-center" 
      style="background-color:black; color: white;">
      <div class="col-10">
        <div v-show="!upvote" class="row mb-2">
          <button class="mx-auto trans-button" @click="vote('upvote')">
            <i class="fa fa-arrow-circle-o-up size-up" aria-hidden="true"></i>
          </button>
        </div>
        <div v-show="upvote" class="row mb-2">
          <button class="mx-auto trans-button" @click="vote('upvote')">
            <i class="fa fa-arrow-circle-o-up size-up pick" aria-hidden="true"></i>
          </button>
        </div>
        <div class="row mb-2">
          <p class="mx-auto my-auto">
            {{ showVotes }}
          </p>
        </div>
        <div v-show="downvote" class="row">
          <button class="mx-auto trans-button" @click="vote('downvote')">
            <i class="fa fa-arrow-circle-o-down size-up pick" aria-hidden="true"></i>
          </button>
        </div>
        <div v-show="!downvote" class="row">
          <button class="mx-auto trans-button" @click="vote('downvote')">
            <i class="fa fa-arrow-circle-o-down size-up" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-9 ml-0 pl-0" @click="viewQuestion">
      <div v-if="bindClass">
        <div :class="'card' + ' ' + bindClass">
          <div class="card-body">
            <h5 class="card-title">{{ information.title }}</h5>
            <div v-if="showTags" class="d-flex justify-content-center row">
              <div
                v-for="tag in showTags"
                :key="tag._id"
                class="mr-2 ">
                <button class="BW-button" @click.prevent.stop="filterByTag(tag)">{{tag.name}} 
                  <div v-if="isLogin">
                    <button v-if="!isBookmarked(tag.name)" class="WB-button" @click.prevent.stop="bookmark(tag)">
                      <i class="material-icons icon-middle">school</i>
                    </button>
                    <button v-if="isBookmarked(tag.name)" class="WW-button" @click.prevent.stop="bookmark(tag)">
                      <i class="material-icons icon-middle">school</i>
                    </button>
                  </div>
                </button>
              </div>
            </div>
            <p v-if="!updateId" class="card-text" v-html="information.description"></p>
          </div>
          <div v-if="deleteWarning">
            <p style="color:red;">
              Are you sure want to delete this {{type}} ?
            </p>
            <div class="pb-2" v-show="canEdit">
              <button class="simply-success" @click.prevent.stop="deleteWarning = false">
                <i class="fa fa-close"></i>
                No
              </button>
              <button class="simply-danger" @click.prevent.stop="deleteDocument()">
                <i class="fa fa-check" aria-hidden="true"></i>
                Yes
              </button>
            </div>
          </div>
          <div v-show="!deleteWarning">
            <div class="pb-2" v-if="canEdit">
              <button class="simply-success" @click.prevent.stop="showEditForm()">
                <i class="far fa-edit"></i>
                Edit
              </button>
              <button class="simply-danger" @click.prevent.stop="showDeleteWarning()">
                <i class="fa fa-trash" aria-hidden="true"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div :class="'card' + ' ' + bindClass">
          <div class="card-body">
            <h5 class="card-title">{{ information.title }}</h5>
            <p class="card-text" v-html="information.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import serverAPI from '@/api/serverAPI'

export default {
  name: `my-cards`,
  props:['information', 'bindClass', 'updateId', 'answer', 'type'],
  data () {
    return {
      canEdit: false,
      deleteWarning: false,
      showVotes: 0,
      upvote: '',
      downvote: ''
    }
  },
  mounted () {
    this.getScore()
    this.upvote = this.kindvote(this.information.upvotes)
    this.downvote = this.kindvote(this.information.downvotes)
    if(localStorage.getItem('id') && this.information.userId) {
      this.canEdit = localStorage.getItem('id').toString() === this.information.userId.toString()
    } else {
      this.canEdit = false
    }
  },
  computed: {
    ...mapState ([
      'isLogin', 'questions', 'watchTag'
    ]),
    showTags() {
      return this.information.tags
    }
  },
  watch: {
    isLogin (val) {
      if(localStorage.getItem('id') && this.information.userId) {
        this.canEdit = localStorage.getItem('id').toString() === this.information.userId.toString()
        this.upvote = this.kindvote(this.information.upvotes,'upvote')
        this.downvote = this.kindvote(this.information.downvotes,'downvote')
      } else {
        this.canEdit = false
        this.upvote = ''
        this.downvote = ''          
      }
    },
    'information.upvotes'(val) {
      this.getScore()
      this.upvote = this.kindvote(this.information.upvotes,'upvote')
      this.downvote = this.kindvote(this.information.downvotes,'downvote')
    },
    'information.downvotes'(val) {
      this.getScore()
      this.upvote = this.kindvote(this.information.upvotes,'upvote')
      this.downvote = this.kindvote(this.information.downvotes,'downvote')
    }
  },
  methods: {
    ...mapActions ([
      'deleteQuestion',
      'voteQuestion'
    ]),
    ...mapMutations ([
      'SET_WATCHTAG',
      'FILTER_QUESTIONS'
    ]),
    bookmark(tag) {
      let status = localStorage.getItem('watchTag')
      if(!status) {
        status = 'watch'
      } else if(status.indexOf(tag.name.toLowerCase()) !== -1) {
        status = 'unwatch'
      } else {
        status = 'watch'
      }
      serverAPI
        .put('/users/watchTag', {
          status: status,
          watchTag: tag.name
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
    },
    kindvote(votes,value) {
      if(votes && localStorage.getItem('id')) {
        return votes.filter(vote => vote.toString() === localStorage.getItem('id').toString()).length === 1 ? 'pick' : ''
      } else {
        ''
      }
    },
    getScore() {
      let upvotes = 0;
      let downvotes = 0;
      if(this.information.upvotes) {
        upvotes = this.information.upvotes.length
      }
      if(this.information.downvotes) {
        downvotes = this.information.downvotes.length
      }
      this.showVotes = upvotes - downvotes
    },
    filterByTag(tag) {
      this.FILTER_QUESTIONS(`[TAGS]${tag.name}`)
    },
    viewQuestion() {
      if(this.type === 'question') {
        this.$router.push(`/question/${this.information._id}`)
      }
    },
    showEditForm() {
      if(!this.answer) {
        this.$router.push(`/update/${this.information._id}`)
      } else {
        this.$emit('update-answer', this.information)
      }
    },
    showDeleteWarning() {
      this.deleteWarning = true
    },
    deleteDocument() {
      if(this.type === 'question') {
        this.deleteQuestion(this.information)
      } else {
        serverAPI
          .delete(`/answers/${this.information._id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            this.successSWAL(data.message)
            this.$emit('remove-answer', this.information)
          })
          .catch(({ response }) => {
            this.failSWAL(response.data.message)
          })
      }
    },
    isBookmarked(tag) {
      let checkTag = localStorage.getItem('watchTag')
      if(this.watchTag) {
        checkTag = this.watchTag
      }
      if(checkTag.length > 1) {
        return checkTag.split(',').includes(tag.toLowerCase())
      } else {
        return false
      }
    },
    vote(vote) {
      let voteInfomation = {
        _id: this.information._id,
        type: vote
      }
      if(this.type === 'question') {
        this.voteQuestion(voteInfomation)
          .then(question => {
            this.$emit('vote-question', question)
          })
      } else if(this.type ==='answer') {
        serverAPI
          .put(`/answers/votes/${this.information._id}`, {
            vote: vote
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            // SWAL.successSWAL(data.message)
            this.$emit('vote-answer', data.answer)
          })
          .catch(({ response }) => {
            this.failSWAL(response.data.message)
          })
      }
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

.W-font {
  color: white !important;
}

.trans-button {
  background: transparent;
  border-color: transparent;
  color: white !important;
}

.size-up {
  font-size: 20px;
}

.size-up:hover {
  color: darkcyan;
}

.pick {
  color: darkcyan;
}

.pick:hover {
  color: white
}

.simply-success {
  margin-right: 4px;
  background-color: transparent;
  border-color: transparent;
  color: darkcyan;
}

.simply-success:hover {
  color: darkblue !important;
}

.simply-danger {
  margin-right: 4px;
  background-color: transparent;
  border-color: transparent;
  color: orange;
}

.simply-danger:hover {
  color: red;
}

.icon-middle {
  vertical-align: middle;
}

</style>
