<template>
  <div>
    <el-row style="width: 670px">
      <el-col :span="5">
        <el-select v-model="formData[selectKeyList[0]]" v-bind="$attrs" @change="changeHandler1">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="formData[selectKeyList[1]]" v-bind="$attrs" @change="changeHandler2">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select
          v-model="formData[selectKeyList[2]]"
          v-bind="$attrs"
          @change="changeHandlerFinal"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ThreeSelectItem',
  props: {
    options1: {
      type: Array,
      default: () => []
    },
    options2: {
      type: Array,
      default: () => []
    },
    options3: {
      type: Array,
      default: () => []
    },
    getOptions: { type: Function, default: null },
    changeHandler1: {
      type: Function,
      default: () => {}
    },
    changeHandler2: {
      type: Function,
      default: () => {}
    },
    // 如果select在一个form中，那么需要改变form的对应字段的值
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    selectKeyList: { type: Array, required: true }
    // styleList: { type: Array, required: true }
  },
  data() {
    return {
      currValue: ''
    }
  },
  mounted() {
  },
  methods: {
    changeHandlerFinal(val) {
      this.formData[this.selectKeyList[2]] = val

      // 最后一个字段选择后
      let selectDataArray = []
      for (let idx = 0; idx < this.selectKeyList.length; idx++) {
        let curInfo = this.formData[this.selectKeyList[idx]]
        if (curInfo !== '') {
          selectDataArray.push(curInfo)
        } else {
          break
        }
      }
      if ((selectDataArray.length === this.selectKeyList, length)) {
        this.formData[this.formKey] = selectDataArray.join('-')
      }
    },
    changeHandlerSubmit1(val) {
      console.log('changeHandlerSubmit1')
      if(this.changeHandler1) {
        this.changeHandler1(val)
      }
      this.formData.provinceCode = val
      console.log('this.formData', this.formData)
    },
    changeHandlerSubmit2(val) {
      if(this.changeHandler2) {
        this.changeHandler2(val)
      }
      this.formData[this.selectKeyList[1]] = val
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
    'formData.provinceCode': {
      handler(val) {
        console.log('formData', val)
      },
      deep:true
    },
    options1: {
      handler(val) {
        console.log('options1', val)
      },
      deep:true
    }
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