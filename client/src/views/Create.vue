<template>
  <create-update-component
    :status="'create'"
    @action-create="createForm($event)"/>
</template>

<script>

import { mapActions } from 'vuex'
import serverAPI from '@/api/serverAPI'
import CreateUpdateComponent from '@/components/create-update-component.vue'

export default {
  name: 'create',
  data() {
    return {
    }
  },
  components: {
    CreateUpdateComponent
  },
  methods: {
    ...mapActions([
      'createQuestions'
    ]),
    createForm(question) {
      this.createQuestions(question)
    }
  }
}
</script>

<style>

</style>

