<template>
  <div>
    <create-update-component
      :status="'update'"
      :question-populate="question"
      @action-update="updateForm($event)"/>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import serverAPI from '@/api/serverAPI'
import CreateUpdateComponent from '@/components/create-update-component.vue'

export default {
  name: 'create',
  data() {
    return {
      question: {}
    }
  },
  components: {
    CreateUpdateComponent
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route.params.id'(val) {
      this.fetchData()
    }
  },
  methods: {
    ...mapActions([
      'updateQuestion'
    ]),
    updateForm(question) {
      this.updateQuestion(question)
        .then(() => {
          this.$emit('change-update-false', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchData() {
      serverAPI
        .get(`/questions/update/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.$emit('change-update', data._id)
          this.question = data.question
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
          this.$router.push('/')
        })
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

.black-white-button-success:hover {
  background-color: black !important;
  color: white !important;
  border-color: green !important;
}

.black-white-button-danger:hover {
  background-color: black !important;
  color: white !important;
  border-color: red !important;
}

</style>

