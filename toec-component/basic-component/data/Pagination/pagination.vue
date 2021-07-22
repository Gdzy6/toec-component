<template>
  <div class="toec-page">
    <el-pagination
      background
      :total="pageObj.total"
      :current-page="pageObj.page"
      :page-sizes="pageObj.pageSizeList"
      :page-size="pageObj.size"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next, sizes, total, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pageObj: Object,
    pageChange: Function
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageObj.size = val
      // console.log(`pageObj.curPageSize`, this.pageObj.curPageSize)
      this.pageChange(this.pageObj)
    },
    handleCurrentChange(val) {
      // console.log(`当前页 ${val} `)
      this.pageObj.page = val
      this.pageChange(this.pageObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.toec-page{
  margin-top: 40px;
  margin-right: 50px;
  text-align: center;

  /deep/.el-pagination {
    font-weight: 400;

    &.is-background {
      .btn-prev, .btn-next {
        padding: 0 19px;
        height: 40px;
        color: #1F2E4D;
        line-height: 40px;
        border: 1px solid #8F9BB2;
        border-radius: 4px;
        background-color: #fff;

        &:disabled{
          color: #1F2E4C;
          opacity: 0.8;
        }
      }
      .el-pager{
        li {
          // padding: 0 ;
          height: 40px;
          min-width: 40px;
          line-height: 40px;
          border: 1px solid #8F9BB2;
          border-radius: 4px;
          background-color: #fff;

          &:not(.disabled).active {
            background: #F2F6FC;
            border-color: #3377FF;
            color: #3377FF;
          }
        }
      }
    }

    span:not([class*=suffix]), button {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }

    .el-input--mini {
      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
    .el-pagination__editor.el-input{
      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
  }

}
</style>
