<template>
  <form
    style="display:inline; margin-left: 10px"
    :action="url"
    rget="_blank"
    method="post"
    name="exportForm"
  >
    <input v-if="typeof params !== 'undefined'" v-model="params" type="hidden" name="json">
    <el-button id="export-submit-btn" type="text" native-type="submit">{{ btnText }}</el-button>
  </form>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'ExportFile',
  props: {
    params: { type: Object, default: () => {} },
    url: { type: String, required: true },
    btnText: { type: String, default: '导出信息' }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.el-button--text{
  color: #3377FF;
}
.el-button--text:focus, .el-button--text:hover {
  color: #578ffd;
  border-color: transparent;
  background-color: transparent;
}
</style>
