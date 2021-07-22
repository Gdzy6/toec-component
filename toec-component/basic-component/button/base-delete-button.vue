<template>
  <el-popconfirm
    placement="top-start"
    :title="`确定${btnText}吗?`"
    icon="el-icon-info"
    icon-color="red"
    cancel-button-text="取消"
    confirm-button-text="确定"
    @confirm="confirm"
  >
    <el-button slot="reference" class="delete-btn" :type="btnType">{{ btnText }}</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'BaseDeleteButton',
  props: {
    btnText: { type: String, default: '批量删除' },
    btnType: { type: String, default: 'danger' }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.delete-btn{
  margin-left: 10px
}
</style>
