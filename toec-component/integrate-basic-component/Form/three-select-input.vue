<template>
  <div style="display: inline-block">
    <el-row :gutter="20">
      <el-col :span="22">
        <el-input style="width = 1px"
          v-model="formData[inputKey]"
          :disabled="disabled"
          class="input-with-select"
        >
          <el-select
            slot="prepend"
            v-model="formData[selectKey]"
            :style="selectWidth"
            v-bind="$attrs"
            placeholder="请选择"
            @change="changeHandlerInline"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ThreeSelectInput',
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
    selectWidth: { type: String, default: 'width: 220px' },
    disabled: { type: Boolean, default: false }
    // inputRules: {type: Object, default: () => {}}
  },
  data() {
    return {
      
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
  methods: {
    deleteSubmit() {
      if (this.deleteHandler) {
        this.deleteHandler(this.formData)
      }
    },
    changeHandlerInline(val) {
      if(this.formData[this.inputKey] !== '' && this.formData[this.selectKey] !== ''){
        this.formData[this.formKey] = 'data'
      }
      if(this.changeHandler) {
        this.changeHandler(val)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.btn-no-border {
  border: 0;
}
</style>
