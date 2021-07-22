<template>
  <!-- width="160px" -->
  <el-table-column :key="index" :align="columnaAlign" v-bind="column" :show-overflow-tooltip="showOverflowTooltip" v-on="$listeners">
    <template slot="header" slot-scope="scope">
      <free-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader" />
      <span v-else>{{ column.title }}</span>
    </template>

    <!-- <template slot-scope="scope">
      <el-input
        v-model="scope.row[formItems.key]"
        clearable
        style="display: inline"
      />
    </template>-->

    <template v-slot="scope">
      <!-- <component
        :is="column.component"
        v-if="column.component"
        v-model="scope.row[column.component.key]"
        v-bind="getCptBind(scope, column)"
        v-on="column.listeners"
      />-->
      <div v-if="column.components">
        <el-form ref="form" class="toec-form" :model="scope.row" v-bind="$attrs" v-on="$listeners">
          <el-col v-for="(item) in formItems" :key="item.index">
            <el-form-item v-if="item._ifRender" :rules="item._rule" :prop="item.key">
              <component
                :is="item.compType"
                v-model="scope.row[item.key]"
                :options="item.options"
                v-bind="item.props"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <free-render v-else :scope="scope" :render="column.render" />
    </template>
  </el-table-column>
</template>

<script>
// || Math.ceil(24 / formItems.length)
import FreeRender from './render'
import CellForced from './forced'
import { computeFormItem } from '@/toec-component/basic-component/form/json-form/core'

export default {
  name: 'BaTableColumn',
  components: {
    FreeRender,
    BaseSelect: () =>
      import('@/toec-component/basic-component/form/select/base-select')
  },
  props: {
    column: {
      type: Object,
      default: () => {}
    },
    index: { type: Number, required: true }
  },
  computed: {
    formItems(scope) {
      const componentList = this.column.components
      const itemList = []
      if (this.column.components && componentList.length > 0) {
        for (let idx = 0; idx < componentList.length; idx++) {
          let component = componentList[idx]
          let item = computeFormItem(component, scope.row)
          Object.assign(item, { index: idx })
          if (item) {
            itemList.push(item)
          }
        }
        componentList.forEach(component => {
          const item = computeFormItem(component, scope.row)
          if (item) {
            itemList.push(item)
          }
        })
      }
      return itemList
    },
    columnaAlign() {
      return this.column.align ? this.column.align : 'center';
    },
    showOverflowTooltip() {
      return this.column.title != '操作';
    }
  },
  watch: {
    column: {
      handler: 'renderColumn',
      immediate: true
    }
  },
  methods: {
    renderColumn() {
      const { column } = this
      // 多选：selection / 索引：index / 展开的按钮：expand
      if (
        column.type === 'selection' ||
        column.type === 'index' ||
        column.type === 'expand'
      ) {
        if (column.type !== 'index') { // 类型是索引时，不给其赋值renderHeader，可以走到展示column.title的逻辑。
                                       // 因为它不会执行赋的renderHeader，而是执行table-column组件内部的该函数
          column.renderHeader = CellForced[column.type].renderHeader
        }
        column.render = column.render || CellForced[column.type].renderCell
      }
      // 格式化内容
      if (column.formatter) {
        column.render = (h, scope) => {
          return (
            <span>
              {scope.column.formatter(
                scope.row,
                scope.column,
                scope.row[scope.column.property],
                scope.$index
              )}
            </span>
          )
        }
      }
      // 渲染成text
      if (!column.render) {
        column.render = (h, scope) => {
          return <span>{scope.row[column.key]}</span>
        }
      }
      return column
    },

    getCptBind({ row, column }, col) {
      const props = { row, col, column }
      // propsHandler: 对props传入的参数进行进一步处理
      const handler = col.propsHandler
      // 如果有propsHandler，则调用处理后返回；没有则直接返回props
      return (handler && handler(props)) || props
    },

    handleChange() {
      console.log('handleChange')
    }
  }
}
</script>

<style lang='scss'>
.toec-form {
  padding: 12px;
  background: white;
}
</style>
