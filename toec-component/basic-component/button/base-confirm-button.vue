<template>
  <el-popconfirm
    placement="top-start"
    :title="content"
    icon-color="red"
    cancel-button-text="取消"
    confirm-button-text="确定"
    @confirm="handleConfirm"
  >
    <el-button slot="reference" class="opt-btn" :type="btnType">{{ text }}</el-button>

  </el-popconfirm>
</template>

<script>
export default {
  name: 'ToecConfirmButton',
  props: {
    text: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: '确定执行该操作吗'
    },
    btnType: {
      type: String,
      default: 'danger'
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.opt-btn{
  margin-left: 10px
}
</style>
