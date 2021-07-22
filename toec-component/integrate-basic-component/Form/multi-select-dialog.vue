<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :before-close="onClose">
    <div>
      <el-row class="separate-div">
        <el-checkbox
          v-model="checkAll"
          border
          style="font-weight: bolder;"
          :indeterminate="isIndeterminate"
          label="全选"
          @change="handleAllChange"
        />
      </el-row>

      <el-row class="separate-div">
        <el-col :span="6">
          <el-checkbox-group v-model="selectedData" @change="handleCheckedDataChange">
            <div v-for="(item, index) in tableData" :key="index">
              <el-checkbox
                v-if="index < (tableData.length / 4)"
                style="margin-bottom: 10px"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-col>
        <el-col :span="6">
          <el-checkbox-group v-model="selectedData" @change="handleCheckedDataChange">
            <div v-for="(item, index) in tableData" :key="index">
              <el-checkbox
                v-if="index < (tableData.length / 4) * 2 && index >= tableData.length / 4"
                style="margin-bottom: 10px"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-col>
        <el-col :span="6">
          <el-checkbox-group v-model="selectedData" @change="handleCheckedDataChange">
            <div v-for="(item, index) in tableData" :key="index">
              <el-checkbox
                v-if="index < (tableData.length / 4) * 3 && index >= (tableData.length / 4) * 2"
                style="margin-bottom: 10px"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-col>
        <el-col :span="6">
          <el-checkbox-group v-model="selectedData" @change="handleCheckedDataChange">
            <div v-for="(item, index) in tableData" :key="index">
              <el-checkbox
                v-if="index < (tableData.length / 4) * 4 && index >= (tableData.length / 4) * 3"
                style="margin-bottom: 10px"
                :label="item.value"
              >{{item.label}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row style="text-align: right">
        <el-button size="medium" @click="onClose">取消</el-button>
        <el-button type="primary" size="medium" @click="confirmData(selectedData)">确定</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>



<script>
// import { Message } from 'element-ui'
// import { mapGetters } from 'vuex'
export default {
  name: 'MultiSelectDialog',
  components: {},
  props: {
    // selectedData: Array,
    title: { type: String, default: '' },
    tableData: { type: Array, required: true },
    dialogVisible: { type: Boolean, required: true },
    confirmData: { type: Function, required: true },
    width: { type: String, default: '50%' },
    originSelectData: { type: Array, default: () => [] }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      selectedData: []
    }
  },
  computed: {},
  watch: {
    originSelectData: {
      handler(val) {
        this.selectedData = val
      },
      deep: true
    }
  },

  methods: {
    onClose() {
      this.$emit('close')
    },

    handleAllChange(val) {
      this.selectedData = val ? this.tableData.map(item => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedDataChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.tableData.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableData.length
    },
    // 从父级组件设置子组件的selectedData
    setSelectData(data) {
      console.log('data', data)
      this.selectedData = data
    }
  }
}
</script>

<style>
.show-font {
  text-align: center;
  color: #909399;
}
.line {
  height: 10px;
  border-bottom: 1px solid #dfe6ec;
}
.port-config {
  margin: 10px;
}
.show-div {
  width: 100%;
  overflow: auto;
}

.vertical-table {
  font-size: 0;
  margin-left: 3%;
}

.vertical-table label {
  width: 140px;
  color: #777;
}

.short-label {
  width: 80px;
  color: #777;
}

.vertical-table .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.vertical-table .el-input {
  width: 120px;
}

.separate-div {
  margin-bottom: 40px;
}
</style>
