<template>
  <el-popover v-model="visible">
    <el-input size="mini" v-model="scope.row[item.prop]" :placeholder="item.placeholder||'请输入新值,并点击确定'"
              @keyup.native.enter="onEdit"></el-input>
    <div style="text-align: right; margin: 5px 0;">
      <el-button size="mini" type="text" @click="onCancel">取消</el-button>
      <el-button type="primary" size="mini" @click="onEdit">确定</el-button>
    </div>
    <span slot="reference">
        <el-tag type="success">{{ scope.row[item.prop] }}</el-tag>
    </span>
  </el-popover>
</template>

<script>
  export default {
    name: 'popver',
    props: {
      scope: {
        type: Object
      },
      item: {
        type: Object
      }
    },

    data: function() {
      return {
        visible: false,
        value: this.scope.row[this.item.prop]
      }
    },
    watch: {
      'scope': function() {
        this.value = this.scope.row[this.item.prop]
      }
    },

    methods: {
      /**
       * 点击取消，关闭弹框，重置数据
       */
      onCancel: function() {
        this.visible = false
        this.emitReset()
      },

      /**
       * 提交数据，关闭弹框，遇到输入不合法，重置数据
       */
      onEdit: function() {
        var changeSuccess = this.item.onEdit(this.scope.$index, this.scope.row, this.item.prop,
          this.scope.row[this.item.prop])
        if (!changeSuccess && typeof changeSuccess !== 'undefined') {
          this.emitReset()
        } else {
          this.value = this.scope.row[this.item.prop]
          this.visible = false
        }
      },

      emitReset: function() {
        this.scope.row[this.item.prop] = this.value
      }
    }
  }
</script>

<style scoped>

</style>
