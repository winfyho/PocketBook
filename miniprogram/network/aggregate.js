const db = wx.cloud.database()
const $ = db.command.aggregate;
const _ = db.command;
const account = db.collection('account')
export function getMonthCatTotal(_this, _openid, year_month) {
  return new Promise((resolve, reject) => {
    year_month = year_month || `2020-01`
    account.aggregate()
      .match({
        _openid,
        item: {
          date: _.and(_.gte(`${year_month}-01`), _.lte(`${year_month}-31`))
        }
      })
      .group({
        _id: '$item.icon',
        category: $.first('$item.category'),
        num: $.sum('$item.number'),
        type: $.first('$item.type')
      })
      .end()
      .then(res => {
        let result = {
          incList: [],
          outList: [],
          incTotal: 0,
          outTotal: 0
        }
        res.list.forEach(i => {
          if (i.type === 'income') {
            result.incTotal += i.num
            result.incList.push(i)
          } else {
            result.outTotal += i.num
            result.outList.push(i)
          }
        })
        console.log(result)

        resolve(result)
      })
      .catch(err => {
        console.log(err)
      })
  })

}

export function getMonthList(_this, _openid, year_month, sortObj) {
  return new Promise((resolve, reject) => {
    year_month = year_month || `2020-01`
    sortObj = sortObj || {
      date: -1,
      time: 1
    }
    account.aggregate()
      .match({
        _openid,
        item: {
          date: _.and(_.gte(`${year_month}-01`), _.lte(`${year_month}-31`))
        }
      })
      .addFields({
        time: '$item.editTime.time'
      })
      .replaceRoot({
        newRoot: {
          _id: '$item._id',
          _openid: '$item._openid',
          timeStamp: '$item.editTime.time',
          date: '$item.date',
          icon: '$item.icon',
          category: '$item.category',
          type: '$item.type',
          number: '$item.number',
          income: '$item.income',
          outcome: '$item.outcome',
        },
      })

      .sort(sortObj)
      .skip(skip * 20)
      .end()
      .then(res => {

        console.table(res.list)
        resolve(res.list)

      })
      .catch(err => {
        console.log(err)
      })
  })

}

export function getMonthDayTotal(_this, _openid, year_month, showMonth = false) {
  return new Promise((resolve, reject) => {
    year_month = year_month || `2020-01`
    let skip = showMonth === false ? 0 : 7

    account.aggregate()
      .match({
        _openid,
        item: {
          date: _.and(_.gte(`${year_month}-01`), _.lte(`${year_month}-31`))
        }
      })
      .group({
        _id: '$item.date',
        num: $.sum('$item.number'),
        date: $.first('$item.date'),
        type: $.first('$item.type'),
        time: $.first('$item.editTime.time'),
      })
      .sort({
        date: -1
      })

      .skip(skip)
      .end()
      .then(res => {
        if (!showMonth) {
          console.table(res.list.slice(0, 7))
          _this.setData({
            weekList: res.list.slice(0, 7),
            monthList: res.list.slice(0, 7),
          })
        }

        if (showMonth) {
          if (_this.data.weekList.length === 0) {

          }
          let oldList = _this.data.weekList
          let newList = res.list
          let monthList = oldList.concat(newList)
          console.table(monthList)

          _this.setData({
            monthList,
          })

        }
        // res.list.filter(item => {

        // })

        resolve(res.list)
      })
      .catch(err => {
        console.log(err)
      })
  })
}