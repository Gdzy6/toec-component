<template>
  <el-dialog
    :visible.sync="visible"
    title="批量导入"
    width="460px"
    :destroy-on-close="true"
    v-bind="$attrs"
    @close="dialogClose"
  >
    <el-row style="position: relative;">
      <el-col :span="22">
        <BaseUploadFile
          ref="import"
          class="toec-upload"
          :url="importUrl"
          :callback="callback"
          :change-percentage="changePercentage"
          :closeDialog="dialogClose"
        />
      </el-col>
      <el-col :span="6" class="custom-col">
        <!-- <el-button type="primary" plain @click="submit">导入模板下载</el-button>     -->
        <ExportFile :url="exportUrl" :btn-text="'导入模板下载'" />
      </el-col>
    </el-row>
    <!-- 进度条 -->
    <el-row style="margin-top: 20px">
      <el-col :span="22">
        <el-progress
          :text-inside="true"
          :percentage="percentage"
          :stroke-width="13"
          :color="progressColor"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="toec-btn-right">
        <el-button @click="dialogClose">{{ resetText }}</el-button>
        <el-button type="primary" @click="submit">{{ submitText }}</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import BaseUploadFile from '@/toec-component/basic-component/form/upload/base-upload-file'
export default {
  //      :http-request="_handleUploadFile"
  name: 'ImportFile',
  components: { BaseUploadFile },
  props: {
    dialogFlag: { type: Boolean, default: false },
    submitText: { type: String, default: '确定' },
    resetText: { type: String, default: '取消' },
    importUrl: { type: String, required: true },
    exportUrl: { type: String, required: true },
    callback: { type: Function, default: null }
    // on-change的使用不太对
  },
  data() {
    return {
      visible: false,
      progressColor: '#3377FF',
      percentage: 0
    }
  },
  watch: {
    dialogFlag() {
      this.visible = this.dialogFlag
    }
  },
  methods: {
    changePercentage(percentage) {
      this.percentage = percentage
    },
    dialogClose() {
      this.$emit('update:dialogFlag', false)
    },
    submit() {
      // const curFile = this.$refs[this.refName].uploadFiles[0]
      this.$refs.import.submit()
      // if (curFile && typeof this.handleUploadFile === 'function') {
      //   this.$emit('submit', curFile)
      // }
    },
    reset() {
      this.$refs.import.reset()
    },
    handlePreview() {
      console.log('handlePreview')
    },
    handleRemove() {
      console.log('handleRemove')
    }
  }

}
</script>

<style lang="scss" scoped>
.toec-margin-right{
  margin-right:1rem;
}

.toec-margin-left{
  margin-left:0.5rem;
}
.custom-col {
  position: absolute;
  left: 47%;
  // margin-left: -68px;
}
.el-dialog__body{
  padding-top: 15px;
}
.el-progress-bar__outer {
  background-color: #F2F6FC;
}
.el-progress-bar__innerText {
  color: #FEFEFF;
}
.el-dialog__title{
  font-size: 16px;
  color: #1F2E4D;
}
.el-upload-list__item-name{
  color: #3D4966;
}
.toec-upload {
  /deep/.el-button--medium {
    &:not(.el-button--text) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>

