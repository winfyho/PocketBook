
const collect = wx.cloud.database().collection("users");
const openid = "orjJX42LYGJoRnrfWXfptcyND6kM"


function get() {
  
  collect.get({

    success: res => {
      console.log("userservice", res.data[0]._id);
    }
  })

}
export default{
  collect,
  get,
}