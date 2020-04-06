export function toDayList(list) {
    let dayList = []
    let d_index = 0
    list.forEach((i, index) => {
        if (dayList[d_index]) {
            if (i.date === dayList[d_index].date) {
                dayList[d_index].records.push(i)
            } else {
                dayList[d_index+1] = {
                    date: i.date,
                    records: [i]
                }
                d_index++

            }
        } else {
            dayList[d_index] = {
                date: i.date,
                records: [i]
            }
        }
    })
    // console.table(dayList)

    return dayList


}