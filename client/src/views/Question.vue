<template>
  <div>
    <div class="container">
      <cards
        :bind-class="'show-detail mb-2 black-white-button'"
        :information="question"
        :key="question._id"
        :type="'question'"
        @vote-question="updateQuestion($event)"/>
      <create-update-component
        :status="'answer'"
        :clear-form="clearForm"
        @action-answer="createAnswer($event)"
        @clear-success="clearForm = false"/>
      <cards
        v-for="answer in answers"
        :bind-class="'mb-2 black-white-button'"
        :information="answer"
        :key="answer._id"
        :answer="true"
        :type="'answer'"
        @update-answer="showModalUpdate($event)"
        @remove-answer="removeAnswer($event)"
        @vote-answer="updateAnswer($event)"
        />
      <edit-answer
        :update-answer-populate="updateAnswerPopulate"
        @update-answer="updateAnswer($event)"/>
    </div>
  </div>
</template>

<script>

import Cards from '@/components/cards.vue'
import serverAPI from '@/api/serverAPI'
import CreateUpdateComponent from '@/components/create-update-component.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CreateUpdateComponent
  },
  data () {
    return {
      question: {},
      answers: [],
      clearForm: false,
      updateAnswerPopulate: {}
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  components: {
    CreateUpdateComponent
  },
  beforeCreate(){
    this.$options.components.Cards = require('@/components/cards.vue').default
    this.$options.components.EditAnswer = require('@/components/modal/edit-answer.vue').default
  },
  created () {
    this.fetchData(this.$route.params.id)
  },
  methods: {
    fetchData() {
      serverAPI
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data.question
          return serverAPI
            .get(`/answers/${this.$route.params.id}`)
        })
        .then(({ data }) => {
          this.answers = data.answers
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
          this.$router.push('/')
        })
    },
    createAnswer(answer) {
      serverAPI
        .post('/answers', {
          title: answer.title,
          description: answer.description,
          questionId: this.$route.params.id
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.clearForm = true
          this.successSWAL(data.message)
          this.answers.push(data.answer)
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
        })
    },
    updateAnswer(answer) {
      for(let i = 0; i < this.answers.length; i++) {
        if(this.answers[i]._id.toString() === answer._id.toString()) {
          this.answers[i] = answer
          break;
        }
      }
      this.updateAnswerPopulate = {}
    },
    removeAnswer(removeAnswer) {
      this.answers = this.answers
        .filter(answer => answer._id.toString() !== removeAnswer._id.toString())
    },
    showModalUpdate(answer) {
      this.updateAnswerPopulate = answer
      $('#update-answer').modal('toggle')
    },
    updateQuestion(question) {
      this.question = question
    },
    updateAnswer(answer) {
      for(let i = 0; i < this.answers.length; i++) {
        if(this.answers[i]._id.toString() === answer._id.toString()){
          this.answers.splice(i, 1, answer)
        }
      }
    }
  }
}
</script>
