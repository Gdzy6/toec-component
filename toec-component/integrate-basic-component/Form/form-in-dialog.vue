<template>
  <el-dialog
    :visible.sync="visible"
    :title="dialogTitle"
    :width="dialogWidth"
    :destroy-on-close="true"
    v-bind="$attrs"
    @close="dialogClose"
  >
    <JsonForm
      ref="form"
      :origin-form="originForm"
      :fields="fields"
      :col-num="colNum"
      v-bind="$attrs"
      @submit="submitHandler"
    />
  </el-dialog>
</template>
<script>
import JsonForm from '@/toec-component/basic-component/form/json-form/index'

export default {
  name: 'FormInDialog',
  components: {
    JsonForm
  },
  props: {
    originForm: { type: Object, default: () => {} },
    dialogTitle: { type: String, default: '' },
    dialogFlag: { type: Boolean, default: false },
    dialogWidth: { type: String, default: '50%' },
    colNum: { type: Number, default: 2 },
    fields: { required: true, type: Array },
    submitHandler: { required: true, type: Function }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    dialogFlag() {
      this.visible = this.dialogFlag
    }
  },
  mounted() {

  },
  methods: {
    dialogClose() {
      this.$emit('update:dialogFlag', false)
    }
  }
}
</script>
