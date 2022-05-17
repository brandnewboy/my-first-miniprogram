const formatDate = (str)=>{
  let d = new Date(str*1000)
  let year = d.getFullYear()
  let month = d.getMonth()
  let date = d.getDate()
  let hour = d.getHours()
  let minutes = d.getMinutes()

  let dt = d.toLocaleDateString()
  let ti = d.toLocaleTimeString()
  // console.log('日期',dt,'时间',ti)
  // console.log(year+'-'+(month+1)+'-'+date+' '+hour+':'+minutes)
  let newDt = dt.replaceAll('\/','-')
  return newDt+' '+ti
}
export default formatDate