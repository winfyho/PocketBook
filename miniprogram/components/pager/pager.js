// components/pager/pager.js
Component({

  properties: {

  },

  data: {

    pagers: [
      {
        name: "分类"
      },
      {
        name: "全部"
      },
      {
        name: "按天"
      },
      
      
    ],

    currentPager:0



  },


  methods: {
    changePager(e){
      // console.log(e.currentTarget.dataset);
      this.setData({
        currentPager: e.currentTarget.dataset.index
      })
      this.triggerEvent('pager', e.currentTarget.dataset,{})
    },
    incre(num){
      this.setData({
        currentPager:num
      })
    }
  }
})