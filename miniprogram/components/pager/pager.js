// components/pager/pager.js
Component({

  properties: {
    pagers:{
      type:Array,
      value:[]
    },
    currentPager: {
      type:Number,
      value:0
    }
  },

  data: {

    




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