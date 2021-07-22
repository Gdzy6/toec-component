<template>
  <div>
    <el-form ref="form" class="toec-form-compact" :model="form" v-bind="$attrs" v-on="$listeners">
      <el-row>
        <div v-for="(item, index) in formItems" :key="index">
          <el-col :span="item.span">
            <el-form-item
              v-if="item._ifRender"
              :rules="item._rule"
              :prop="item.key"
              :label="item.title"
            >
              <component
                :is="item.compType"
                v-model="form[item.key]"
                :options="item.options"
                v-bind="item.props"
                :url="item.url"
              />
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BaseDeleteButton from '@/toec-component/basic-component/button/base-delete-button'
import BaseConfirmButton from '@/toec-component/basic-component/button/base-confirm-button'
import BaseDatePicker from '@/toec-component/basic-component/form/data-picker/base-date-picker'
import BaseSelect from '@/toec-component/basic-component/form/select/base-select'
import BaseUploadFile from '@/toec-component/basic-component/form/upload/base-upload-file'
import BaseCheckboxButton from '@/toec-component/basic-component/form/check-box/base-checkbox-button'
import BaseRadioGroupButton from '@/toec-component/basic-component/form/radio/base-radio-group-button'
import BaseInputAppend from '@/toec-component/basic-component/form/input/base-input-append'
import BaseSelectInput from '@/toec-component/basic-component/form/input/base-select-input'
import BaseDeleteIcon from '@/toec-component/basic-component/button/base-delete-icon'
import { computeFormItem } from './core'

export default {
  name: 'CompactJsonForm',
  components: {
    BaseDeleteButton,
    BaseConfirmButton,
    BaseDatePicker,
    BaseUploadFile,
    BaseSelect,
    BaseCheckboxButton,
    BaseRadioGroupButton,
    BaseInputAppend,
    BaseSelectInput,
    BaseDeleteIcon
  },
  props: {
    // form信息，可选传入，如果已经有form数据，需要回显在表单中，则传入
    // 比如修改的场景，则需要传入form的原始值
    originForm: { type: Object, default: () => {} },
    fields: { type: Array, required: true },
    formItemWidth: { type: String, default: '' },
    disabled: { type: Boolean, default: false } // 是否整表禁用
  },
  data() {
    return {
      form: this.originForm ? this.originForm : this.initForm(),
      ifMounted: false
    }
  },
  computed: {
    formItems() {
      if (this.ifMounted) {
        return this.fields.map(item =>
          computeFormItem(item, this.form, this.formItemWidth, this.disabled)
        )
      } else {
        return null
      }
    }
  },
  watch: {
    originForm: {
      handler(val) {
        this.form = val
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    initForm() {
      const form = {}
      const map = {
        input: '',
        inputNumber: undefined,
        select: '',
        upload: '',
        checkboxButton: [],
        radioGroupButton: ''
      }
      this.fields.forEach(item => {
        if (item.defaultValue) {
          form[item.key] = item.defaultValue
        } else {
          form[item.key] = map[item.compType]
        }
      })
      return form
    },
    /**
     * 用于在父组件中通过ref进行调用，可能存在一个
     * 大form中包含多个子form的情况，需要ref进行
     * 多表单的校验，汇总校验结果
     */
    validateForm(resultObj) {
      this.$refs.form.validate(valid => {
        resultObj.valid = valid
      })
    },

    /**
     * 类似于上一个接口，用户多表单联合使用时, 通过ref调用获取form数据
     */
    getFormData() {
      return this.form
    },
    submit() {
      this.$refs.form.validate(valid => {
        Object.keys(this.form).forEach(item => {
          if (typeof this.form[item] === 'string') {
            this.form[item] = this.form[item].trim()
          }
        })
        // 此处未获取到ba-select-input的选项值?
        this.$emit('submit', this.form, valid)
      })
    },
    reset() {
      console.log('reset Form')
      this.$refs.form.resetFields()
      this.form = this.originForm ? this.originForm : this.initForm()
    },
    clear() {
      this.$refs.form.clearValidate()
    },
    goBackHandler() {
      if (this.goBackFunc) {
        this.goBackFunc()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-btn-center {
  margin-top: 65px;
  margin-left: 570px;
  // text-align: center
}
</style>

