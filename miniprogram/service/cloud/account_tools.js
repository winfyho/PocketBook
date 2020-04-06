function getTypeData(openid, page, type, year, month,sortType, skip) {
  // 获取开始和结束时间
  month = month<10? '0'+month : month;
  let startDate = `${year}-${month}-01`;
  let endDate =`${year}-${month}-31`;

  // 数据库接口
  const app = getApp();
  const db = wx.cloud.database();
  const account = db.collection("account");
  const $ = db.command.aggregate;
  const _ = db.command;

  // 判断分类
  if (type === "全部收入") {
    type = ["收入", "工资", "兼职", "奖金", "人情", "理财"]
  } else if (type === "全部支出") {
    type = ["支出", "吃饭", "零食", "购物", "娱乐", "交通", "住房", "居家", "宠物", "医疗", "学习", "其他"]
  } else if (type === "全部") {
    type = ["收入", "工资", "兼职", "奖金", "人情", "理财", "支出", "吃饭", "零食", "购物", "娱乐", "交通", "住房", "居家", "宠物", "医疗", "学习", "其他"]
  } else {
    type = [type]
  }

  if(sortType === "time"){
    sortType = "item.date"
  }else{
    sortType = "item.number"

  }

  // 判断是否还有分页数据，如果没有结束函数
  if (skip === -1) {
    console.log("已经到底了~")
    return
  }

  //////////////////////////////////////////////////////////// 
  db.collection('account')
    .where({
      item: {
        category: _.in(type), // 分类名称
        date: _.gte(startDate).and(_.lte(endDate)) // 开始日期
      }
    })
    .orderBy(sortType,"desc")
    .orderBy("editTime.time", "desc")
    .skip(skip * 20)
    .get({}).then(res => {
      if (skip === 0) {
        list = []
      } else {
        list = page.data.detailList
      }
      let list = list.concat(res.data)
      page.setData({
        // type: (list[0].item.type ==='outcome') ? '支出':'收入',
        detailList: list,
        curSkip: res.data.length > 0 ? skip + 1 : -1
      })

      console.log("typeData-", type, page.data.detailList, "skip-", skip, res.data)

    })



}


function getTotal(openid, page, startDate) {
  const db = wx.cloud.database();
  const account = db.collection("account");
  const $ = db.command.aggregate;
  const _ = db.command;

  // console.log("startDate", startDate)
  db.collection('account')
    .aggregate()
    .match({
      _openid: openid,
      item: {
        date: _.gte(startDate),
      }
    })
    .group({
      _id: '$item.type',
      income: $.sum('$item.income'),
      outcome: $.sum('$item.outcome'),

    })
    .sort({
      _id: -1
    })
    .end().then(res => {
      let list = res.list
      console.log(list)
      if(list.length === 2){
        list[0].income = list[1].income
        // list[0].outcome = list[1].outcome

      }
      
      page.setData({
        income: list[0].income ,
        outcome:list[0].outcome 
      })
    })
}


/**
 * 获取分类数据表，柱状图
 * openid， 页面数据， 月份， 类型：income/outcome
 */
function getTypeTable(openid, page, month, type){
  
  const db = wx.cloud.database();
  const $ = db.command.aggregate;
  const _ = db.command;

  let year = new Date().getFullYear()
  month = month < 10 ? '0' + month : month;

  let startDate = `${year}-${month}-01`;
  let endDate = `${year}-${month}-31`;
  console.log("startDate", startDate)

  db.collection('account')
    .aggregate()
    .match({
      _openid: openid,
      item: {
        date: _.gte(startDate).and(_.lte(endDate)),
        type: type
      }
    })
    .group({
      _id: '$item.category',
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
      let total = 0,
          avg = 0,
          max = 0;
      for (let i = 0; i < list.length; i++) {
        total += list[i].value;
        max = max <= list[i].value ? list[i].value : max;
        list[i].percent = parseFloat(list[i].value / base) * 100
      }
      avg = parseInt(total / 30);
      if(type === "outcome"){
        page.setData({
          outProList: list,
          active:false,
          outTotal: total,
          outMax:max,
          outAvg:avg,
          
        })
      }else{
        page.setData({
          inProList: list,
          inTotal: total,
          inMax:max,
          inAvg:avg,
          
          
        })
      }

      console.log("category-table-",type, list[0].value,list,total,max,avg)
      

    })
    .catch(err => {
      console.log(err)
    })
}

function getDayList(openid, page, startDate, endDate, curPage) {

  const app = getApp();
  const db = wx.cloud.database();
  const account = db.collection("account");
  const $ = db.command.aggregate;
  const _ = db.command;

  // console.log("startDate", startDate)

  db.collection('account')
    .aggregate()

    .match({
      _openid: openid,
      item: {
        date: _.gte(startDate).and(_.lte(endDate))
      }
    })

    .group({
      _id: '$item.date',
      income: $.sum(
        '$item.income'
      ),
      date: $.first('$item.date'),
      outcome: $.sum(
        '$item.outcome'
      ),
    })

    .sort({
      _id: -1
    })
    .skip(curPage * 20)
    .end().then(res => {

      if (res.list.length > 0) {
        let list = page.data.dayList;
        list = list.concat(res.list);
        let maxincome = 0;
        let maxoutcome = 0;
        let totalOutcome = 0,
            totalIncome = 0,
            avgOutcome = 0,
            avgIncome = 0;

        list.forEach(item => {
          maxoutcome = item.outcome >= maxoutcome ? item.outcome : maxoutcome;
          maxincome = item.income >= maxincome ? item.income : maxincome;
          totalOutcome += item.outcome;
          totalIncome += item.income;
        })
        avgOutcome = parseInt(totalOutcome / 30);
        avgIncome = parseInt(totalIncome / 30);
        page.setData({
          dayList: list,
          curPage: curPage + 1,
          maxoutcome,
          maxincome
        })
        console.log("account tools dayList", page.data.maxoutcome, page.data.maxincome,totalOutcome,totalIncome, avgOutcome,avgIncome,page.data.dayList)
      } else {
        page.setData({
          curPage: -1
        })
        console.log("已经到底了~  from account tools dayList ", res.list)

      }




    })
    .catch(err => {
      console.log(err)
    })
}
export default {
  getTotal,
  getDayList,
  getTypeData,
  getTypeTable
}