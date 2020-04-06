function getNowDate() {
  let nowY = new Date().getFullYear();
  let nowM = new Date().getMonth() + 1;
  let nowD = new Date().getDate();
  let mStr = nowM < 10 ? '0' + nowM : nowM
  let dStr = nowD < 10 ? '0' + nowD : nowD;
  let ldStr = nowD < 10 ? '0' + nowD-1 : nowD-1;
  let nowdate = `${nowY}-${mStr}-${dStr}`;
  let startDate = `${nowY}-${mStr}-01`;
  let endDate = `${nowY}-${mStr}-31`;
  return {
    year:nowY,
    month: nowM,
    day:nowD,
    date: nowdate,
    startDate: startDate,
    endDate: endDate,
  }
}
function dateToString(year, month, day){
  // dateStr -> yyyy-mm-dd
  // dateStr = "2019-11-01";
  // let year = dateStr.slice(0, 4);
  // let month = dateStr.slice(5, 7);
  // let day = dateStr.slice(8,10);
  year = year < 10 ? '0' + year : year;
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0'+day : day;
  let dateStr = `${year}-${month}-${day}`
  // console.log("dateStr",dateStr);

  return dateStr


}
export default{
  getNowDate,
  dateToString
}