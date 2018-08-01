<!--
/**
 * tooltip提示框
 *
 * type: tooltip
 * item: 传入的配置参数
 *  item.placement  提示框位置
 *  item.effect     主题
 *  item.visible    是否可见
 *  item.template   提示信息模板,其中大写的ITEM_PROP为占位字段
 *
 */
-->
<template>
  <el-tooltip :placement="placement" :effect="effect" v-model="visible">
    <div slot="content" v-html="template">
    </div>
    <span @click="onClick" :style="item.style || ''">{{ scope.row[item.prop] }}</span>
  </el-tooltip>
</template>

<script>
  export default {
    name: 'tooltip',
    props: {
      scope: {
        type: Object
      },
      item: {
        type: Object
      }
    },
    watch: {
      'scope': function() {
        this.template = this.item.template.replace(/ITEM_PROP/g, this.scope.row[this.item.prop])
      }
    },
    data: function() {
      return {
        visible: this.item.visible || false,
        placement: this.item.placement || 'top',
        effect: this.item.effect || 'light',
        template: this.item.template.replace(/ITEM_PROP/g, this.scope.row[this.item.prop])
      }
    },
    methods: {
      onClick: function() {
        this.item.onClick && this.item.onClick(this.scope.$index, this.scope.row)
      }
    }
  }
</script>

<style scoped>

</style>
