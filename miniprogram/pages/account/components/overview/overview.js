// pages/account/acc-components/overview/overview.js
const app = getApp();
const db = wx.cloud.database();
const todos = db.collection("todos");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    outcomeCats: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curPager: 0,
    totalList: [],
    dayList: [],
    month:new Date().getMonth()+1,
    categorys: {
      income: [{
          name: "收入",
          imgurl: "income"
        },
        {
          name: "工资",
          imgurl: "salary"
        },
        {
          name: "兼职",
          imgurl: "parttime"
        },
        {
          name: "奖金",
          imgurl: "bonus"
        },
        {
          name: "人情",
          imgurl: "relation"
        },
        {
          name: "理财",
          imgurl: "financial"
        },
      ],
      outcome: [{
          name: "支出",
          imgurl: "outcome"
        }, {
          name: "吃饭",
          imgurl: "eat"
        }, {
          name: "零食",
          imgurl: "snack"
        }, {
          name: "购物",
          imgurl: "shop"
        }, {
          name: "娱乐",
          imgurl: "ent"
        }, {
          name: "交通",
          imgurl: "traffic"
        },
        {
          name: "住房",
          imgurl: "rent"
        }, {
          name: "居家",
          imgurl: "house"
        }, {
          name: "宠物",
          imgurl: "pet"
        }, {
          name: "医疗",
          imgurl: "hospital"
        }, {
          name: "学习",
          imgurl: "study"
        }, {
          name: "其他",
          imgurl: "others"
        },
      ],

    },
    inProList: [],
    outProList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changePager(res) {
      console.log("view-changePager", res.detail);
      this.setData({
        curPager: res.detail.index
      })
    },


  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      const $ = db.command.aggregate;
      const _ = db.command;
      let m = new Date().getMonth()+1;
      let month = m < 10 ? '0' + m : m;

      let startDate = `2019-${month}-01`
      console.log("startDate",startDate)
      db.collection('todos')
        .aggregate()
        .match({
          _openid: app.globalData.openid,
          item: {
            date: _.gte(startDate),
            type:"outcome"
          }
        })
        .group({
          _id: '$item.category',
          // type: '$item.category.type',
          value: $.sum('$item.number'),
          type: $.first('$item.type'),

          percent: $.sum(0)
        })
        .sort({
          value: -1
        })
        .end().then(res => {
          let list = res.list;
          let base = list[0].value;
          for (let i = 0; i < list.length; i++) {
            list[i].percent = parseFloat(list[i].value / base) * 100
          }
          console.log(list)
          this.setData({
            outProList: list
          })

        })
        .catch(err => {
          console.log(err)
        })

      db.collection('todos')
        .aggregate()
        .match({
          _openid: app.globalData.openid,
          item: {
            date: _.gte(startDate),
            type: "income"
          }
        })
        .group({
          _id: '$item.category',
          // type: '$item.category.type',
          value: $.sum('$item.number'),
          type: $.first('$item.type'),

          percent: $.sum(0)
        })
        .sort({
          value: -1
        })
        .end().then(res => {
          let list = res.list;
          let base = list[0].value;
          for (let i = 0; i < list.length; i++) {
            list[i].percent = parseFloat(list[i].value / base) * 100
          }
          console.log(list)
          this.setData({
            inProList:list
          })

        })
        .catch(err => {
          console.log(err)
        })
    },

  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log("test-page show", app.globalData);
      const openid = app.globalData.openid;
      todos.where({
        _openid: openid
      }).limit(1000).orderBy("item.date", "desc").orderBy("editTime.time", "desc").get({
        success: res => {
          wx.stopPullDownRefresh();
          let list = res.data;
          let dayList = [];
          let day_index = 0;






          //  ---------------------------------------------------------------
          console.log("list", list);
          dayList[0] = {
            date: list[0].item.date,
            month: parseInt(list[0].item.date.slice(5, 7)),
            day: parseInt(list[0].item.date.slice(8, 10)),
            income: 0,
            outcome: 0,
            detailList: []
          };

          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            // console.log(item.item.date)
            if (dayList[day_index].date === item.item.date) {
              // 如果是当前日期，则更新数据

              if (item.item.type === 'income') {
                dayList[day_index].income += item.item.number
              } else {
                dayList[day_index].outcome += item.item.number
              }
              dayList[day_index].detailList.push(item)

            } else {
              // 如果是新的日期，则在dayList插入新日期

              let inc = 0,
                outc = 0;
              if (item.item.type === 'income') {
                inc = item.item.number
              } else {
                outc = item.item.number
              }

              dayList.push({
                date: item.item.date,
                month: parseInt(item.item.date.slice(5, 7)),

                day: parseInt(item.item.date.slice(8, 10)),
                income: inc,
                outcome: outc,
                detailList: [item]
              })

              day_index++;

            }
          }
          console.log("daylist", dayList);

          this.setData({
            totalList: res.data,
            dayList
          })


        }
      })




    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }

})