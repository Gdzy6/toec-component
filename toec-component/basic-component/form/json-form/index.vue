<template>
  <div>
    <el-form ref="form" class="toec-form" :model="form" v-bind="$attrs" v-on="$listeners">
      <el-row :gutter="16">
        <el-col v-for="(col, colIndex) in colArray" :key="colIndex" :span="Math.ceil(24 / colNum)">
          <div v-for="(item, index) in formItems" :key="index">
            <el-form-item
              v-if="index % Number(colNum) === colIndex && item._ifRender"
              :rules="item._rule"
              :prop="item.key"
              :label="item.title"
            >
              <component
                :is="item.compType"
                v-model="form[item.key]"
                :options="item.options"
                v-bind="item.props"
              />
            </el-form-item>
          </div>
          <div
            v-if="leftSubmit && colIndex === (formItems.length) % colNum"
            class="submit-btn-center"
          >
            <el-form-item>
              <el-button type="primary" @click="submit">{{ submitText }}</el-button>
              <el-button @click="reset">{{ resetText }}</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div v-if="rightSubmit" class="submit-btn-center">
            <el-form-item>
              <el-button @click="cancelHandler">{{ cancelText }}</el-button>
              <el-button type="primary" @click="submit">{{ submitText }}</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div v-if="goBack" class="submit-btn-center">
            <el-form-item>
              <el-button @click="goBackHandler">{{ goBackText }}</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BaseDeleteButton from "@/toec-component/basic-component/button/base-delete-button";
import BaseConfirmButton from "@/toec-component/basic-component/button/base-confirm-button";
import BaseDatePicker from "@/toec-component/basic-component/form/data-picker/base-date-picker";
import BaseSelect from "@/toec-component/basic-component/form/select/base-select";
import BaseUploadFile from "@/toec-component/basic-component/form/upload/base-upload-file";
import BaseUploadImg from "@/toec-component/basic-component/form/upload/base-upload-img";
import BaseCheckboxButton from "@/toec-component/basic-component/form/check-box/base-checkbox-button";
import BaseRadioGroupButton from "@/toec-component/basic-component/form/radio/base-radio-group-button";
import BaseInputAppend from "@/toec-component/basic-component/form/input/base-input-append";
import BaseSelectInput from "@/toec-component/basic-component/form/input/base-select-input";
import BaseDeleteIcon from "@/toec-component/basic-component/button/base-delete-icon";
import CompactJsonForm from "@/toec-component/basic-component/form/json-form/compact-json-form";
import ThreeSelectItem from "@/toec-component/integrate-basic-component/Form/three-select-item";
import BaseRadioGroup from "@/toec-component/basic-component/form/radio/base-radio-group";
import BaseCheckboxGroup from "@/toec-component/basic-component/form/check-box/base-checkbox-group";
import BaseTree from "@/toec-component/basic-component/form/tree/base-tree";
import BaseSingleDatePicker from "@/toec-component/basic-component/form/data-picker/base-single-date-picker";
import { computeFormItem } from "./core";
import { copyObjectByKeys } from "@/api/common/dataHandler";
import BaseRadioGroupDatePicker from "@/toec-component/basic-component/form/data-picker/base-radio-group-date-picker";

export default {
  name: "JsonForm",
  components: {
    BaseDeleteButton,
    BaseConfirmButton,
    BaseDatePicker,
    BaseSelect,
    BaseCheckboxButton,
    BaseRadioGroupButton,
    BaseUploadFile,
    BaseUploadImg,
    BaseInputAppend,
    BaseSelectInput,
    BaseDeleteIcon,
    CompactJsonForm,
    ThreeSelectItem,
    BaseRadioGroup,
    BaseCheckboxGroup,
    BaseTree,
    BaseSingleDatePicker,
    BaseRadioGroupDatePicker
  },
  props: {
    // form信息，可选传入，如果已经有form数据，需要回显在表单中，则传入
    // 比如修改的场景，则需要传入form的原始值
    originForm: { type: Object, default: () => {} },
    colNum: { type: Number, default: 2 },
    fields: { type: Array, required: true },
    leftSubmit: { type: Boolean, default: true },
    rightSubmit: { type: Boolean, default: false },
    goBack: { type: Boolean, default: false },
    submitText: { type: String, default: "保存" },
    resetText: { type: String, default: "重置" },
    cancelText: { type: String, default: "取消" },
    goBackText: { type: String, default: "返回" }, //非必填
    goBackFunc: { type: Function, default: null }, //非必填
    cancelHandler: { type: Function, default: () => {} },
    formItemWidth: { type: String, default: "" },
    disabled: { type: Boolean, default: false } // 是否整表禁用
  },
  data() {
    const that = this;
    return {
      form: this.originForm
        ? JSON.parse(JSON.stringify(this.originForm))
        : this.initForm(),
      // form: this.initForm(),
      colArray: [],
      ifMounted: false,
      compType: ""
    };
  },
  computed: {
    formItems() {
      if (this.ifMounted) {
        return this.fields.map(item =>
          computeFormItem(item, this.form, this.formItemWidth, this.disabled)
        );
      } else {
        return null;
      }
    },
    toggleFormItems() {
      return this.toggleFields.map(item => computeFormItem(item, this.form));
    }
  },
  watch: {
    originForm: {
      handler(val) {
        // const newForm = JSON.parse(JSON.stringify(this.originForm))
        // if (this.compType !== 'selectInput') {
        //   this.form = copyObjectAttrs(newForm, this.form)
        // } else {
        //   this.form = newForm
        // }
        // console.log('watch， newForm', newForm)
        // console.log('watch， form', this.form)
        this.form = JSON.parse(JSON.stringify(this.originForm));
      },
      deep: true
    }
  },
  mounted() {
    this.ifMounted = true;
    if (typeof this.colNum === "number") {
      for (let idx = 0; idx < this.colNum; idx++) {
        this.colArray.push(idx);
      }
    } else {
      this.colArray = [0];
    }
  },
  methods: {
    initForm() {
      let form = {};
      const map = {
        input: "",
        inputNumber: undefined,
        select: "",
        upload: "",
        checkboxButton: [],
        checkboxGroup: [],
        radioGroupButton: "",
        radioGroup: ""
      };
      this.fields.forEach(item => {
        this.compType = item.compType;
        if (item.defaultValue) {
          form[item.key] = item.defaultValue;
        } else {
          form[item.key] = map[item.compType];
        }
      });

      if (this.originForm) {
        form = JSON.parse(JSON.stringify(this.originForm));
        // const newForm = JSON.parse(JSON.stringify(this.originForm))
        // if (this.compType !== 'selectInput') {
        //   form = copyObjectAttrs(newForm, form)
        // } else {
        //   console.log('类型是selectInput', this.compType)
        //   console.log('this.originForm', this.originForm)
        //   form = newForm
        //   console.log('newForm', newForm)
        //   console.log('form初始化', form)
        // }
      }
      return form;
    },
    /**
     * 用于在父组件中通过ref进行调用，可能存在一个
     * 大form中包含多个子form的情况，需要ref进行
     * 多表单的校验，汇总校验结果
     */
    validateForm(resultObj) {
      console.log("validate, this.form", this.form);
      this.$refs.form.validate(valid => {
        console.log(valid);
        resultObj.valid = valid;
      });
    },

    // 专用于密码和确认密码的核对
    validatePassword(pswKey, pswConfirmKey, callback) {
      let result = false;
      if (this.form[pswKey] === this.form[pswConfirmKey]) {
        result = true;
      }

      if (!result) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        return callback();
      }
    },

    /**
     * 类似于上一个接口，用户多表单联合使用时, 通过ref调用获取form数据
     */
    getFormData() {
      // console.log('getFormData', this.form)
      const keysList = this.fields.map(item => item.key);
      let finalForm = {};
      finalForm = copyObjectByKeys(this.form, finalForm, keysList);
      Object.keys(finalForm).forEach(key => {
        if (typeof finalForm[key] === "string") {
          finalForm[key] = finalForm[key].trim();
        }
      });
      return finalForm;
    },
    getWholeForm() {
      Object.keys(this.form).forEach(key => {
        if (typeof this.form[key] === "string") {
          this.form[key] = this.form[key].trim();
        }
      });
      return this.form;
    },
    // 用于清空某个字段
    resetSingleField(key) {
      const type = typeof this.form[key];
      if (type === "string") {
        this.form[key] = "";
      } else if (type === "number") {
        this.form[key] = 0;
      } else if (this.form[key] instanceof Array) {
        this.form[key] = [];
      }
    },
    submit() {
      this.$refs.form.validate(valid => {
        Object.keys(this.form).forEach(item => {
          if (typeof this.form[item] === "string") {
            this.form[item] = this.form[item].trim();
          }
        });
        this.$emit("submit", this.form, valid);
      });
    },
    reset() {
      this.$refs.form.resetFields();
      this.form = this.originForm ? this.originForm : this.initForm();
    },
    clear() {
      this.$refs.form.clearValidate();
    },
    goBackHandler() {
      if (this.goBackFunc) {
        this.goBackFunc();
      }
    },
    getFieldsKeys() {
      return this.fields.map(item => item.key);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

