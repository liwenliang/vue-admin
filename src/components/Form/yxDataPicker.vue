<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-date-picker
    v-model="form.props[prop]"
    :style="config.style"
    :type="config.type"
    :placeholder="config.placeholder"
    :picker-options="config.pickerOptions"
    :disabled="config.disabled"
    :format="config.format"
    :value-format="config.valueFormat"
  >
  </el-date-picker>
</template>

<script>
  export default {
    name: 'yxDataPicker',
    props: {
      form: {
        type: Object
      },
      prop: {
        type: String
      },
      config: {
        type: Object
      }
    },
    data() {
      return {
      }
    }
  }
</script>
