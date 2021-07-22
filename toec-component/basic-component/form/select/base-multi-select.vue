<template>
  <div>
    <div v-for="(item, index) in totalNumList" :key="index">
      <el-select
        v-model="formData[formKey[index]]"
        v-bind="$attrs"
        @change="changeHandler[index]"
        :multiple="multiple"
      >
        <el-option
          v-for="item in finalOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
          <span v-if="selfDefined===true" class="self-define-label">{{ item.label }}</span>
          <span v-if="selfDefined===true" class="self-define-value">{{ item.value }}</span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    totalNum: { type: Number, default: 3 },
    options: {
      type: Array,
      default: () => []
    },
    getOptions: { type: Function, default: null },
    changeHandler: {
      type: Array,
      default: () => {}
    },
    // 如果select在一个form中，那么需要改变form的对应字段的值
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    

  },
  created() {
    if (this.totalNum && this.totalNum > 0) {
      for (let idx = 0; idx < this.totalNum; idx++) {
        this.totalNumList.push(idx)
      }
    }
  },
  data() {
    return {
      totalNumList: []
    }
  },
  computed: {
    finalOptions() {
      // console.log('this.getOptions()', this.getOptions())
      // return this.getOptions()
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