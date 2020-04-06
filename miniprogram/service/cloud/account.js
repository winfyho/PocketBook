export default function(openid, page, startDate,curPage) {
  const app = getApp();

  // const openid = "orjJX42LYGJoRnrfWXfptcyND6kM";

  const db = wx.cloud.database();
  const _ = db.command
  const account = db.collection("account");
  account.where({
    _openid: openid,
    item:{
      date: _.gte(startDate)
    }
    

  }).orderBy("item.date", "desc").orderBy("editTime.time", "desc").skip(curPage*20).get({
    success: res => {
      if(res.data.length === 0){
        console.log("已经没有数据了")
        page.setData({
          curPage:-1,
        })
      }else{
        page.setData({
          curPage: curPage + 1
        })
      }

      let list = page.data.detailList.concat(res.data);

      var dayList = [];
      var day_index = 0;

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

          var inc = 0,
            outc = 0;
          if (item.item.type === 'income') {
            inc = item.item.number || 0
          } else {
            outc = item.item.number || 0
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

      

      page.setData({
        detailList: list,
        dayList: dayList,
      })
      console.log("accountService list-curpage:" + (page.data.curPage-1), list);

      console.log("accountService dayList", page.data.dayList);

    },
    fail:err => {
      console.error(err)
    },
    complete: res => {
      wx.stopPullDownRefresh();
    } 

  })

}