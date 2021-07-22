<template>
  <!-- <span
      class="timeSpan"
  >时间选择</span>-->
  <div>
    <div v-if="isRadio" style="display: inline-block;">
      <el-radio-group
        v-model="formData[radioKey]"
        v-bind="$attrs"
        :disabled="disabled"
        @change="_changeHandler"
      >
        <el-radio
          v-for="(item, index) in radioData"
          :key="`radio${index}`"
          :label="item.value"
        >{{ item.label }}</el-radio>
      </el-radio-group>
    </div>
    <div v-if="isDateTime" style="display: inline-block;">
      <el-date-picker
        :disabled="disabled"
        v-model="formData[timeKey]"
        type="datetime"
        align="right"
        :prefix-icon="prefixIcon"
        format="yyyy-MM-dd HH:mm:ss"
        v-on="$listeners"
        :picker-options="pickerOptions"
        @change="_handleTimeChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ToecRadioGroupDatePicker",
  props: {
    isRadio: { type: Boolean, default: true },
    isDateTime: { type: Boolean, default: true },
    formData: { type: Object, default: null },
    formKey: { type: String, default: "" },
    radioKey: { type: String, default: "radioKey" },
    timeKey: { type: String, default: "timeKey" },
    radioData: { type: Array, default: () => [] },
    changeHandler: { type: Function, default: () => {} },
    handleTimeChange: { type: Function, default: () => {} },
    // 非必须传值，默认是年月日时分秒
    // 如果想要long型的毫秒数据，这个参数传值为timestamp
    timeFormat: { type: String, default: "yyyy-MM-dd HH:mm:ss" },
    dateFormData: {
      type: Object,
      default: function() {
        return { dateTime: "" };
      }
    },
    disabled: { type: Boolean, default: false },
    prefixIcon: { type: String }
  },
  created() {
    console.log("-------------", this);
  },
  data() {
    const _this = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  mounted() {},
  watch: {
    formData(val) {
      if (typeof this.formData[this.formKey] !== "undefined") {
        this.orginDataSwitch(this.formData[this.formKey]);
      }
    }
  },

  methods: {
    /*
     *@Description:
     *@Params:
     */
    _handleTimeChange() {
      if (typeof this.handleTimeChange === "function") {
        this.formData[this.radioKey] = 1;
        this.formData[this.formKey] = this.formData[this.timeKey].getTime();
      }
    },
    _changeHandler(val) {
      this.changeHandler(val);
      this.formData[this.timeKey] = "";
      this.formData[this.formKey] = val;
    },
    orginDataSwitch(val) {
      console.log("orginDataSwitch", val);
      if (val) {
        this.formData[this.radioKey] = 1;
        this.formData[this.timeKey] = val;
      } else {
        this.formData[this.timeKey] = "";
        this.formData[this.radioKey] = 0;
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
