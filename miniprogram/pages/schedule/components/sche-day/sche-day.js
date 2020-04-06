// pages/schedule/components/sche-day/sche-day.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dayItem: {
      type: Object,
      value: {}
    },
    month:{
      type:Number,
      value:0
    },
    day:{
      type:Number,
      value:0
    },
    records:{
      type:Array,
      value:[]
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    day:"",
    month:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show:function(){
      
    }
  }
})
