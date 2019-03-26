import * as api from './api';

export default api;

/**
 * 格式化时间
 * @param timestamp 时间戳
 * @returns {string} yyyy.mm.dd
 */
export function getParsedTime(timestamp) {
    let date = new Date(timestamp);
    let y = date.getFullYear();
     let m = date.getMonth() + 1;
     let d = date.getDate();
     let h= date.getHours();
     let mm = date.getMinutes();
     let ss = date.getSeconds();
    return y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d)+" "+h+":"+mm+":"+(ss < 10 ? "0" + ss : ss);
}