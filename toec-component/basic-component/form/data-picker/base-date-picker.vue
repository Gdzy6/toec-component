<template>
  <!-- <span
      class="timeSpan"
  >时间选择</span>-->
  <el-row>
    <el-col :span="12">
      <el-date-picker
        v-model="formData[formKey]"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        align="right"
        :value-format="timeFormat"
        format="yyyy-MM-dd HH:mm:ss"
        v-on="$listeners"
        @change="_handleTimeChange"
      />
    </el-col>
    <el-col :span="12" v-if="dateOptionsBtn === true">
      <el-row>
        <el-col :span="24">
          <el-button class="btn" :type="btnType24h" @click="btnFilterHandler('24h')">近24小时</el-button>
          <el-button class="btn" :type="btnType7d" @click="btnFilterHandler('7d')">近7天</el-button>
          <el-button class="btn" :type="btnType30d" @click="btnFilterHandler('30d')">近30天</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'ToecDatePicker',
  props: {
    handleTimeChange: { type: Function, default: () => {} },
    // 非必须传值，默认是年月日时分秒
    // 如果想要long型的毫秒数据，这个参数传值为timestamp
    timeFormat: { type: String, default: 'yyyy-MM-dd HH:mm:ss' },
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    dateOptionsBtn: { type: Boolean, default: false }
  },
  data() {
    const _this = this
    return {
      timeRange: '',
      btnType24h: 'primary',
      btnType7d: '',
      btnType30d: ''
    }
  },
  computed: {
    pickerOptions() {
      return this.dateOptionsBtn
        ? {}
        : {
            shortcuts: [
              {
                text: '近24小时',
                onClick(picker) {
                  _this.handlePickerClick(picker, 1)
                }
              },
              {
                text: '最近一周',
                onClick(picker) {
                  _this.handlePickerClick(picker, 7)
                }
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  _this.handlePickerClick(picker, 30)
                }
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  _this.handlePickerClick(picker, 90)
                }
              }
            ]
          }
    }
  },
  mounted() {
    // console.log('formData-mounted', this.formData)
  },
  watch: {
    // formData: {
    //   handler(val) {
    //     console.log('formData变化', this.formData[this.formKey])
    //   },
    //   deep: true
    // }
  },

  methods: {
    /*
     *@Description: 将天数转换为毫秒数
     *@Params:
     入参： dayNum：天数
      返回： 毫秒数
    */
    transformToMilliseconds(dayNum) {
      if (typeof dayNum === 'number' && dayNum > 0) {
        return 3600 * 1000 * 24 * dayNum
      } else {
        return 0
      }
    },
    /*
     *@Description: picker，快捷选择时间，响应函数
     *@Params:
     入参： picker： 时间选择器
          dayNum； 天数
     返回： 无
    */
    handlePickerClick(picker, dayNum) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - this.transformToMilliseconds(dayNum))
      picker.$emit('pick', [start, end])
    },

    /*
     *@Description:
     *@Params:
     */
    _handleTimeChange() {
      console.log('time change')
      if (typeof this.handlePickerClick === 'function') {
        this.handleTimeChange(this.formData[this.formKey])
      }
    },

    // 按钮快捷筛选
    btnFilterHandler(timeRange) {
      // 按下按钮的同时，会自动重写开始和结束时间，然后下发查询指令
      // 因此无需form校验
      if (timeRange) {
        const end = new Date()
        const start = new Date()

        switch (timeRange) {
          case '24h':
            this.btnType24h = 'primary'
            this.btnType7d = ''
            this.btnType30d = ''
            start.setTime(start.getTime() - this.transformToMilliseconds(1))
            break
          case '7d':
            this.btnType24h = ''
            this.btnType7d = 'primary'
            this.btnType30d = ''
            start.setTime(start.getTime() - this.transformToMilliseconds(7))
            break
          case '30d':
            this.btnType24h = ''
            this.btnType7d = ''
            this.btnType30d = 'primary'
            start.setTime(start.getTime() - this.transformToMilliseconds(30))
            break
        }
        // 这里已经按timestamp进行了格式转换
        this.formData[this.formKey] = [start.getTime(), end.getTime()]
        this._handleTimeChange()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.timeSpan {
  margin-right: 10px;
  font-weight: bolder;
  font-size: 0.9em;
}

.btn {
  margin-left: 5px !important;
  margin-right: 5px !important;
}
</style>
