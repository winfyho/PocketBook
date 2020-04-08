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
          outTotal: 0,
          inAvg: 0,
          outAvg: 0
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
        result.inAvg = result.incTotal / 30
        result.outAvg = result.outTotal / 30
        result.incList.forEach(i => {
          i.percent = i.num / result.incTotal * 100.0
        })
        result.outList.forEach(i => {
          i.percent = i.num / result.outTotal * 100.0
        })
        console.log(res.list)
        _this.setData({
          incList: result.incList,
          outList: result.outList,
          incTotal: result.incTotal,
          outTotal: result.outTotal,
          inAvg: parseInt(result.inAvg),
          outAvg: parseInt(result.outAvg)
        })
        resolve(result)
      })
      .catch(err => {
        console.log(err)
      })
  })

}

export function getMonthList(_this, _openid, year_month, sortObj, skip = 0) {
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
        let detailList = _this.data.detailList.concat(res.list)
        console.table(detailList)
        _this.setData({
          detailList,
          skip: skip + 1,
          hasData: res.list.length > 0 ? true : false
        })
        resolve(detailList)

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
        let data = {
          incList: [],
          outList: [],
          maxincome: 0,
          maxoutcome: 0,
        }
        if (!showMonth) {
          console.table(res.list)

          res.list.forEach(i => {
            i.day = parseInt(i.date.slice(8, 10))
            if (i.type === 'income') {
              data.incList.push(i)
              data.maxincome = i.num > data.maxincome ? i.num : data.maxincome
            } else if (i.type === 'outcome') {
              data.outList.push(i)
              data.maxoutcome = i.num > data.maxoutcome ? i.num : data.maxoutcome
            }
          })

        }
        console.log(data)

        _this.setData({
          result: data,
          incList: data.incList,
          outList: data.outList,
          maxincome: data.maxincome,
          maxoutcome: data.maxoutcome,
        })
        resolve(data)



        if (showMonth) {
          if (_this.data.weekList.length === 0) {

          }
          let oldList = _this.data.weekList
          let newList = res.list
          let monthList = oldList.concat(newList)
          console.table(monthList)

          _this.setData({
          })

        }
        // res.list.filter(item => {

        // })

      })
      .catch(err => {
        console.log(err)
      })
  })
}