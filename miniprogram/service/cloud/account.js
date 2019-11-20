export default function(openid, page,startDay) {
  const app = getApp();

  // const openid = "orjJX42LYGJoRnrfWXfptcyND6kM";

  const db = wx.cloud.database();
  const todos = db.collection("todos");
  todos.where({
    _openid: openid
  }).orderBy("item.date", "desc").orderBy("editTime.time", "desc").get({
    success: res => {



      var list = res.data;
      var dayList = [];
      var day_index = 0;

      console.log("accountService list", list);
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

          if (parseInt(item.item.date.slice(5, 7)) < parseInt(list[0].item.date.slice(5, 7))) {
            break;
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

      var income = 0,
        outcome = 0;
      try {
        dayList.forEach(i => {
          if (i.month < parseInt(list[0].item.date.slice(5, 7))) {
            console.log("1号")
            throw new Error('exist')
          }
          income += i.income;
          outcome += i.outcome;
          
        })
      } catch (e) {
        
      }

      page.setData({
        detailList: res.data,
        dayList,
        income,
        outcome
      })
      wx.stopPullDownRefresh();

      console.log("accountService dayList", page.data.dayList);

    }
  })

}