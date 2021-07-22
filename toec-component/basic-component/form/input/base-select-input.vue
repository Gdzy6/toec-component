<template>
  <div style="display: inline-block">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="formData[inputKey]"
          :disabled="disabled"
          :placeholder="$attrs.placeholder || '请输入内容'"
          class="input-with-select"
          @change="changeHandlerInline"
        >
          <el-select
            slot="prepend"
            :disabled="disabled"
            v-model="formData[selectKey]"
            :style="selectWidth"
            v-bind="$attrs"
            placeholder="请选择"
            @change="changeHandlerInline"
          >
            <el-option
              v-for="item in finalOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            />
          </el-select>
          <span v-if="appendContent" slot="append">{{ appendContent }}</span>
        </el-input>
      </el-col>
      <el-col v-if="deleteIcon===true" :span="2">
        <i class="el-icon-remove delete-icon" @click="deleteSubmit" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'BaseSelectInput',
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
    inputKey: { type: String, default: '' },
    selectKey: { type: String, default: '' },
    appendContent: { type: String, default: '' },
    selectWidth: { type: String, default: 'width: 220px' },
    deleteIcon: { type: Boolean, default: false },
    deleteHandler: { type: Function, default: null },
    disabled: { type: Boolean, default: false }
    // inputRules: {type: Object, default: () => {}}
  },
  data() {
    return {}
  },
  watch: {
    formData: {
      handler(val) {
        // console.log('base-select,formData变化', val)
        this.changeHandlerInline(val)
      },
      deep: true
    }
  },
  created() {
    this.changeHandlerInline()
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
  methods: {
    deleteSubmit() {
      if (this.deleteHandler) {
        this.deleteHandler(this.formData)
      }
    },
    changeHandlerInline(val) {
      const inputVal = this.formData[this.inputKey]
      const selectVal = this.formData[this.selectKey]
      if (
        typeof inputVal !== 'undefined' &&
        inputVal !== '' &&
        typeof selectVal !== 'undefined' &&
        selectVal !== ''
      ) {
        this.formData[this.formKey] = inputVal
      } else {
        this.formData[this.formKey] = undefined
      }
      // console.log(
      //   'changeHander，this.formData[this.formKey]',
      //   this.formData[this.formKey]
      // )
      if (this.changeHandler) {
        this.changeHandler(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-no-border {
  border: 0;
}
</style>
