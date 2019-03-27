<template>
  <div> 

    <!-- Modal -->
    <div
      class="modal fade"
      id="update-answer"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document">
        <!-- Material form login -->
        <div
          class="modal-content"
          style="border-radius: 10px">

          <h5 class="card-header info-color white-text text-center py-4">
            <strong>Update Answer</strong>
          </h5>

          <br>

          <create-update-component
            :status="'update answer'"
            :update-answer-populate="updateAnswerPopulate"
            @update-answer="$emit('update-answer', $event)"/>
        </div>
        <!-- Material form login -->
      </div>
    </div>
  </div>
</template>

<script>

import serverAPI from '@/api/serverAPI'
import { mapMutations } from 'vuex'
import CreateUpdateComponent from '@/components/create-update-component.vue'

export default {
  name: 'edit-answer',
  props: ['updateAnswerPopulate'],
  components: {
    CreateUpdateComponent
  },
  created(){
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

<style>

</style>
