<template>
  <!-- <span
      class="timeSpan"
  >时间选择</span>-->
  <el-date-picker
    v-model="formData[formKey]"
    type="datetime"
    align="right"
    :prefix-icon="prefixIcon"
    :value-format="timeFormat"
    format="yyyy-MM-dd HH:mm:ss"
    v-on="$listeners"
    @change="_handleTimeChange"
  />
</template>
<script>
export default {
  name: "ToecDatePicker",
  props: {
    handleTimeChange: { type: Function, default: () => {} },
    // 非必须传值，默认是年月日时分秒
    // 如果想要long型的毫秒数据，这个参数传值为timestamp
    timeFormat: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
    formData: { type: Object, default: null },
    formKey: { type: String, default: "" },
    prefixIcon: { type: String }
  },
  data() {
    const _this = this;
    return {};
  },
  mounted() {
    //console.log("formData-mounted", this.formData);
  },
  watch: {
    formData: {
      handler(val) {
        console.log("formData变化", this);
      },
      deep: true
    }
  },

  methods: {
    /*
     *@Description:
     *@Params:
     */
    _handleTimeChange() {
      if (typeof this.handlePickerClick === "function") {
        this.handleTimeChange(this.formData[this.formKey]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.timeSpan {
  margin-right: 10px;
  font-weight: bolder;
  font-size: 0.9em;
}
</style>
