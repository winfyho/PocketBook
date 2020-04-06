import { toDayList } from "../utils/group.js"
const account = wx.cloud.database().collection('account')
const db = wx.cloud.database()
const $ = db.command.aggregate;
const _ = db.command;

export function _getAccounts(_this, _openid, month, skip = 0) {
    return new Promise((resolve, reject) => {
        account.where({
            _openid,
            item: {
                date: _.and(_.lte(`${month}-31`),_.gte(`2019-01-01`)) 
            }
        })
            .orderBy("item.date", "desc")
            .orderBy("editTime.time", "desc")
            .skip(skip * 20)
            .get().then(res => {
                let oldList = _this.data.list
                let newList = res.data
                let allList = oldList.concat(newList)
                let list = []
                allList.forEach(i => {
                    list.push({
                        ...i.item,
                        _id: i._id,
                        _openid: i._openid
                    })
                })
                console.table(list)
                let dayList = toDayList(list)
                if (res.data.length > 0) {
                    _this.setData({
                        list: allList,
                        dayList,
                        skip: skip + 1
                    })
                    resolve({
                        reachBot: false,
                        msg: "加载成功"
                    })

                } else {
                    reject({
                        reachBot: false,
                        hasData:false,
                        msg: "无数据"

                    })
                }

            })
    })

}

export function _getTotal(_openid, startDate) {
    return new Promise((resolve, reject) => {
        account.aggregate()
            .match({
                _openid,
                item: {
                    date: _.gte(startDate),
                }
            })
            .group({
                _id: '$item.type',
                income: $.sum('$item.income'),
                outcome: $.sum('$item.outcome'),

            })
            .end().then(res => {
                let total = {
                    income: 0,
                    outcome: 0
                }
                res.list.forEach(i => {
                    let key = i._id
                    total[key] = i[key]
                })

                resolve(total)

            })
    })

}