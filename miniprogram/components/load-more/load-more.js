// components/load-more/load-more.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active:{
      type:Boolean,
      value:true
    },
    clickMsg: {
      type: String,
      value: "加载更多..."
    },
    disableMsg: {
      type: String,
      value: "已经到底了~"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
