<!--

  desc：表格类型模板

  使用方法:
  data里包含table属性,基本结构如下
  table: {
        data: [],
        select: {
            isSelectable: false,
            selectChange: function(){}
        },
        attributes: []
  }

  其中:
  data: 表格对应数据,当分页或刷新表格对应修改的是data的值
  select: 是否有行前复选框
       select.isSelectable为true则需要指定select.selectChange方法
       select.isSelectable为false则直接指定select.selectChange方法为一个空函数即可
        attributes: 标识表格头属性及显示title
       prop: 每列对应属性,
       label: 每列表格头显示文字
       fixed: 固定在左侧(left)还是固定在右侧(right)
       type: 每列的类型,为了保证表格的可扩展性,这里使用type作为标识每列内容形式,如下:
           index:客户端索引
           select:下拉选择框,options代表下拉选择框的value和label, select形式的内容不能用在带fixed定位的列表中,因为事件会触发3
               次,理由是fixed定位会创建3次,事件被绑定了3次,这属于ele里边的bug,在使用过程中避免这种用法.
           edit: 表示当前行可编辑,onEdit标识编辑后指定的行为
           tooltip: 提示信息，自己指定模板
           mapList: 表示有映射关系的value和label,options是映射列表
           custom: 表示有自定义事件的内容,options是按钮文字和行为的对象数组,title\onClick\type,type代表按钮类型,默认default
           photo: 表示图片形式的内容,返回值是图片url,展示为80*80的图片
           tags: 表示有多个值,对应多个value的形式,比如标签
           ifelse: 表示根据属性的不同展示不同的操作,比如状态为正常1时展示"屏蔽"对应操作,状态为不正常2时展示"恢复"对应操作
               没有type类型则是普通属性字段,正常展示
           ifelsetext: 同ifelse，只是显示的是普通文本，不是按钮；另外一个可以自定义样式
-->
<template>
  <el-table
    v-loading="loading" element-loading-text="加载中"
    :data="table.data" border stripe style="width:100%;"
    @selection-change="table.select.selectChange">
    <el-table-column
      v-if="table.select.isSelectable"
      type="selection"
      :selectable="table.select.selectable"
      width="40">
    </el-table-column>
    <el-table-column v-for="item in table.attributes"
                     :key="item.label"
                     v-if="!item.isHide"
                     :width="item.width"
                     :fixed="item.fixed"
                     :prop="item.prop"
                     :label="item.label"
                     :sortable="item.sortable"
                     :sort-method="item.sortMethod || function(){}"
                     :formatter="item.formatter">
      <template slot-scope="scope">
        <template v-if="item.type==='index'">
          {{scope.$index+1}}
        </template>
        <template v-else-if="item.type==='select'">
          <el-select :disabled="item.disabled"
                     v-model="scope.row[item.prop]"
                     @change="item.onChage(scope.$index, scope.row, item.prop, scope.row[item.prop])"
                     placeholder="请选择">
            <el-option v-for="opt in item.options" :key="opt.label" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type==='edit'">
          <lepopver :scope="scope" :item="item"></lepopver>
        </template>
        <template v-else-if="item.type==='tooltip'">
          <letooltip :scope="scope" :item="item"></letooltip>
        </template>
        <template v-else-if="item.type==='mapList'">
          <span :style="scope.row[item.prop] | filterOperation(item.options,1)">{{ scope.row[item.prop] | filterOperation(item.options)}}</span>
        </template>
        <template v-else-if="item.type==='buttons'">
          <el-button
            v-for="opt in item.options"
            :key="opt.title"
            :disabled="opt.disabled"
            :type="opt.type||'default'"
            :plain="opt.plain"
            size="small"
            @click="opt.onClick(scope.$index, scope.row)">
            {{opt.title}}
          </el-button>
        </template>
        <template v-else-if="item.type==='val2btn'">
          <template v-for="opt in item.options">
            <template v-if="opt.isNot">
              <el-button v-if="scope.row[opt.prop]!==opt.value" :disabled="opt.disabled" :plain="opt.plain"
                         :style="opt.style" :type="opt.type||'default'" size="small"
                         @click="opt.onClick(scope.$index, scope.row)">{{opt.title}}
              </el-button>
            </template>
            <template v-else>
              <el-button v-if="scope.row[opt.prop]===opt.value" :disabled="opt.disabled" :plain="opt.plain"
                         :style="opt.style" :type="opt.type||'default'" size="small"
                         @click="opt.onClick(scope.$index, scope.row)">{{opt.title}}
              </el-button>
            </template>
          </template>
        </template>
        <div style="text-align:center;" v-else-if="item.type==='photo'">
          <img :width="item.photoWidth || 50"
               :height="item.photoHeight || 50"
               style="vertical-align:middle;margin: 5px auto;border: 1px solid gray;"
               :src=scope.row[item.prop]>
        </div>
        <template v-else-if="item.type==='tags'">
          <el-tag
            style="margin-right:5px;"
            type="success"
            v-for="tag in scope.row[item.prop]"
            :key="tag">{{ tag | filterOperation(item.options)}}
          </el-tag>
        </template>
        <template v-else-if="item.type==='datetime'">
          {{ scope.row[item.prop] | setDateTime(item.prop)}}
        </template>
        <template v-else-if="item.type==='customFilter'">
          <div @click="item.onClick && item.onClick(scope.$index, scope.row, $event)"
               v-html="customFilter(scope.row[item.prop], item, scope.row)"></div>
        </template>
        <template v-else-if="item.type==='progress'">
          <el-progress :percentage="getCurrentProp(scope.row, item.prop)"></el-progress>
        </template>
        <template v-else>
          <div :style="item.style">{{getCurrentProp(scope.row, item.prop)}}</div>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import lepopver from './popver'
  import letooltip from './tooltip'

  export default {
    name: 'yxtable',
    props: ['table', 'loading'],
    filters: {
      /**
       * 过滤器,对应有值与title对应关系的数据进行映射
       * @param map
       * @param val
       * @returns {*}
       */
      filterOperation(val, map, style) {
        for (var i = 0; i < map.length; i++) {
          var cur = map[i]
          if (cur.value === val) {
            if (style) {
              return cur.style
            }
            return cur.label
          }
        }
        return '暂无'
      },
      /*
      *
      * 过滤器，将时间戳转成时间格式 2017-02-09 20:22:14
      *
      * */
      setDateTime(val) {
        var newdate = ''
        if (val) {
          var date = new Date(val)
          if (!date) {
            return ''
          }
          var YYYY = date.getFullYear()
          var mm = date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
          var dd = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())
          var hh = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())
          var MM = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())
          var ss = date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds())
          newdate = YYYY + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss
        }
        return newdate
      }
    },

    data() {
      return {}
    },

    methods: {
      /**
       * 获取当前属性，如果通过.连接，需要下方属性
       * 目前只支持普通属性的展示使用
       */
      getCurrentProp(row, prop) {
        var resArr = prop.split('.')
        var result = ''
        if (prop.indexOf('.') === -1) {
          return row[prop]
        } else {
          result = row[resArr[0]]
          for (var i = 1; i < resArr.length; i++) {
            result = result && result[resArr[i]]
          }
          return result
        }
      },
      /**
       * 自定义过滤器
       */
      customFilter(val, item, row) {
        if (item && item.filter) {
          return item.filter(val, row)
        } else {
          return val
        }
      }
    },

    components: {
      lepopver: lepopver,
      letooltip: letooltip
    }
  }
</script>

<style scoped>

</style>
