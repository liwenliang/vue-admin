<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-select :style="config.style || inputStyle" v-model="form.props[prop]" @change="onSelectChange"
             :placeholder="config.placeholder">
    <el-option-group v-for="opt in config.options" :key="opt.label+Math.random()" :label="opt.label">
      <el-option v-for="optItem in opt.options" :key="optItem.label+Math.random()" :disabled="optItem.disabled" :label="optItem.label"
                 :value="optItem.value"></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    name: 'yxGroupSelect',
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
        inputStyle: 'width:253px;'
      }
    },
    methods: {
      onSelectChange(val) {
        this.config.onChange && this.config.onChange.call(null, val)
      }
    }
  }
</script>
