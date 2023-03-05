"ui";
importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(android.graphics.Color);

//瑞科网络验证官网：
//http://www.ruikeyz.com  http://rk.ruikeyz.com   
//这两个站点，如果有一个打不开，那么就用另一个打开，总会有一个能打开的
//QQ交流群：560549736

//快速对接瑞科网络验证步骤：
//1、在你的项目中，把“瑞科网络验证SDK.js”文件放入你“主程序【main.js】”同目录下
//2、然后把以下的代码复制到你的“main.js”中去，注意，一定要放在【“ui”】标识下和你的代码之前
//3、把“瑞科验证配制参数”修改成你自己的，就对接完了
//注意：根据你自身的业务需要，“接收接口返回的结果”这个方法里面的代码，如果对你没有用的你都可去掉，但是“登录成功后心跳”这个业务类型不能去掉，这个得接收接口返回来的数据，如果心跳
//返回来不正常的话，那么立即关闭您的软件：瑞科验证SDK.强制关闭本应用();
//另外，调用接口返回的“结果.错误编码!=0”的都是错误

function 是否有悬浮窗权限 () {
  return new android.provider.Settings().canDrawOverlays(context);
}

//floaty.checkPermission()为autojsPro7新增函数，之前的版本无法使用
//但在autojs8.8.22上测试报错，知道的朋友欢迎告诉我一下，谢谢
function 是否有悬浮窗权限2 () {
  return floaty.checkPermission();
}

//此脚本为：跳转到所有应用申请悬浮窗权限界面
function 申请悬浮窗权限 () {
  var intent = new Intent();
  intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
  // ui.emitter.on("activity_result", (req, res, intent) => {});
  activity.getEventEmitter().on("activity_result", function (requestCode, resultCode, intentData) { });
  activity.startActivityForResult(intent, 8000);
}
//此脚本为：直接跳转到autojs应用申请悬浮窗权限界面
function 申请悬浮窗权限2 () {
  app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
    data: "package:" + context.packageName.toString(),
  });
}

//floaty.requestPermission()为autojsPro7新增函数，之前的版本无法使用
//但在autojs8.8.22上测试报错，知道的朋友欢迎告诉我一下，谢谢
function 申请悬浮窗权限3 () {
  return floaty.requestPermission();
}
try {
  if (!是否有悬浮窗权限()) {
    toastLog("没有悬浮窗权限,将跳转到开启悬浮窗权限界面");
    申请悬浮窗权限();
  } else {
    toastLog("已有悬浮窗权限");
  }
} catch (error) {
  toastLog("请求悬浮窗权限出错");
}

//测试卡密：815aab2945b9ee0d
var 瑞科验证配制参数 =
{
  "平台用户编码": "829d173c42ca337a",  //如何获取：后台-->个人中心-->个人详情-->平台用户编码
  "软件编码": "46e0aad0a853056a",     //如何获取：后台-->软件管理-->软件列表-->添加软件-->软件编码
  "软件版本号": "v1.0",               //如果在此设置的版本号与你后台设置的不一样的话，那么会弹出“版本更新”提示界面，后台版本号设置是在：后台-->软件管理-->版本列表，中进行设置
  "通讯方式": 1,                      //1:DES加密通讯方式  3:RC4加密通讯方式，注意：此处设置的值必须与后台设置的一致。在此只能填写1或者3
  "加密Key": "4cc3ee35",             //如何获取：后台-->软件管理-->软件列表-->选择一个已添加的软件-->编辑-->通讯方式-->选择DES或者RC4-->加密Key
  "签名盐": "1b6d8018",              //如何获取：后台-->软件管理-->软件列表-->选择一个已添加的软件-->编辑-->通讯方式-->选择DES或者RC4-->签名盐
  "接收心跳失败方法": 接收心跳失败方法, //当心跳失败的时候，瑞科验证SDK会调用此方法通知到您软件，然后你可以做相应的处理。注意，此方法是被SDK在线程里面调用的
};
//注意：瑞科验证SDK只能被实例化一次，千万别多次实例化
var 瑞科验证SDK = new require('瑞科网络验证SDK.js')(瑞科验证配制参数);
let 成品登录界面配制参数 =
{
  "是否需要二维码在线支付功能": true,
  "是否需要充值卡充值的功能": true,
  "是否显示软件名称": true,
  "登录成功后跳转的主界面": 登录成功后跳转的主界面,
};



if (瑞科验证SDK != null) {
  瑞科验证SDK.弹出卡密成品登录界面(成品登录界面配制参数);

  /* 
  【瑞科验证SDK】所有功能已封装好的方法，调用示例如下（其这些方法返回来的值，你可以在示例中都可以找到，或者你可以到SDK源码中也能找到返回来的对角有哪些属性）：
  
  瑞科验证SDK.卡密登录("登录的卡密");
  瑞科验证SDK.卡密详情();
  瑞科验证SDK.二维码购买卡密("购买的价格类型ID");
  瑞科验证SDK.二维码开通续费卡密("购买的价格类型ID");
  瑞科验证SDK.账号登录("登录的账号", "登录的密码");
  瑞科验证SDK.账号详情();
  瑞科验证SDK.账号注册("账号", "密码");
  瑞科验证SDK.修改账号密码("账号", "旧密码","新密码");
  瑞科验证SDK.二维码开通续费账号("购买的价格类型ID", "开通续费的账号", "开通续费的密码");
  瑞科验证SDK.充值卡续费卡密或账号 ("被充值的卡密或账号", "充值卡号");
  瑞科验证SDK.充值卡详情("查询的充值卡");
  瑞科验证SDK.获取远程变量("变量名");
  瑞科验证SDK.解绑机器码("需要解绑的卡密或账号");
  瑞科验证SDK.扣点(扣点的数值);
  瑞科验证SDK.订单查询("订单号");
  瑞科验证SDK.修改卡密账号备注("新的备注内容");
  */


  /*
  当瑞科验证SDK!=null的时候，就可以直接访问这个对象：瑞科验证SDK.软件初始化结果
  此对象有以下属性【看您自己的业务需求，有需要的就拿着用】：

  console.log("错误编码：" + 瑞科验证SDK.软件初始化结果.错误编码);
  console.log("错误消息：" + 瑞科验证SDK.软件初始化结果.错误消息);
  console.log("软件信息.咨询qq：" + 瑞科验证SDK.软件初始化结果.软件信息.咨询qq);
  console.log("软件信息.软件公告：" + 瑞科验证SDK.软件初始化结果.软件信息.软件公告);
  console.log("软件信息.软件名称：" + 瑞科验证SDK.软件初始化结果.软件信息.软件名称);
  console.log("软件信息.咨询官网：" + 瑞科验证SDK.软件初始化结果.软件信息.咨询官网);
  console.log("软件信息.咨询微信：" + 瑞科验证SDK.软件初始化结果.软件信息.咨询微信);
  console.log("软件信息.咨询电话：" + 瑞科验证SDK.软件初始化结果.软件信息.咨询电话);
  console.log("软件信息.软件基础数据：" + 瑞科验证SDK.软件初始化结果.软件信息.软件基础数据);
  console.log("软件信息.单台设备最大登录数量：" + 瑞科验证SDK.软件初始化结果.软件信息.单台设备最大登录数量);
  console.log("软件信息.换绑扣除值：" + 瑞科验证SDK.软件初始化结果.软件信息.换绑扣除值);
  console.log("软件信息.软件logo下载地址：" + 瑞科验证SDK.软件初始化结果.软件信息.软件logo下载地址);
  console.log("软件信息.登录方式：" + 瑞科验证SDK.软件初始化结果.软件信息.登录方式);
  console.log("软件信息.软件消耗类型：" + 瑞科验证SDK.软件初始化结果.软件信息.软件消耗类型);
  console.log("软件信息.登录限制：" + 瑞科验证SDK.软件初始化结果.软件信息.登录限制);
  console.log("软件信息.换绑限制：" + 瑞科验证SDK.软件初始化结果.软件信息.换绑限制);
  console.log("软件信息.软件是否强制更新：" + 瑞科验证SDK.软件初始化结果.软件信息.软件是否强制更新);
  console.log("软件信息.软件更新的网盘地址：" + 瑞科验证SDK.软件初始化结果.软件信息.软件更新的网盘地址);
  console.log("软件信息.软件当前最新版本号：" + 瑞科验证SDK.软件初始化结果.软件信息.软件当前最新版本号);
  console.log("软件信息.网盘提取码：" + 瑞科验证SDK.软件初始化结果.软件信息.网盘提取码);
  console.log("服务器时间戳：" + 瑞科验证SDK.软件初始化结果.服务器时间戳);
  // 注意，你后台设置多少个价格，此处“软件价格数组”就有多少个，请用下标下来进访问
  console.log("价格数量：" + 瑞科验证SDK.软件初始化结果.软件价格数组.length);
  console.log("价格信息.售价：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].售价);
  console.log("价格信息.角色ID：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].角色ID);
  console.log("价格信息.角色名：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].角色名);
  console.log("价格信息.可使用值：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].可使用值);
  console.log("价格信息.使用值单位：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].使用值单位);
  console.log("价格信息.价格类型ID：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].价格类型ID);
  console.log("价格信息.价格类型名称：" + 瑞科验证SDK.软件初始化结果.软件价格数组[0].价格类型名称);
*/

  /*
  当登录成功后，就可以直接访问这个对象：瑞科验证SDK.登录结果
  此对象有以下属性【看您自己的业务需求，有需要的就拿着用】：

  console.log("错误编码：" + 瑞科验证SDK.登录结果.错误编码);
  console.log("错误消息：" + 瑞科验证SDK.登录结果.错误消息);
  console.log("登录成功后的令牌：" + 瑞科验证SDK.登录结果.登录成功后的令牌);
  console.log("心跳Key：" + 瑞科验证SDK.登录结果.心跳Key);
  console.log("到期时间：" + 瑞科验证SDK.登录结果.到期时间);
  console.log("剩余点数：" + 瑞科验证SDK.登录结果.剩余点数);
  console.log("登录成功后的卡密：" + 瑞科验证SDK.登录结果.登录成功后的卡密);
  console.log("登录成功后的账号：" + 瑞科验证SDK.登录结果.登录成功后的账号);
  console.log("登录成功后的密码：" + 瑞科验证SDK.登录结果.登录成功后的密码);
  console.log("角色ID：" + 瑞科验证SDK.登录结果.角色ID);


  //你可以根据不同的角色，给你用户不同的功能。想要这样的功能，必须把角色绑定在价格上面，这样，你的用户购买了不同的价格，就具有不同的角色，最终就会根据购买不同的价格具有不同的功能
  //添加角色步骤：
  //1、软件价格-->价格角色-->添加一个角色
  //2、软件价格--> 价格列表-->选择一个软件价格-->编辑-->选择一个刚才添加的“角色名”-->点击“确定”，即此角色绑定在此价格上面了
  //3、当开通或续费在此价格下面的卡密，那么卡密就具有此角色了，当用此卡密登录完后，就会把此卡密的角色名给返回到您软件上了，此时，你就可以根据角色名来给用户相应的软件使用功能了
  console.log("角色名称：" + 瑞科验证SDK.登录结果.角色名称);

  console.log("终端客户的qq：" + 瑞科验证SDK.登录结果.终端客户的qq);
  console.log("终端客户的微信：" + 瑞科验证SDK.登录结果.终端客户的微信);
  console.log("终端客户的支付宝：" + 瑞科验证SDK.登录结果.终端客户的支付宝);
  console.log("终端客户的手机号：" + 瑞科验证SDK.登录结果.终端客户的手机号);
  console.log("终端客户的邮箱：" + 瑞科验证SDK.登录结果.终端客户的邮箱);
  console.log("备注：" + 瑞科验证SDK.登录结果.备注);
  console.log("开通的价格类型ID：" + 瑞科验证SDK.登录结果.开通的价格类型ID);
  console.log("开通的价格类型名称：" + 瑞科验证SDK.登录结果.开通的价格类型名称);

  if (瑞科验证SDK.登录结果.权限数组.length > 0) {
  console.log("权限数组数量：" + 瑞科验证SDK.登录结果.权限数组.length);
  //注意：权限你后台配制了多少，这里就有多少个，请用下标来进行获取
  console.log("权限ID：" + 瑞科验证SDK.登录结果.权限数组[0].权限ID);
  console.log("权限名称：" + 瑞科验证SDK.登录结果.权限数组[0].权限名称);
  console.log("权限值：" + 瑞科验证SDK.登录结果.权限数组[0].权限值);
  }

  */

}





/*只有心跳失败的情况下，才会收到接口返回来的消息*/
function 接收心跳失败方法 (心跳失败的结果) {
  //注意：结果只要不等于0，都是有错错误的
  // 此心跳的功能，您可以在后台远程控制您的软件，比如：客户在使用您软件的过程中到期了，禁用掉此卡密或账号，禁用掉此软件等等
  //需要注意一点的，当你在后台设置“比如禁用掉此卡密或账号，禁用掉此软件等等”这些操作后，并不是此方法马上就能收到消息了，需要至少等5分钟才能收到消息
  //因为，心跳最低是5分钟循环通知一次
  //最后需要注意的是：只有心跳失败的时候，此方法才会收到消息

  // 错误编码有以下几种对您可能有用处：
  // 1053: 此软件已被禁用
  // 6005: 卡密被禁用
  // 6003: 卡密到期
  // 6004: 卡密点数不足
  // 4005: 账号被禁用
  // 4003: 账号到期
  // 4004: 账号点数不足
  // 1067: 被其它顶号登录
  // 1013: 非绑定电脑上登陆
  // 1093: 请求过快，请10分钟后再试【请您差开时间的访问，别连续不间断的请求，容易被服务器拉黑IP】

  // 你可以根据以上错误编码，在下面写您自己的业务逻辑代码
  // 您自己的业务逻辑代码.................................

  console.log("心跳 错误编码：" + 心跳失败的结果.错误编码 + "   错误消息：" + 心跳失败的结果.错误消息);
  try {
    let dialogsValue = dialogs.build({
      title: "提示信息",
      content: "心跳 错误编码：" + 心跳失败的结果.错误编码 + "   错误消息：" + 心跳失败的结果.错误消息,
      positive: "确定",
      cancelable: false
    }).on("positive", () => {
      //只要收到心跳错误消息，那么就说明您的软件是非正常运行，
      //那么处理了您的业务逻辑代码后，直接强制把您软件整个关闭吧！
      瑞科验证SDK.强制关闭本应用();
      dialogsValue.dismiss();
    }).show();
  } catch (error) {
    console.log("1执行“接收心跳失败方法”里面的代码，有错误：" + error.message);
  }

}


//这里就是你自己的主界面了，我这里只是举了个例子，这个主界面里的内容也是瑞科网络验证里面的一些功能，
//比如：扣点，获取远程变量，卡密详情，修改卡密备注，的这些功能
//说到的这些功能根据你自身的业务需求看是需要还是不需要，不需要的话你都可以去掉的，不会报错的
function 登录成功后跳转的主界面 (){

  var color = "#FF4FB3FF";

  ui.statusBarColor("#FF4FB3FF")
  
  ui.layout(
      <drawer id="drawer">
          <vertical>
              <appbar>
                  <toolbar id="toolbar" bg="#ff4fb3ff" title="一听书人"/>
                  <tabs id="tabs" bg="#ff4fb3ff"/>
              </appbar>
              <viewpager id="viewpager">
                  <frame>
                      <vertical>
                          <vertical gravity="center" layout_weight="1">
                              <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                  <horizontal gravity="center_vertical">
                                      <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                          <text text="脚本选择" textColor="#222222" textSize="16sp" maxLines="1" />
                                          <text text="切换脚本后需在配置页设置" textColor="#999999" textSize="14sp" maxLines="1" />
                                      </vertical>
                                      <spinner id="script_chosen" marginLeft="4" marginRight="6" entries="天天向上Pro|天天向上|Study改" />
                                  </horizontal>
                              </card>
                              <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                  <horizontal gravity="center_vertical">
                                      <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                          <text text="无障碍服务" textColor="#222222" textSize="16sp" maxLines="1" />
                                          <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                      </vertical>
                                      <checkbox id="autoService" marginLeft="4" marginRight="6" checked="{{auto.service != null}}" />
                                  </horizontal>
                              </card>
                              <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                  <horizontal gravity="center_vertical">
                                      <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                          <text text="悬浮窗权限" textColor="#222222" textSize="16sp" maxLines="1" />
                                          <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                      </vertical>
                                      <checkbox id="consoleshow" marginLeft="4" marginRight="6" checked="{{floaty.checkPermission()}}" />
                                  </horizontal>
                              </card>
                              <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                  <horizontal gravity="center_vertical">
                                      <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                          <text text="音量上键可以停止所有脚本运行" textColor="#222222" textSize="16sp" maxLines="1" />
                                      </vertical>
                                  </horizontal>
                              </card>
                          </vertical>
                          <button h="60" layout_gravity="center" id="log" textSize="18sp" text="查看日志" />
                          <button h="60" layout_gravity="center" id="update" textSize="18sp" />
                          <button id="start" text="开 始 学 习" textSize="25sp" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground"/>
                      </vertical>
                  </frame>
                  <ScrollView>
                      <frame>
                          <vertical id="ttxs_pro" gravity="center">
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="看门狗(秒)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="填1800就是超过30分钟重试" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="空着或0默认5400秒，超过即重新执行" />
                                  </vertical> 
                                  <input id="ttxs_pro_watchdog" marginLeft="4" marginRight="6" text="1800"  hint="秒"  textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="滑动验证的滑动时间(ms)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="空着或0不开启自动滑动验证，滑动分3段" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="中间会折返一下，总时间是填的数值*3" />
                                  </vertical> 
                                  <input id="ttxs_pro_slide_verify" marginLeft="4" marginRight="6" text="300" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="无障碍模式2" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="无障碍服务没问题就不勾选" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_fast_mode" marginLeft="4" marginRight="6" checked="false" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="点点通功能" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_ddtong" marginLeft="4" marginRight="6" checked="false" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="开始前强制结束强国" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="如果关闭，请确保强国已退出或在首页" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_is_exit" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="评论" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_pinglun" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="视听学习次数" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_shipin" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="文章次数与时长" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_wenzhang" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每日答题" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_meiri" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每周答题" />
                                      <spinner id="ttxs_pro_meizhou" marginLeft="4" marginRight="6" entries="最近一次已作答开始倒序|正序答题|不做" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="专项答题" />
                                      <spinner id="ttxs_pro_zhuanxiang" marginLeft="4" marginRight="6" entries="最近一次已作答开始倒序|正序答题|不做" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="挑战答题" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_tiaozhan" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="OCR选择" />
                                      <spinner id="ttxs_pro_ocr_choice" marginLeft="4" marginRight="6" entries="GoogleMLKit|PaddleOCR|第三方插件" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="ocr识别跳过阈值(ms)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="空着或0默认5000，超过此时间会跳过多人对战" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="建议按照平时正常的ocr识别时间设置" />
                                  </vertical> 
                                  <input id="ttxs_pro_ocr_maxtime" marginLeft="4" marginRight="6" text="5000" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="对战选项模式" />
                                      <spinner id="ttxs_pro_duizhan_mode" marginLeft="4" marginRight="6" entries="随机顺序(等选项显示后识别答案)|固定顺序(历史遗留选项)|手动答题(识别答案后等待用户手动点击)" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="对战极速模式延迟(历史遗留选项)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="只在选项固定顺序时生效" />
                                  </vertical> 
                                  <input id="ttxs_pro_jisu" marginLeft="4" marginRight="6" text="0" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="是否挂机跳过四人赛首局" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="首局匹配对手较强，挂机不会扣积分局数" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_guaji" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="四人赛" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_siren" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="平衡胜率(答错)次数" />
                                  </vertical> 
                                  <input id="ttxs_pro_dacuo_num" marginLeft="4" marginRight="6" text="2" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="双人对战" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_shuangren" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="本地" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_bendi" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="订阅" />
                                      <spinner id="ttxs_pro_dingyue" marginLeft="4" marginRight="6" entries="不做|正序订阅|只订阅年度上新" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="pushplus_token(微信推送)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="微信关注pushplus推送加，复制token填入" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="注意！搜索结果有两个，一定要关注正确" />
                                      <input id="ttxs_pro_pushplus" text="" textSize="13sp" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="是否启用音量调节" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="每次运行脚本后调节音量百分比" />
                                  </vertical>
                                  <checkbox id="ttxs_pro_yl_on" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="音量" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="调节音量百分比(只填数字)" />
                                  </vertical> 
                                  <input id="ttxs_pro_yinliang" marginLeft="4" marginRight="6" text="0" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="多账号(选填，不限个数)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="使用前确保所有账号都已完成短信验证" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="账号1:密码1:token1(换行/回车)账号2:密码2:token2(换行/回车)账号3:密码3:token3" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="结束后会自动登录回账号1" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="新增多账号1对1微信推送，按格式配置即可" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="没有则根据上面配置的pushplus_token为主" />
                                      <input id="ttxs_pro_zhanghao" text="" textSize="13sp" />
                                  </vertical> 
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_save" text="保存配置" padding="12dp" w="*" />
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_reset" text="恢复默认" padding="12dp" w="*" />
                              </horizontal>
                          </vertical>
                          <vertical id="ttxs" gravity="center">
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="测试" />
                                  </vertical>
                                  <checkbox id="test_article1" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                          </vertical>
                          <vertical id="study" gravity="center">
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="文章学习和广播收听" />
                                  </vertical>
                                  <checkbox id="study_article" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="视频学习" />
                                      <spinner id="study_video" marginLeft="4" marginRight="6" entries="新百灵视频学习|看电视视频学习|百灵视频学习|不进行学习" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每日答题" />
                                  </vertical> 
                                  <checkbox id="study_meiri" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="挑战答题" />
                                  </vertical> 
                                  <checkbox id="study_tiaozhan" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="专项答题" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                  </vertical> 
                                  <checkbox id="study_checkbox_01" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每周答题" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                  </vertical> 
                                  <checkbox id="study_checkbox_02" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="滑块验证延迟" />
                                  </vertical> 
                                  <input id="study_huakuaidelay" marginLeft="4" marginRight="6" text="300" textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="四人赛" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                  </vertical> 
                                  <checkbox id="study_checkbox_03" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="双人对抗" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                  </vertical> 
                                  <checkbox id="study_shuangren" marginLeft="4" marginRight="6" checked="true" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="专项答题模式选择" /> 
                                      <spinner id="study_select" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每周答题模式选择" />
                                      <spinner id="study_selectm" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="四人赛模式选择" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="注：一般手机本地识别速度大于云端，部分手机内置ocr识别较慢，请自行测试" />
                                      <spinner id="study_select_01" marginLeft="4" marginRight="6" entries="内置PaddleOCR->推荐|百度OCR接口,在OCR页配置" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人不受积分限制开关" />
                                  </vertical> 
                                  <checkbox id="study_xianzhi" marginLeft="4" marginRight="6" checked="false" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人额外的随机答题次数(乱答)" />
                                  </vertical> 
                                  <input id="study_another" marginLeft="4" marginRight="6" text="1"  hint="乱答次数"  textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每日、每周、专项答题增强模式" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="使用在线OCR识别答案" />
                                      <spinner id="study_stronger" marginLeft="4" marginRight="6" entries="关闭|使用百度OCR识别答案" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的API Key" />
                                      <input id="study_AK" text=""  gravity="center" textSize="13sp" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的Secret Key" />
                                      <input id="study_SK" text=""  gravity="center" textSize="13sp" />
                                  </vertical> 
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="study_baidusave" text="保存并检查" padding="12dp" w="*" />
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="study_baidureset" text="清空" padding="12dp" w="*" />
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="study_baiduregister" text="注册百度智能云" padding="12dp" w="*" />
                              </horizontal><horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="订阅" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="仅支持学习强国2.33.0及以下版本" />
                                      <spinner id="study_ssub" marginLeft="4" marginRight="6" entries="关闭|翻遍全部，直到订阅完成|只查看上新" />
                                  </vertical> 
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="点点通刷满" />
                                  </vertical> 
                                  <checkbox id="study_diandian" marginLeft="4" marginRight="6" checked="false" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="看门狗(秒)" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="脚本运行的最长时间,超时/错误自动重启脚本" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="防止出现不可控错误,一般重启脚本即可解决" />
                                  </vertical> 
                                  <input id="study_alltime" marginLeft="4" marginRight="6" text="2000"  hint="秒"  textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每篇文章学习时间" />
                                  </vertical> 
                                  <input id="study_time1" marginLeft="4" marginRight="6" text="61"  hint="秒"  textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="每个视频学习时间" />
                                  </vertical> 
                                  <input id="study_time2" marginLeft="4" marginRight="6" text="6"  hint="秒"  textSize="13sp"  inputType="number" />
                              </horizontal>
                              <horizontal  gravity="center_vertical" padding="5 5" >
                                  <View bg="#00BFFF" h="*" w="10"  ></View>
                                  <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                      <text w="auto" textColor="#222222" textSize="15sp" text="push+ 消息推送" />
                                      <text w="auto" textColor="#999999" textSize="12sp" text="注：有需要的自行填写push+的Token，否则留空即可" />
                                      <input id="study_Token" text="" textSize="13sp" />
                                  </vertical> 
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="study_save" text="保存配置" padding="12dp" w="*" />
                              </horizontal>
                              <horizontal>
                                  <button style="Widget.AppCompat.Button.Colored" id="study_reset" text="恢复默认" padding="12dp" w="*" />
                              </horizontal>
                          </vertical>
                      </frame>
                  </ScrollView>
              </viewpager>
          </vertical>
      </drawer>
  );
  
  ui.update.visibility = 8;
  
  http.__okhttp__.setTimeout(10000);
  
  
  var GLOBAL_CONFIG = storages.create("GLOBAL_CONFIG");
  var TTXS_PRO_CONFIG = storages.create("TTXS_PRO_CONFIG");
  var STUDY_CONFIG = storages.create("STUDY_CONFIG");
  var BAIDUAPI = storages.create("BAIDUAPI");
  var execution = "";
  var thread = null;
  Initialize();
  
  activity.setSupportActionBar(ui.toolbar);
  
  // 设置滑动页面的标题
  ui.viewpager.setTitles(["首页", "脚本配置"]);
  // 让滑动页面和标签栏联动
  ui.tabs.setupWithViewPager(ui.viewpager);
  
  // 脚本选择监听
  var script_chosen_Listener = new android.widget.AdapterView.OnItemSelectedListener({
      onItemSelected: function (parent, view, position, id) {
          toastLog('选择脚本：' + ui.script_chosen.getSelectedItem());
          if (ui.script_chosen.getSelectedItemPosition() == 0) {
              ui.ttxs.visibility = 8;
              ui.study.visibility = 8;
              ui.ttxs_pro.visibility = 0;
          } else if (ui.script_chosen.getSelectedItemPosition() == 1) {
              ui.ttxs_pro.visibility = 8;
              ui.study.visibility = 8;
              ui.ttxs.visibility = 0;
          } else if (ui.script_chosen.getSelectedItemPosition() == 2) {
              ui.ttxs_pro.visibility = 8;
              ui.ttxs.visibility = 8;
              ui.study.visibility = 0;
          }
          GLOBAL_CONFIG.put("script_chosen", ui.script_chosen.getSelectedItemPosition());
      }
  })
  ui.script_chosen.setOnItemSelectedListener(script_chosen_Listener);
  
  // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
  // android.permission.SYSTEM_ALERT_WINDOW
  ui.autoService.on("check", function (checked) {
      if (checked && auto.service == null) {
          app.startActivity({
              action: "android.settings.ACCESSIBILITY_SETTINGS"
          });
      }
      if (!checked && auto.service != null) {
          auto.service.disableSelf();
      }
  });
  
  // 悬浮窗权限
  ui.consoleshow.on("check", function (checked) {
      if (checked && !floaty.checkPermission()) {
          app.startActivity({
              packageName: "com.android.settings",
              className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
              data: "package:" + context.getPackageName(),
          });
      }
  });
  
  // 当用户回到本界面时，resume事件会被触发
  ui.emitter.on("resume", function () {
      // 此时根据无障碍服务的开启情况，同步开关的状态
      ui.autoService.checked = auto.service != null;
      ui.consoleshow.checked = floaty.checkPermission();
  });
  
  // 打开日志
  ui.log.click(function () {
      app.startActivity("console");
  });
  
  // 下载并运行所选脚本
  ui.start.click(function () {
      threads.shutDownAll();
      if (thread != null && thread.isAlive()) {
          alert("注意", "脚本正在运行，请结束之前进程");
          return;
      }
      threads.start(function () {
          //let url = 'https://gh-proxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/' + ui.script_chosen.getSelectedItemPosition() + '.js';
          //let url = 'https://agit.ai/smtyuxi2002/apps/raw/branch/main/'+ui.script_chosen.getSelectedItemPosition()+'.js';
          //execution = engines.execScript("匠成学习强助手", http.get(url).body.string());
          //let url = 'https://https://raw.iqiq.io/sntyuxi/info/main/' + ui.script_chosen.getSelectedItemPosition() + '.js';
          let url = 'https://gh-proxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/' + ui.script_chosen.getSelectedItemPosition() + '.js';
          execution = engines.execScript("强国助手", http.get(url).body.string());
      });
  });
  
  // 保存天天向上pro脚本设置
  ui.ttxs_pro_save.click(function () {
      TTXS_PRO_CONFIG.put("watchdog", ui.ttxs_pro_watchdog.getText() + "");
      TTXS_PRO_CONFIG.put("slide_verify", ui.ttxs_pro_slide_verify.getText() + "");
      TTXS_PRO_CONFIG.put("fast_mode", ui.ttxs_pro_fast_mode.isChecked());
      TTXS_PRO_CONFIG.put("ddtong", ui.ttxs_pro_ddtong.isChecked());
      TTXS_PRO_CONFIG.put("is_exit", ui.ttxs_pro_is_exit.isChecked());
      TTXS_PRO_CONFIG.put("pinglun", ui.ttxs_pro_pinglun.isChecked());
      TTXS_PRO_CONFIG.put("shipin", ui.ttxs_pro_shipin.isChecked());
      TTXS_PRO_CONFIG.put("wenzhang", ui.ttxs_pro_wenzhang.isChecked());
      TTXS_PRO_CONFIG.put("meiri", ui.ttxs_pro_meiri.isChecked());
      TTXS_PRO_CONFIG.put("meizhou", ui.ttxs_pro_meizhou.getSelectedItemPosition());
      TTXS_PRO_CONFIG.put("zhuanxiang", ui.ttxs_pro_zhuanxiang.getSelectedItemPosition());
      TTXS_PRO_CONFIG.put("tiaozhan", ui.ttxs_pro_tiaozhan.isChecked());
      TTXS_PRO_CONFIG.put("ocr_choice", ui.ttxs_pro_ocr_choice.getSelectedItemPosition());
      TTXS_PRO_CONFIG.put("ocr_maxtime", ui.ttxs_pro_ocr_maxtime.getText() + "");
      TTXS_PRO_CONFIG.put("duizhan_mode", ui.ttxs_pro_duizhan_mode.getSelectedItemPosition());
      TTXS_PRO_CONFIG.put("jisu", ui.ttxs_pro_jisu.getText() + "");
      TTXS_PRO_CONFIG.put("guaji", ui.ttxs_pro_guaji.isChecked());
      TTXS_PRO_CONFIG.put("siren", ui.ttxs_pro_siren.isChecked());
      TTXS_PRO_CONFIG.put("dacuo_num", ui.ttxs_pro_dacuo_num.getText() + "");
      TTXS_PRO_CONFIG.put("shuangren", ui.ttxs_pro_shuangren.isChecked());
      TTXS_PRO_CONFIG.put("bendi", ui.ttxs_pro_bendi.isChecked());
      TTXS_PRO_CONFIG.put("dingyue", ui.ttxs_pro_dingyue.getSelectedItemPosition());
      TTXS_PRO_CONFIG.put("pushplus", ui.ttxs_pro_pushplus.getText() + "");
      TTXS_PRO_CONFIG.put("yl_on", ui.ttxs_pro_yl_on.isChecked());
      TTXS_PRO_CONFIG.put("yinliang", ui.ttxs_pro_yinliang.getText() + "");
      TTXS_PRO_CONFIG.put("zhanghao", ui.ttxs_pro_zhanghao.getText() + "");
  
      toastLog("天天向上pro配置保存成功！");
  });
  
  // 重置天天向上pro脚本设置
  ui.ttxs_pro_reset.click(function () {
      TTXS_PRO_CONFIG.put("watchdog", "1800");
      ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog"));
      TTXS_PRO_CONFIG.put("slide_verify", "300");
      ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify"));
      TTXS_PRO_CONFIG.put("fast_mode", false);
      ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode"));
      TTXS_PRO_CONFIG.put("ddtong", false);
      ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong"));
      TTXS_PRO_CONFIG.put("is_exit", true);
      ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit"));
      TTXS_PRO_CONFIG.put("pinglun", true);
      ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun"));
      TTXS_PRO_CONFIG.put("shipin", true);
      ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin"));
      TTXS_PRO_CONFIG.put("wenzhang", true);
      ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang"));
      TTXS_PRO_CONFIG.put("meiri", true);
      ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri"));
      TTXS_PRO_CONFIG.put("meizhou", 0);
      ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou"));
      TTXS_PRO_CONFIG.put("zhuanxiang", 0);
      ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang"));
      TTXS_PRO_CONFIG.put("tiaozhan", true);
      ui.ttxs_pro_tiaozhan.setChecked(TTXS_PRO_CONFIG.get("tiaozhan"));
      TTXS_PRO_CONFIG.put("ocr_choice", 0);
      ui.ttxs_pro_ocr_choice.setSelection(TTXS_PRO_CONFIG.get("ocr_choice"));
      TTXS_PRO_CONFIG.put("ocr_maxtime", "5000");
      ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime"));
      TTXS_PRO_CONFIG.put("duizhan_mode", 0);
      ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode"));
      TTXS_PRO_CONFIG.put("jisu", "0");
      ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu"));
      TTXS_PRO_CONFIG.put("guaji", true);
      ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji"));
      TTXS_PRO_CONFIG.put("siren", true);
      ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren"));
      TTXS_PRO_CONFIG.put("dacuo_num", "2");
      ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num"));
      TTXS_PRO_CONFIG.put("shuangren", true);
      ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren"));
      TTXS_PRO_CONFIG.put("bendi", true);
      ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi"));
      TTXS_PRO_CONFIG.put("dingyue", 0);
      ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue"));
      TTXS_PRO_CONFIG.put("pushplus", "");
      ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus"));
      TTXS_PRO_CONFIG.put("yl_on", true);
      ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on"));
      TTXS_PRO_CONFIG.put("yinliang", "0");
      ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang"));
      TTXS_PRO_CONFIG.put("zhanghao", "");
      ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao"));
  
      toastLog("天天向上pro配置恢复默认！");
  });
  
  ui.study_baidusave.click(function () {
      check_baidu_api();
  });
  
  ui.study_baidureset.click(function () {
      BAIDUAPI.put("AK", "");
      BAIDUAPI.put("SK", "");
      ui.study_AK.setText(BAIDUAPI.get("AK", ""));
      ui.study_SK.setText(BAIDUAPI.get("SK", ""));
      toastLog("百度API恢复默认！");
  });
  
  ui.study_baiduregister.click(function () {
      app.openUrl("https://cloud.baidu.com/doc/OCR/s/dk3iqnq51");
  });
  
  // 读取脚本设置
  function Initialize() {
      ui.script_chosen.setSelection(GLOBAL_CONFIG.get("script_chosen", 0));
  
      ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog", "1800"));
      ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify", "300"));
      ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode", false));
      ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong", false));
      ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit", true));
      ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun", true));
      ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin", true));
      ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang", true));
      ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri", true));
      ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou", 0));
      ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang", 0));
      ui.ttxs_pro_tiaozhan.setChecked(TTXS_PRO_CONFIG.get("tiaozhan", true));
      ui.ttxs_pro_ocr_choice.setSelection(TTXS_PRO_CONFIG.get("ocr_choice", 0));
      ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime", "5000"));
      ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode", 0));
      ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu", "0"));
      ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji", true));
      ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren", true));
      ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num", "2"));
      ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren", true));
      ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi", true));
      ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue", 0));
      ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus", ""));
      ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on", true));
      ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang", "0"));
      ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao", ""));
  
      ui.study_article.setChecked(STUDY_CONFIG.get("article", true));
      ui.study_video.setSelection(STUDY_CONFIG.get("video", 0));
      ui.study_meiri.setChecked(STUDY_CONFIG.get("meiri", true));
      ui.study_tiaozhan.setChecked(STUDY_CONFIG.get("tiaozhan", true));
      ui.study_checkbox_01.setChecked(STUDY_CONFIG.get("checkbox_01", true));
      ui.study_checkbox_02.setChecked(STUDY_CONFIG.get("checkbox_02", true));
      ui.study_checkbox_03.setChecked(STUDY_CONFIG.get("checkbox_03", true));
      ui.study_huakuaidelay.setText(STUDY_CONFIG.get("huakuaidelay", "300"));
      ui.study_shuangren.setChecked(STUDY_CONFIG.get("shuangren", true));
      ui.study_select.setSelection(STUDY_CONFIG.get("select", 0));
      ui.study_selectm.setSelection(STUDY_CONFIG.get("selectm", 0));
      ui.study_select_01.setSelection(STUDY_CONFIG.get("select_01", 0));
      ui.study_xianzhi.setChecked(STUDY_CONFIG.get("xianzhi", false));
      ui.study_another.setText(STUDY_CONFIG.get("another", "1"));
      ui.study_stronger.setSelection(STUDY_CONFIG.get("stronger", 0));
      ui.study_AK.setText(BAIDUAPI.get("AK", ""));
      ui.study_SK.setText(BAIDUAPI.get("SK", ""));
      ui.study_ssub.setSelection(STUDY_CONFIG.get("ssub", 0));
      ui.study_diandian.setChecked(STUDY_CONFIG.get("diandian", false));
      ui.study_alltime.setText(STUDY_CONFIG.get("alltime", "2000"));
      ui.study_time1.setText(STUDY_CONFIG.get("time1", "61"));
      ui.study_time2.setText(STUDY_CONFIG.get("time2", "6"));
      ui.study_Token.setText(STUDY_CONFIG.get("Token", ""));
  }
  
  // 检查百度API
  function check_baidu_api() {
      thread = threads.start(function () {
          let AK = String(ui.study_AK.getText());
          let SK = String(ui.study_SK.getText());
          var res = http.post(
              'https://aip.baidubce.com/oauth/2.0/token', {
                  grant_type: 'client_credentials',
                  client_id: AK,
                  client_secret: SK
              }
          ).body.json();
          if ("error" in res) {
              toastLog("API Key或Secret Key存在错误");
              console.log(AK);
              console.log(SK);
              ui.study_AK.setText(BAIDUAPI.get("AK", ""));
              ui.study_SK.setText(BAIDUAPI.get("SK", ""));
              BAIDUAPI.put("AK", "");
              BAIDUAPI.put("SK", "");
          } else {
              toastLog("API Key、Secret Key正确，且已缓存");
              BAIDUAPI.put("AK", AK);
              BAIDUAPI.put("SK", SK);
          }
      });
  }
  
  // APP更新提示
  function checkversion() {
      var releaseNotes = "版本 v" + latest_version + "\n" +
          "更新日志:\n" +
          "* 1.基于AutoX v6.3.4重新打包\n" +
          "* 2.调整默认OCR为Google ML kIT OCR"
      dialogs.build({
              title: "发现新版本",
              content: releaseNotes,
              positive: "立即下载",
              negative: "取消",
              neutral: "浏览器下载",
              checkBoxPrompt: "不再提示",
              cancelable: false
          })
          .on("positive", () => {
              download(apkurl);
          })
          .on("neutral", () => {
              app.openUrl(apkurl);
          })
          .on("check", (checked) => {
              GLOBAL_CONFIG.put("NO_UPDATE", 1);
          }).show();
  }
  
  // 打开下载进度面板
  function download(url) {
      downloadDialog = dialogs.build({
          title: "正在下载...",
          progress: {
              max: 100,
              showMinMax: true
          },
          autoDismiss: false,
          cancelable: false
      }).show();
      startDownload(url);
  }
  
  // 下载apk的主方法体
  function startDownload(url) {
      threads.start(function () {
          var path = files.cwd() + "/new.apk";
          let apkFile = new File(path);
          var conn = new URL(url).openConnection();
          conn.connect();
          let is = conn.getInputStream();
          let length = conn.getContentLength();
          let fos = new FileOutputStream(apkFile);
          let count = 0;
          let buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
          while (true) {
              var p = ((count / length) * 100);
              let numread = is.read(buffer);
              count += numread;
              // 下载完成
              if (numread < 0) {
                  toast("下载完成");
                  downloadDialog.dismiss();
                  downloadDialog = null;
                  break;
              }
              // 更新进度条
              downloadDialog.setProgress(p);
              fos.write(buffer, 0, numread);
          }
          fos.close();
          is.close();
          //自动打开进行安装
          app.viewFile(path);
      })
  }
  


}








