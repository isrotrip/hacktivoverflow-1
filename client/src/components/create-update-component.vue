<template>
  <div class="create">
    <div class="container mx-auto" style="text-align: left">
      <form @submit.prevent="createQuestion">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="inputGroup-sizing-default">
              <i class="fa fa-bookmark-o fa-fw" aria-hidden="true"></i>
              Title
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="title">
        </div>
        <div v-if="status !== 'update answer'">
          <div class="input-group mb-3" v-if="status !== 'answer'">
            <div class="input-group-prepend">
              <span
                class="input-group-text"
                id="inputGroup-sizing-default">
                <i class="fa fa-hashtag  fa-fw" aria-hidden="true"></i>
                Tags
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              v-model="tags"
              placeholder="ex: JS,Mongo DB,Google...">
          </div>
        </div>
        <ckeditor
          :editor="editor"
          v-model="description">
        </ckeditor>
        <div class="d-flex align-items-end flex-column mt-2 mb-2">
          <div>
            <button
              v-if="status !== 'update answer'"
              type="button"
              class="btn btn-outline-dark black-white-button-danger"
              @click.stop="$router.push('/')">
              Cancel
            </button>
            <button
              v-if="status === 'update answer'"
              type="button"
              class="btn btn-outline-dark black-white-button-danger"
              @click.stop="closeModal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-outline-dark black-white-button-success"
              @click.stop="bundleForm">
              {{ status }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import serverAPI from '@/api/serverAPI'
import { mapMutations } from 'vuex'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

export default {
  name: "create-update-component",
  props: ['status', 'questionPopulate', 'clearForm', 'updateAnswerPopulate'],
  data() {
    return {
      editor: ClassicEditor,
      title: '',
      tags: '',
      description: ''
    }
  },
  watch: {
    questionPopulate(val) {
      if(val){
        if(this.status === 'update') {
          this.title = this.questionPopulate.title
          this.tags = this.questionPopulate.tags.map(tag => tag.name).join(' ')
          this.description = this.questionPopulate.description
        }
      }
    },
    clearForm(val) {
      if(val) {
        this.emptyForm()
      }
    },
    updateAnswerPopulate(val) {
      if(val) {
        if(this.status === 'update answer') {
          this.title = this.updateAnswerPopulate.title
          this.description = this.updateAnswerPopulate.description
        }
      }
    }
  },
  methods: {
    emptyForm() {
      this.title = '';
      this.description = ''
      this.$emit('clear-success')
    },
    bundleForm() {
      let question = {
        title: this.title,
        tags: this.tags,
        description: this.description
      }
      if(this.status === 'create') {
        this.$emit('action-create', question)
      } else if (this.status === 'update') {
        question._id = this.questionPopulate._id
        this.$emit('action-update', question)
      } else if(this.status === 'answer') {
        this.$emit('action-answer', question)
      } else {
        this.updateAnswer()
      }
    },
    closeModal() {
      this.emptyForm()
      $('#update-answer').modal('toggle')
    },
    updateAnswer() {
      serverAPI
        .put(`/answers/${this.updateAnswerPopulate._id}`, {
          title: this.title,
          description: this.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.successSWAL(data.message)
          this.emptyForm()
          $('#update-answer').modal('toggle')
          this.$emit('update-answer', data.answer)
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
        })
    }
  }
}
</script>
