import Vue from 'vue'
import Vuex from 'vuex'
import serverAPI from '@/api/serverAPI'
import Swal from 'sweetalert2'
import router from './router';

const SWAL = {
  successSWAL (title) {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'animate fadeInUp'
      }
    })
  },
  failSWAL (title) {
    Swal.fire({
      position: 'top-end',
      type: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'animate fadeInUp'
      }
    })
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    filterQuestions: [],
    watchTag: ''
  },
  mutations: {
    CHANGE_LOGIN_STATE(state) {
      state.isLogin = !state.isLogin
      if(!state.isLogin) {
        localStorage.clear()
      }
    },
    SET_QUESTIONS(state, questions) {
      state.questions = questions
      state.filterQuestions = questions
    },
    ADD_QUESTION(state, question) {
      state.questions.push(question)
      state.filterQuestions.push(question)
    },
    REMOVE_QUESTION(state, removeQuestion) {
      state.questions = state.questions
        .filter(question => question._id.toString() !== removeQuestion._id.toString())
      state.filterQuestions = state.filterQuestions
        .filter(question => question._id.toString() !== removeQuestion._id.toString())
    },
    REPLACE_QUESTION(state, updateQuestion){
      for(let i = 0; i < state.questions.length; i++) {
        if(state.questions[i]._id.toString() === updateQuestion._id.toString()) {
          state.questions[i] = updateQuestion
          break
        }
      }
      for(let i = 0; i < state.filterQuestions.length; i++) {
        if(state.filterQuestions[i]._id.toString() === updateQuestion._id.toString()) {
          state.filterQuestions[i] = updateQuestion
          break
        }
      }
    },
    FILTER_QUESTIONS(state, title) {
      if(title.indexOf('[TAGS]') === 0) {
        title = title.slice(6)
        state.filterQuestions = []
        for(let i = 0; i < state.questions.length; i++) {
          for(let j = 0; j < state.questions[i].tags.length; j++){
            if(state.questions[i].tags[j].name.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
              state.filterQuestions.push(state.questions[i])
              break;
            }
          }
        }
      } else {
        state.filterQuestions = state.questions
          .filter(question => question.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
      }
      router.push('/')
    },
    SET_WATCHTAG(state, watchtag) {
      state.watchTag = watchtag
    }
  },
  actions: {
    verify({ commit }) {
      serverAPI
        .get('/users/verify', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          if(data.watchTag) {
            commit('SET_WATCHTAG', data.watchTag.join(','))
          }
          SWAL.successSWAL(data.message)
          commit('CHANGE_LOGIN_STATE')
        })
        .catch(({ response }) => {
          localStorage.clear()
          SWAL.successSWAL(response.data.message)
        })
    },
    getQuestions({ commit }) {
      serverAPI
        .get('/questions')
        .then(({ data }) => {
          commit('SET_QUESTIONS', data.questions)
        })
        .catch(({ response }) => {
          SWAL.failSWAL(response.data.message)
        })
    },
    createQuestions({ commit }, question) {
      serverAPI
        .post('/questions', question, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          SWAL.successSWAL(data.message)
          commit('ADD_QUESTION', data.question)
          router.push('/')
        })
        .catch(({ response }) => {
          SWAL.failSWAL(response.data.message)
        })
    },
    deleteQuestion({ commit }, question) {
      return serverAPI
        .delete(`/questions/${question._id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          SWAL.successSWAL(data.message)
          commit('REMOVE_QUESTION', data.question)
          router.push('/')
        })
        .catch(({ response }) => {
          SWAL.failSWAL(response.data.message)
        })
    },
    updateQuestion({ commit }, question) {
      return serverAPI
        .put(`/questions/${question._id}`, question, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          SWAL.successSWAL(data.message)
          commit('REPLACE_QUESTION', data.question)
          router.push(`/question/${data.question._id}`)
        })
        .catch(({ response }) => {
          SWAL.failSWAL(response.data.message)
        })
    },
    voteQuestion({ commit }, voteInfo) {
      return new Promise ((resolve, reject) => {
        serverAPI
          .put(`/questions/votes/${voteInfo._id}`, {
            vote: voteInfo.type
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            // SWAL.successSWAL(data.message)
            commit('REPLACE_QUESTION', data.question)
            resolve(data.question)
          })
          .catch(({ response }) => {
            SWAL.failSWAL(response.data.message)
            reject(false)
          })
      }) 
    }
  }
})
