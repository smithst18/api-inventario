var { Product_Notification } = require('../../models/index');

exports.getNotifys = async function(){

    const activeNotifications = await Product_Notification.findAll({
      where: { status:true }, 
      attributes:["id","value_to_report"],
      include:{
        association: "item",
        attributes:["id","name","product_quantity","product_code"],
        where:{ active_notification: true }
      }
    }).catch(err =>{ return err });

    if(activeNotifications /*&& activeNotifications.length > 0*/) return activeNotifications;
    else return { message:"any notification active yet" };
}