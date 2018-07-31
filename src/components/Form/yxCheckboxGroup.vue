<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-checkbox-group v-model="form.props[prop]">
    <el-checkbox :key="opt.label+Math.random()" v-for="opt in config.options" :label="opt.value" :disabled="config.disabled || opt.disabled">{{opt.label}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
  export default {
    name: 'yxCheckboxGroup',
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
    data: function() {
      return {}
    },
    methods: {
    }
  }
</script>
