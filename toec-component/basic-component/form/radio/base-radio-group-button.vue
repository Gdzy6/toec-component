<template>
  <div>
    <el-radio-group v-model="formData[formKey]" v-bind="$attrs">
      <!-- <el-radio-group v-model="formData[formKey]" v-bind="$attrs" fill="#1890FF"> -->
      <el-radio-button
        v-for="(item, index) in radioData"
        :key="index"
        :label="item.value"
      >{{ item.label }}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'BaseRadioGroupButton',
  props: {
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    radioData: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-radio-group {
  color: #2274ff !important;
  // border: 1px solid #2274ff !important;
  // background-color: white !important;
}
</style>
