function getNowDate() {
  let nowY = new Date().getFullYear();
  let nowM = new Date().getMonth() + 1;
  let nowD = new Date().getDate();
  let mStr = nowM < 10 ? '0' + nowM : nowM
  let dStr = nowD < 10 ? '0' + nowD : nowD;
  let ldStr = nowD < 10 ? '0' + nowD-1 : nowD-1;
  let nowdate = `${nowY}-${mStr}-${dStr}`;
  let lastdate = `${nowY}-${mStr}-${ldStr}`;
  return {
    year:nowY,
    month: nowM,
    day:nowD,
    date: nowdate,
    lastDate: lastdate
  }
}
export default{
  getNowDate
}