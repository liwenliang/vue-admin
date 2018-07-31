<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-select
    :style="config.style || inputStyle"
    v-model="form.props[prop]"
    @change="onSelectChange"
    :multiple="config.multiple"
    :filterable="config.filterable"
    :allow-create="config.allowCreate"
    :multiple-limit="config.limit || 0"
    :placeholder="config.placeholder"
    :disabled="config.disabled">
    <el-option v-for="opt in config.options" :key="opt.value" :disabled="opt.disabled" :label="opt.label" :value="opt.value"></el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'yxSelect',
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
      onSelectChange(val) {
        this.item.onChange && this.item.onChange.call(null, val)
      }
    }
  }
</script>
