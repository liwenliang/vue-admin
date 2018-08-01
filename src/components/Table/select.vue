<template>
  <div @click="clickEdit">
    <el-select v-model="value" @change="onChange" placeholder="请选择">
      <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'select',
    props: ['scope', 'item'],
    data: function() {
      return {
        value: this.scope.row[this.item.prop],
        isInit: true
      }
    },
    watch: {
      'scope': function() {
        this.value = this.scope.row[this.item.prop]
      }
    },
    methods: {
      clickEdit: function() {
        this.isInit = false
      },
      onChange: function() {
        var self = this
        var item = this.item || null
        if (item && !this.isInit && item.onChange && typeof item.onChange === 'function') {
          item.onChange(self.scope.row, self.value, self.scope, self.item)
          self.isInit = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
