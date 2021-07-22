<!-- 
@created by taoting on 2021-07-12
@description 图片上传组件
 -->
<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      v-loading="loading"
      :action="url"
      :show-file-list="false"
      :limit="1"
      list-type="picture"
      :auto-upload="true"
      :on-success="handleAvatarSuccess"
      :headers="headers"
      v-bind="$attrs"
    >
    <!-- :before-upload="beforeAvatarUpload" -->
      <div>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <template v-else>
          <div class="avatar-uploader-icon">
            <div style="margin-top: 34px;font-size: 28px;">
              <i class="el-icon-plus"></i>
            </div>
            <span>点击上传</span>
          </div>
        </template>
        <span class="upload-tips">只能上传jpg/png文件，且不超过500kb</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'BaseUploadImg',
  props: {
    url: { type: String, required: true },
    callback: { type: Function, default: null },
    fileHandler: { type: Function, default: () => {} },
    draggable: { type: Boolean, default: true },
    changePercentage: { type: Function, default: () => {} },
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
      fileProgress: 0,
      imageUrl: ''
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

        if (this.callback) {
          this.callback(response)
        }
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt500kb = file.size  < 500;

      if (!isJPG) {
        this.$message.error('只能上传jpg/png文件!');
      }
      if (!isLt500kb) {
        this.$message.error('上传文件大小不能超过 500kb!');
      }
      return isJPG && isLt500kb;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    :hover {
      border-color: #409EFF;
    }
  }
}
.avatar-uploader-icon {
  display: inline-block;
  //font-size: 28px;
  color: #3377ff;
  width: 114px;
  height: 114px;
  //line-height: 114px;
  text-align: center;
  border: 1px dashed #3377ff;
  border-radius: 4px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-tips {
  vertical-align: bottom;
  margin-left: 14px;
  color: #b4bccc;
}
</style>
