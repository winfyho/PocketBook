
export class Account{
    constructor(item){
        this._id = item._id
        this._openid = item._openid
        this.type = item.type || 'outcome'
        this.category = item.category || '支出'
        this.icon = item.icon || 'outcome'
        this.date = item.date || '2020-01-01'
        this.comment = item.comment || ''
        this.number = item.number || 0
        this.outcome = item.outcome || 0
        this.income = item.income || 0
        this.editTime = item.editTime || {time:0}
        this.timeStamp = item.editTime.time
    }
    deleteAccount(_this,_openid){

    }
}

export class Schedule{
    constructor(item){
        this._id = item._id
        this._openid = item._openid
        this.type = item.type || 'normal'
        this.scheName = item.scheName || '行程'
        this.place = item.place || '地点'
        this.isAllday = item.isAllday || false
        this.infor = item.infor || ''
        this.startDate = item.startDate || '2020-01-01'
        this.endDate = item.endDate || '2020-01-01'
        this.startTime = item.startTime || '0:00'
        this.endTime = item.endTime || '0:00'      
    }
    deleteSchedule(_this,_openid){

    }
    updateSchedule(_this,_openid){

    }
}