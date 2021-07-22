<template>
  <i class="el-icon-remove delete-icon" @click="deleteSubmit" />
</template>

<script>
export default {
  name: 'BaseDeleteIcon',
  props: {
    deleteHandler: { type: Function, required: true },
    formData: { type: Object, default: null }
  },
  methods: {
    deleteSubmit() {
      if (this.deleteHandler) {
        this.deleteHandler(this.formData)
      }
    }
  }
}
</script>