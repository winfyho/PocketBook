export function getDateObj(option) {
    option = option || new Date().getTime()
    const _date = new Date(option)

    let month = _date.getMonth() + 1 
    month = month < 10 ? `0${month}` : month

    let day = _date.getDate()
    day = day < 10 ? `0${day}` : day

    let hour = _date.getHours()
    hour = hour < 10 ? `0${hour}` : hour

    let minute = _date.getMinutes()
    minute = minute < 10 ? `0${minute}` : minute

    const dateObj = {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
        hour: _date.getHours(),
        minute: _date.getMinutes(),
        timeString:`${hour}:${minute}`,
        timeStamp: _date.getTime(),
        dateString:``
    }
    

    let dateString = `${_date.getFullYear()}-${month}-${day}`
    dateObj.dateString = dateString
    return dateObj
}
export function toTimeStamp(dateString,timeString){
    let date = dateString.split('-')
    let time = timeString.split(':')
    let year = parseInt(date[0])
    let month = parseInt(date[1])
    let day = parseInt(date[2])

    let hour = parseInt(time[0])
    let minu = parseInt(time[1])
    let sec = 0
    // console.log(year,month,day,hour,minu,sec)
    
    
    return new Date(year,month,day,hour,minu,sec).getTime()
    
}