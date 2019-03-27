<template>
  <div> 
    <!-- Modal -->
    <div
      class="modal fade"
      id="register-modal"
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
            <strong>Register</strong>
          </h5>

          <!--modal content-->
          <div
            class="cart-header px-lg-5 pt-0"
            style="margin: 30px">

            <!-- Form -->
            <form
              class="text-center"
              style="color: #757575;"
              @submit.prevent="register">

              <!-- Name -->
              <div class="form">
                <input
                  type="name"
                  class="form-control"
                  placeholder="Name.."
                  v-model="name">
              </div>

              <!-- Email -->
              <div class="form">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email.."
                  v-model="email">
              </div>

              <!-- Password -->
              <div class="form">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password.."
                  v-model="password">
              </div>

              <!-- Register -->
              <p>Already a member?
                <button
                  type="button"
                  class="btn btn-primary transparent-background"
                  @click="showLogin()">
                  Login
                </button>
              </p>

              <!-- Sign in button -->
              <button
                class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-1 hover-skyblue" 
                type="submit">
                Register
              </button>

            </form>
            <!-- Form -->

          </div>

        </div>
        <!-- Material form login -->
      </div>
    </div>
  </div>
</template>

<script>

import serverAPI from '@/api/serverAPI'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    showLogin() {
      $('#login-modal').modal('toggle')
      $('#register-modal').modal('toggle')
    },
    register () {
      serverAPI
        .post('/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          loginVia: 'website'
        })
        .then(({ data }) => {
          this.clearForm()
          this.showLogin()
          this.successSWAL(data.message)
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
        })
    },
    clearForm() {
      this.name = ''
      this.password = ''
      this.email = ''
    }
  }
}

</script>

<style>

</style>

