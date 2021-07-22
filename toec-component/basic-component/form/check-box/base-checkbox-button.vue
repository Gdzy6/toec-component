<template>
  <div v-if="typeof formData !== 'undefined' && formData[formKey] instanceof Array">
    <el-checkbox-group v-model="formData[formKey]" v-bind="$attrs" fill="#1890FF">
      <el-checkbox-button
        v-for="(item, index) in checkBoxData"
        :key="index"
        :label="item.value"
      >{{ item.label }}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckboxButton',
  props: {
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    checkBoxData: { type: Array, default: () => [] }
  },
  watch: {
    formData: {
      handler(val) {
        console.log('formData变化', this.formData)
      },
      deep: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
