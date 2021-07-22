<template>
  <div>
    <el-radio-group v-model="formData[formKey]" v-bind="$attrs" @change="changeHandler">
      <el-radio v-for="(item, index) in radioData" :key="index" :label="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'BaseRadioGroup',
  props: {
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    radioData: { type: Array, default: () => [] },
    changeHandler: { type: Function, default: () => {} }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
