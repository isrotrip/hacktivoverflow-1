<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div :class="updateId ? 'col-5' : 'col-12'">
          <div v-if="filterQuestions.length > 0">
            <cards
              v-for="(information, index) in questions"
              :key="index"
              :bind-class="'show-detail mb-2 black-white-button'"
              :information="information"
              :type="'question'"
              :update-id="updateId"
              @vote-question="updateQuestion($event)"/>
          </div>
          <div v-if="filterQuestions.length === 0">
            <cards
              :information="noQuestion"/>
          </div>
        </div>
        <div :class="updateId ? 'col-7' : ''">
          <router-view
            @change-update="updateId = true"
            @change-edit-false="updateId = false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import serverAPI from '@/api/serverAPI'
import Cards from '@/components/cards'

export default {
  name: 'home',
  components: {
    Cards
  },
  data() {
    return {
      questions: [],
      noQuestion: {
        title: 'No question yet',
        description: '<p>Feel free to ask</p>'
      },
      updateId: false
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'filterQuestions'
    ]),
    sortingQuestion() {
      return this.filterQuestions.sort((questionA, questionB) => {
        let upvotesA = 0
        let downvotesA = 0
        let upvotesB = 0
        let downvotesB = 0
        if(questionA.upvotes) {
          upvotesA = question.upvotes.length
        }
        if(questionA.downvotes) {
          downvotesA = question.downvotes.length
        }
        if(questionB.upvotes) {
          upvotesB = question.upvotes.length
        }
        if(questionB.downvotes) {
          downvotesB = question.downvotes.length
        }
        return questionA > questionB
      })
    }
  },
  watch: {
    '$route'(val) {
      if(val.path === '/' || ''){
        this.updateId = false
      }
    },
    filterQuestions() {
      this.questions = this.filterQuestions
    }
  },
  created() {
    if(!this.filterQuestions.length) {
      this.getQuestions()
    } else {
      this.questions = this.filterQuestions
    }
  },
  methods: {
    ...mapActions([
      'getQuestions'
    ]),
    updateQuestion(question){
      for(let i = 0; i < this.questions.length; i++) {
        if(this.questions[i]._id.toString() === question._id.toString()){
          this.questions.splice(i, 1, question)
        }
      }
    }
  }
}
</script>

<style>

.show-detail {
  cursor: pointer;
}

.show-detail:hover {
  background-color: skyblue;
}

</style>

