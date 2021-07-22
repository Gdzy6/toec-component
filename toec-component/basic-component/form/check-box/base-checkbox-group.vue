<template>
  <div>
    <div v-if="isAll">
      <el-row class="separate-div">
        <el-checkbox
          :disabled="disabled"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          label="全选"
          @change="handleAllChange"
        />
      </el-row>
    </div>
    <div v-if="typeof formData !== 'undefined' && formData[formKey] instanceof Array">
      <el-checkbox-group :disabled="disabled" v-model="formData[formKey]" v-bind="$attrs">
        <el-checkbox
          v-for="(item, index) in checkBoxData"
          :key="index"
          :label="item.value"
        >{{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCheckboxGroup",
  props: {
    formData: { type: Object, default: [] },
    formKey: { type: String, default: "" },
    checkBoxData: { type: Array, default: () => [] },
    changeHandler: { type: Function, default: () => {} },
    disabled: { type: Boolean, default: false },
    isAll: { type: Boolean, default: true }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false
    };
  },

  watch: {
    formData: {
      handler(val) {
        if (this.formData[this.formKey].length > 0) {
          this.handleCheckedDataChange(this.formData[this.formKey]);
        }
      },
      deep: true
    }
  },
  methods: {
    handleAllChange(val) {
      this.formData[this.formKey] = val
        ? this.checkBoxData.map(item => item.value)
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedDataChange(value) {
      if (value) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.checkBoxData.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkBoxData.length;
      }
    }
  }
};
</script>

<style scoped>
.separate-div {
  margin-bottom: 10px;
}
</style>
