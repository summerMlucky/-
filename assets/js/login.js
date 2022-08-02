// 点击去注册账号让 登录框隐藏，注册框显示
$("#link_reg").on("click", function () {
  $(".login-box").hide();
  $(".reg-box").show();
});
// 点击去登录让 注册框隐藏，登录框显示
$("#link_login").on("click", function () {
  $(".reg-box").hide();
  $(".login-box").show();
});

// 从 LayUI 中获取 form 对象
const form = layui.form;
form.verify({
  repass: (value) => {
    //value：表单的值
    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    const pwd = $(".reg-box [name = password").val();
    if (pwd !== value) {
      return "两次密码不一致";
    }
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});
//注册
// const baseUrl = "http://www.liulongbin.top:3007";
$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: (res) => {
      console.log(res);
      const { message, status } = res;
      // layer.msg(message)弹窗
      if (status !== 0) return layer.msg(message);
      $("#link_login").click();
    },
  });
});

//登录
$("#form_login").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: function (res) {
      console.log(res);
      const { message, status, token } = res;
      if (status !== 0) return layer.masg(message);
       // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem("token", token);
       // 跳转到主页
      location.href = "/index.html";
    },
  });
});
