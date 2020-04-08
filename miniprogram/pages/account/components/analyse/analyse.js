// pages/account/components/analyse/analyse.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:Object,
      value:{
        total:"总计",
        max:"最大",
        avg:"平均"
      }
    },
    total:{
      type:Number,
      value:1000
    },
    avg:{
      type:Number,
      value:10
    },
    fontColor:{
      type:String,
      value:"#86BAA3"
    }
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
