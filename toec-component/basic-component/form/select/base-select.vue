<template>
  <el-select
    v-model="formData[formKey]"
    v-bind="$attrs"
    @change="changeHandler"
    :multiple="multiple"
  >
    <el-option
      v-for="(item, index) in finalOptions"
      :key="index"
      :value="item.value"
      :label="item.label"
    >
      <span v-if="selfDefined===true" class="self-define-label">{{ item.label }}</span>
      <span v-if="selfDefined===true" class="self-define-value">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    getOptions: { type: Function, default: null },
    changeHandler: {
      type: Function,
      default: () => {}
    },
    // 如果select在一个form中，那么需要改变form的对应字段的值
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    selfDefined: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false }
  },
  data() {
    return {
      currValue: ''
    }
  },
  computed: {
    finalOptions() {
      if (this.getOptions && typeof this.getOptions === 'function') {
        return this.getOptions()
      } else if (this.options instanceof Array) {
        return this.options
      } else {
        return null
      }
    }
  },
  watch: {
    formData(val) {}
  }
}
</script>

<style lang="scss" scoped>
.self-define-label {
  float: left;
}

.self-define-value {
  float: right;
  margin-right: 40px;
  // color: #8492a6;
  font-size: 13px;
}
</style>