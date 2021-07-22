<template>
  <el-tree
    :data="treeList"
    :props="codeProps"
    :node-key="nodeKey"
    @node-click="handleNodeClick"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
    :show-checkbox="treeType === 'checkbox'"
    highlight-current
    @check-change="handleCheckChange"
  ></el-tree>
</template>
<script>
export default {
  name: 'BaseTree',
  components: {},
  props: {
    //指定树标签的结构类型：common 、 checkbox 、
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    treeType: { type: String, default: 'checkbox' },
    //设置每个节点的子字节点数组和标签
    codeProps: {
      type: Object,
      default: () => {
        return {
          children: 'child',
          label: 'name'
        }
      }
    },
    nodeKey: { type: String, default: 'id' }, //指定树标签的结构索引,以String类型标记
    defaultExpandedKeys: { type: Array, default: () => [] }, // 默认展开的结构树，以索引数组为标记
    defaultCheckedKeys: { type: Array, default: () => [] }, // 默认选中的结构树，以索引数组为标记
    // treeList: { type: Array, required: true }, // 树中数组数据
    checkChangeFunction: { type: Function, default: () => {} }, // 处理框选选中数据的函数
    nodeClickFunction: { type: Function, default: () => {} } // 处理点选选中数据的函数
  },
  data() {
    return {
      treeList: [
        {
          name: '一级 1',
          child: [
            {
              name: '二级 1-1',
              child: [
                {
                  name: '三级 1-1-1'
                },
                {
                  name: '三级 1-1-2'
                }
              ]
            },
            {
              name: '二级 1-2',
              child: [
                {
                  name: '三级 1-2-1'
                },
                {
                  name: '三级 1-2-2'
                }
              ]
            }
          ]
        },
        {
          name: '一级 2',
          child: [
            {
              name: '二级 2-1',
              child: [
                {
                  name: '三级 2-1-1'
                }
              ]
            },
            {
              name: '二级 2-2',
              child: [
                {
                  name: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          name: '一级 3',
          child: [
            {
              name: '二级 3-1',
              child: [
                {
                  name: '三级 3-1-1'
                }
              ]
            },
            {
              name: '二级 3-2',
              child: [
                {
                  name: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleNodeClick(val) {
      if (typeof this.nodeClickFunction !== 'undefined') {
        this.nodeClickFunction(val)
      } else {
        console.log('未传递操作数据的函数')
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log('handleCheckChange, data', data)
      console.log('handleCheckChange, checked', checked)
      if (typeof this.checkChangeFunction != 'undefined') {
        this.checkChangeFunction(data, checked, indeterminate)
      } else {
        console.log('未传递操作数据的函数*')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toec-form {
  padding: 12px;
  background: white;
}
</style>
