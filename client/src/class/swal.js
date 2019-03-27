import Swal from 'sweetalert2'

const SWAL = {
  methods: {
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
}

export default SWAL