<template>
  <div>
    <!-- <el-divider content-position="center">详细信息列表</el-divider> -->
    <el-table
      v-loading="loading"
      class="toec-table"
      element-loading-text="数据正在加载中"
      :data="tableData"
      v-bind="$attrs"
      tooltip-effect="light"
      @selection-change="selectChangeHandler"
    >
      <template v-for="(item, index) in newFields">
        <el-table-column
          v-if="item.options && item.options.length > 1"
          :key="index"
          :label="item.title"
          :prop="item.key"
          align="center"
          v-bind="item"
        >
          <template v-slot="scope">
            <el-tag
              :type="getLabelType(item.options, scope.row[item.key])"
            >{{ getLabel(item.options, scope.row[item.key]) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.slot" :key="index" v-bind="item" v-on="$listeners">
          <template slot-scope="scope">
            <slot :name="item.key" v-bind="scope" />
          </template>
        </el-table-column>
        <BaseTableColumn v-else :key="index" :column="item" :index="index" :form="form" />
      </template>
    </el-table>
  </div>
</template>

<script>
import { getTableFields } from './core'
import BaseTableColumn from './base-table-column'

function noop() {}

export default {
  name: 'BaseTable',
  components: { BaseTableColumn },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      default: () => []
    },
    selectHandler: { type: Function, default: null },
    selectKey: { type: String, default: '' }
    // width: { type: String, default: '600px' }
  },
  data() {
    return {
      loading: false,
      list: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      form: {}
    }
  },
  computed: {
    // 为了兼容一些方法需要取column中的property，所以需要给每一项增加prop
    newFields() {
      return getTableFields(this.fields).map(i => ({ ...i, prop: i.key }))
    }
  },
  mounted() {},
  methods: {
    getData() {
      const { api, params, currentPage, pageSize, hasPagination } = this
      if (!api) return
      const filterParams = {
        ...params
      }
      if (hasPagination) {
        filterParams.page = currentPage
        filterParams.rows = pageSize
      }
      this.loading = true
      api(filterParams)
        .then(res => {
          // 因为后端团队不同，返回的数据结构也不同，请自行处理
          if (res.status === 'success') {
            if (Array.isArray(res.data)) {
              this.list = res.data
              return
            }
            const { total, list } = res.data
            this.list = list
            this.total = total
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    getSelection() {
      return this.$refs.table.selection
    },

    getLabel(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.label : ''
    },

    getLabelType(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.type : ''
    },
    // 处理选中数据
    selectChangeHandler(val) {
      if (val.length > 0) {
        let finalVal = val
        if (this.selectHandler) {
          if (this.selectKey) {
            // 按照selectKey进行map
            // 验证selectKey是否合法
            if (val[0][this.selectKey]) {
              finalVal = val.map(item => item[this.selectKey])
            }
          }
          this.selectHandler(finalVal)
        }
      } else {
        this.selectHandler([])
      }
    }
  }
}
</script>

<style scoped>
.table-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.toec-table {
  /* margin-left: 12px; */
  margin-top: 1.5em;
  /* width: 96%; */
  width: 100%;
  font-size: 0.9em;
}
.toec-table .header {
  font-size: 2em;
}
.toec-table th > .cell {
  display: inline-block;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: unset;
}
</style>
