<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-input
    v-model="form.props[prop]"
    :style="config.style"
    :type="config.type"
    :placeholder="config.placeholder"
    :disabled="config.disabled"
    @keyup.native.enter="onEnter"
    @blur="trimValue">
  </el-input>
</template>

<script>
  export default {
    name: 'yxInput',
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
      onEnter: function(env) {
        this.config.onEnter && this.config.onEnter.call(null, env)
      },

      // 当输入框失去焦点时，要去掉字符两端的空格
      trimValue: function() {
        this.form.props[this.prop] = this.form.props[this.prop].trim()
        if (this.config.onBlur && typeof this.config.onBlur === 'function') {
          this.form.props[this.config.prop] = this.config.onBlur(this.config.props[this.prop])
        }
      }
    }
  }
</script>
