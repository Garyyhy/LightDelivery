const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('grab').doc(event._id).update({
      // data 传入需要局部更新的数据
      data: {
        state: event.state,
        staff: event.staff
      }
    })
  } catch (e) {
    console.error(e)
  }
}
