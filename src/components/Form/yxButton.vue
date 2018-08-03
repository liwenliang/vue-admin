<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <div>
    <el-button v-for="opt in config.options" :key="opt.label+Math.random()" :type="opt.type"
               @click="opt.onclick">{{opt.label}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'yxButton',
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
      return {}
    }
  }
</script>
