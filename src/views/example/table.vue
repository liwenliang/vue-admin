<template>
  <div class="app-container">
    <yxtable :table="table1"></yxtable>
    <yxtable :table="table2"></yxtable>
  </div>
</template>

<script>
  import yxtable from '@/components/Table/index.vue'

  export default {
    components: {
      yxtable
    },
    data() {
      return {
        table1: {
          data: [
            {
              id: '123456',
              status: '1',
              custom: 'custom',
              name: '张三',
              bought: '1',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487695862000,
              tags: ['1', '2', '3', '4']
            },
            {
              id: '1',
              status: '2',
              custom: 'custom',
              name: '李四',
              bought: '0',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487692862000,
              tags: ['1', '2', '3', '4']
            },
            {
              id: '456456',
              status: '1',
              custom: 'custom',
              name: '王五',
              bought: '1',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487693862000,
              tags: ['1', '2', '3', '4']
            },
            {
              id: '456456',
              status: '1',
              custom: 'custom',
              name: '王五',
              bought: '0',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487694862000,
              tags: ['1', '2', '3', '4']
            }
          ],
          select: {
            isSelectable: false,
            selectChange: function() {
            }
          },
          attributes: [
            {
              prop: '',
              label: 'client索引',
              fixed: 'left',
              type: 'index'
            },
            {
              prop: 'id',
              label: '普通属性'
            },
            {
              prop: 'name',
              label: '可编辑属性',
              type: 'edit',
              onEdit: this.onEdit
            },
            {
              prop: 'status',
              label: 'value映射label',
              type: 'mapList',
              options: [
                {
                  value: '1',
                  label: '已购买'
                },
                {
                  value: '2',
                  label: '未购买'
                }
              ]
            },
            {
              prop: '',
              label: '自定义text按钮',
              type: 'custom',
              options: [
                {
                  title: '设置',
                  onclick: this.onclick
                },
                {
                  title: '设置2',
                  onclick: this.onclick
                }
              ]
            },
            {
              prop: '',
              label: '自定义primary按钮',
              type: 'custom',
              options: [
                {
                  title: '设置',
                  type: 'primary',
                  onclick: this.onclick
                }
              ]
            },
            {
              prop: 'bought',
              label: '值定义操作按钮',
              type: 'ifelse',
              width: '250',
              options: [
                {
                  prop: 'status',
                  title: '已经购买',
                  value: '1',
                  onclick: this.onclick
                },
                {
                  prop: 'status',
                  title: '再次购买',
                  type: 'primary',
                  value: '1',
                  onclick: this.buyAgain
                },
                {
                  prop: 'status',
                  title: '评价',
                  type: 'warn',
                  value: '1',
                  onclick: this.discuss
                },
                {
                  prop: 'status',
                  title: '未购买,点击购买',
                  type: 'primary',
                  value: '2',
                  onclick: this.onclick
                }
              ]
            },
            {
              prop: 'photo',
              label: '图片url形式',
              type: 'photo'
            },
            {
              prop: 'datetime',
              label: '日期时间格式',
              type: 'datetime'
            },
            {
              prop: 'tags',
              label: '多项映射关系',
              type: 'tags',
              options: [
                {
                  value: '1',
                  label: 'web'
                },
                {
                  value: '2',
                  label: 'phone'
                },
                {
                  value: '3',
                  label: '超级手机'
                },
                {
                  value: '4',
                  label: 'pad'
                }
              ]
            }
          ]
        },
        table2: {
          data: [
            {
              id: '123456',
              name: '张三',
              select: '0',
              person: {
                age: 23,
                name: {
                  abc: '222'
                }
              }
            },
            {
              id: '234567',
              name: '李四',
              select: '1',
              person: {
                age: 43,
                name: {
                  abc: '222'
                }
              }
            },
            {
              id: '345678',
              name: '王五',
              select: '2',
              person: {
                age: 33
              }
            },
            {
              id: '456789',
              name: '赵六',
              select: '3',
              person: {
                age: 22
              }
            }
          ],
          select: {
            isSelectable: true,
            selectChange: this.onselectchange
          },
          attributes: [
            {
              prop: '',
              label: 'client索引',
              type: 'index'
            },
            {
              prop: 'id',
              label: '普通属性id',
              sortable: true
            },
            {
              prop: 'name',
              label: '普通属性name',
              sortable: true
            },
            {
              prop: 'person.age',
              label: '对象下属性person.age'
            },
            {
              prop: 'select',
              label: '下拉选择',
              type: 'select',
              onChange: this.onchange,
              options: [
                {
                  value: '0',
                  label: '乐视网'
                },
                {
                  value: '1',
                  label: '爱奇艺'
                },
                {
                  value: '2',
                  label: '优酷土豆'
                },
                {
                  value: '3',
                  label: 'youtube'
                }
              ]
            }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      /**
       * list列表中下拉选择行为触发事件
       * @param $index        当前行的索引
       * @param row           当前行的数据
       * @param prop          当前值得属性字段
       * @param value         当前属性字段的值
       */
      onchange($index, row, prop, value) {
        console.log('$index', $index)
        console.log('row', row)
        console.log('prop', prop)
        console.log('value', value)
      },

      onclick($index, row) {
        console.log('click')
        console.log('$index', $index)
        console.log('row', row)
      },

      discuss() {
        console.log('discuss')
      },

      buyAgain() {
        console.log('buyAgain')
      },

      onEdit($index, row, prop, value) {
        console.log('$index', $index)
        console.log('row', row)
        console.log('prop', prop)
        console.log('value', value)
      },

      /**
       * 带复选框列表复选时触发的事件
       */
      onselectchange(dataArray) {
        console.log(JSON.stringify(dataArray, true, '  '))
      }
    }
  }
</script>
