import dateTool from "../../tools/date.js"

export default function(openid,page) {
  const nowDate = dateTool.getNowDate().date;
  const db = wx.cloud.database();
  const schedule = db.collection("schedule");
  const _=db.command;
  const app = getApp();
  let list;
  let dayList;
  schedule.where({
    _openid: openid,
    detail:{
      startDate: _.gte(nowDate)
    }
  }).orderBy("detail.startDate", "asc").orderBy("detail.startTime", "asc").get({}).then(res => {
    wx.stopPullDownRefresh();
    console.log("service --------------------------");

    // 动态生成天数据---------------
    list = res.data;
    dayList = [];
    let day_index = 0;

    dayList[0] = {
      date: list[0].detail.startDate,
      dateObj: {
        year: parseInt(list[0].detail.startDate.slice(0, 4)),
        month: parseInt(list[0].detail.startDate.slice(5, 7)),
        day: parseInt(list[0].detail.startDate.slice(8, 10)),
      },
      detailList: [list[0]]
    };

    for (let i = 1; i < list.length; i++) {
      let item = list[i];
      if (dayList[day_index].date === item.detail.startDate) {
        // 如果是当前日期，则更新数据
        dayList[day_index].detailList.push(item)

      } else {
        // 如果是新的日期，则在dayList插入新日期

        dayList.push({
          date: item.detail.startDate,
          dateObj: {
            year: parseInt(item.detail.startDate.slice(0, 4)),
            month: parseInt(item.detail.startDate.slice(5, 7)),
            day: parseInt(item.detail.startDate.slice(8, 10)),
          },
          detailList: [item]
        })

        day_index++;

      }
    }

    page.setData({
      scheduleList: list,
      dayList
    })
    console.log("schedule-page-data", page.data.scheduleList, page.data.dayList)

  }).catch(err => {
    wx.stopPullDownRefresh();
    wx.showToast({
      title: '无行程',
      icon: 'none',
      duration: 1000
    })

    console.error(err);
  })

  return {
    list,
    dayList
  }
}