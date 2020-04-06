const db = wx.cloud.database()
const $ = db.command.aggregate;
const _ = db.command;
const schedule = db.collection('schedule')
function toDayList(schedules) {
  let dayList = []
  let d_index = 0
  schedules.forEach((i, index) => {

    if (dayList[d_index]) {
      if (dayList[d_index].date === i.startDate) {
        dayList[d_index].records.push(i)
      } else {
        dayList[d_index + 1] = {
          date: i.startDate,
          month: parseInt(i.startDate.slice(5, 7)),
          day: parseInt(i.startDate.slice(8, 10)),
          records: [i]
        }
        d_index++
      }
    } else {
      dayList[d_index] = {
        date: i.startDate,
        month: parseInt(i.startDate.slice(5, 7)),
        day: parseInt(i.startDate.slice(8, 10)),
        records: [i]
      }
    }

  })
  // console.log(dayList)
  return dayList
}

export function getSchedules(_this, _openid, startDate, skip = 0, ) {
  return new Promise((resolve, reject) => {
    schedule.where({
      _openid,
      detail: {
        startDate: _.gte(startDate)
      }

    })
      .orderBy("detail.startDate", "asc")
      .orderBy("detail.startTime", "asc")
      .skip(skip * 20)
      .get().then(res => {

        let oldList = _this.data.list
        let newList = res.data
        let allList = oldList.concat(newList)
        let schedules = []
        allList.forEach((i, index) => {
          schedules.push({
            ...i.detail,
            _id: i._id,
            _openid: i._openid
          })
        })
        let dayList = toDayList(schedules)


        if (res.data.length > 0) {
          _this.setData({
            list: allList,
            dayList,
            skip: skip + 1,
          })
          resolve({
            reachBot:false,
            msg:"加载成功"
          })

        } else {
          reject({
            reachBot:false,
            msg:"无数据"

          })
        }



      })
  })

}