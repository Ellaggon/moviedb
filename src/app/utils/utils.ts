export const formatRunTime = (minutes: {minutes: number}) => {
    const min = Number(minutes)
    let hour = Math.floor(min / 60)
    hour = (hour < 10)? 0 + hour : hour
    let minute = Math.floor(((min/60) - hour) * 60)
    minute = (minute < 10)? 0 + minute : minute
    return hour + "h" + " " + minute + "m"
}
