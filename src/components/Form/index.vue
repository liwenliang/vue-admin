<template>
  <el-form ref="leform" :model="form.props" :inline="form.inline" :label-position="form.labelPosition"
           :label-width="form.labelWidth">
    <template v-for="item in form.attributes" v-if="!item.isHide">
      <!-- 默认情况就是输入框 -->
      <el-form-item :label="item.label" :prop="item.prop" :rules="getRules(item.rules)" :style="form.style">
        <component :is="item.type" :form="form" :prop="item.prop" :config="item.config"></component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  import components from './index.js'
  import { isNumeric } from '@/utils/index'

  export default {
    name: 'yxform',
    components: components,
    data() {
      return {
        required: { required: true, message: '此处为必填值' },
        email: { type: 'email', message: '请输入正确的邮箱地址' },
        number: {
          validator: function(rule, value, callback) {
            if (isNumeric(value) || value === '' || value === null) {
              callback()
            } else {
              callback(new Error('该项须填写数字类型值'))
            }
          }
        },
        int: {
          validator: function(rule, value, callback) {
            if (parseInt(value, 10) === value || value === '' || value === undefined) {
              callback()
            } else {
              callback(new Error('请输入整数类型值'))
            }
          }
        },
        url: { type: 'url', message: '请输入正确网址类型值' }
      }
    },
    props: ['form', 'emitValidate', 'emitReset'],
    watch: {
      // 监听到该属性的变化则进行表单验证
      emitValidate() {
        this.$refs['leform'].validate((valid) => {
          if (valid) {
            this.form.validateSuccess()
          } else {
            this.form.validateFaild()
          }
        })
      },
      // 监听到该属性的变化则进行表单重置
      emitReset() {
        this.$refs['leform'].resetFields()
      }
    },
    methods: {
      getRules(ruleArr) {
        if (!ruleArr) {
          return []
        }
        var rules = []
        for (var i = 0; i < ruleArr.length; i++) {
          var item = ruleArr[i]
          if (this[item]) {
            rules.push(this[item])
          }
        }
        return rules
      }
    }
  }
</script>

<style scoped>

</style>
