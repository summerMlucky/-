function getUserInfo(){
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    success: (res) => {
      if (res.status !== 0) return layui.layer.msg("数据请求失败！");
      renderAvatar(res.data);
    },
  });
};

// 渲染用户头像
const renderAvatar = (data) => {
  // 获取用户名字
  let name = data.nickname || data.username;
  // 设置欢迎文本
  $("#welcome").html("欢迎" + name);
  // 按需渲染用户头像
  if (data.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", data.user_pic);
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};
getUserInfo();

$('#exitBtn').click(function(){
    // layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
    //     //do something
    //     layer.close(index);
    //   });
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
            console.log(index);
        }
    );
})
