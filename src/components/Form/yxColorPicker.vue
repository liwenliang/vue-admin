<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <div>
    <el-input
      v-model="form.props[prop]"
      :style="config.style || inputStyle"
      :placeholder="config.placeholder"
      :disabled="true"
      @keyup.native.enter="config.onEnter || function(){}"
      @blur="trimValue"
    >
      <el-color-picker
        slot="append"
        v-model="form.props[prop]"
        size="mini"
        :show-alpha="config.alpha"
        :disabled="config.disabled"
        @change="config.onChange || function(){}">
      </el-color-picker>
    </el-input>
  </div>
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
    data() {
      return {
        inputStyle: 'width:220px'
      }
    },
    methods: {
      // 当输入框失去焦点时，要去掉字符两端的空格
      trimValue() {
        this.form.props[this.prop] = this.form.props[this.prop].trim()
      }
    }
  }
</script>
