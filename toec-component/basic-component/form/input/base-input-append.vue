<template>
  <el-input v-model="formData[formKey]" :disabled="disabled">
    <template v-if="prependContent !== ''" slot="prepend">{{ prependContent }}</template>

    <template v-if="appendContent !== ''" slot="append">{{ appendContent }}</template>
  </el-input>
</template>

<script>
export default {
  name: 'BaseInputAppend',
  components: {},
  props: {
    formData: { type: Object, default: null },
    formKey: { type: String, default: '' },
    prependContent: { type: String, default: '' },
    appendContent: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  }
}
</script>
