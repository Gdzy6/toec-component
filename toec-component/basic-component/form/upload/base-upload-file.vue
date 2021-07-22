<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-upload
          ref="upload"
          v-loading="loading"
          :action="url"
          :limit="1"
          :auto-upload="autoUpload"
          :on-success="handleValidateMsg"
          :on-change="getFileName"
          :headers="headers"
        >
          <el-button size="medium" @click="setProgress">
            <i class="el-icon-plus" />选择导入文件
          </el-button>
          <div style="margin-top: 30px" slot="tip" class="el-upload__tip">{{ tips }}</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px" v-if="errorMsgData&&errorMsgData.length > 0">
      <el-col :span="24">
        <el-tag size="medium" type="danger">【导入信息异常】</el-tag>
        <BaseTable :fields="errorMsgTableFields" :table-data="errorMsgData" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BaseTable from '@/toec-component/basic-component/data/table/index'
import { getToken } from '@/utils/auth'
export default {
  //      :http-request="_handleUploadFile"
  // <el-button type="primary">{{ btnText }}</el-button>
  name: 'BaseUploadFile',
  components: { BaseTable },
  props: {
    btnText: { type: String, default: '选择文件' },
    url: { type: String, required: true },
    callback: { type: Function, default: null },
    fileHandler: { type: Function, default: () => {} },
    autoUpload: { type: Boolean, default: false },
    draggable: { type: Boolean, default: true },
    tips: {
      type: String,
      default: '【请确认excel模板中是否有多sheet页，填写完整再提交】'
    },
    changePercentage: { type: Function, default: () => {} },
    closeDialog: { type: Function, default: () => {} }
    // on-change的使用不太对
  },
  data() {
    return {
      visible: false,
      errorMsgTableFields: [
        // { type: 'selection' },
        { type: 'index' },
        { key: 'msg', title: '错误详情' }
      ],
      errorMsgData: [],
      loading: false,
      fileName: '',
      headers: {
        'x-author-key': getToken()
      },
      fileProgress: 0
    }
  },
  watch: {},
  methods: {
    submit() {
      // this.$store.dispatch('app/setLoad')
      this.loading = true
      this.$refs.upload.submit()

      this.fileProgress = 50
      if (this.changePercentage) {
        this.changePercentage(this.fileProgress)
      }
    },
    // @ApiDescription: 展示后端对excel文件的校验结果
    handleValidateMsg(response) {
      this.fileProgress = 100
      if (this.changePercentage) {
        this.changePercentage(this.fileProgress)
      }

      // this.$store.dispatch('app/cancelLoad')
      this.loading = false
      if (response.error) {
        this.errorMsgData = []
        response.msg.forEach(item => {
          this.errorMsgData.push({ msg: item })
        })
      } else {
        this.$message.success('导入成功')
        setTimeout(() => {
          this.closeDialog()
        }, 1000)

        if (this.callback) {
          this.callback(response)
        }
      }
    },
    reset() {
      this.$refs.upload.clearFiles()
      this.errorMsgData = []
    },
    getFileName(file, fileList) {
      this.fileProgress = file.percentage
      if (file) {
        this.fileName = file.name
        if (this.fileHandler) {
          this.fileHandler(this.fileName)
        }
      }
    },
    handlePreview() {
      console.log('handlePreview')
    },
    handleRemove() {
      console.log('handleRemove')
    },
    setProgress() {
      console.log(this)
    },
    // 查找到import-file组件
    findParent(curVueComponent) {}
  }
}
</script>

<style lang="scss" scoped>
.toec-upload {
  // margin-top: 2rem;
}
</style>
