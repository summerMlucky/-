// 从 LayUI 中获取 form 对象
const form = layui.form;
form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  email: [/@/, "邮箱输入错误"],
});

const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    success: (res) => {
      const { message, status, data } = res;
      if (status !== 0) return layer.msg(message);
      //给表单赋值
      //formUserInfo 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
      form.val("formUserInfo", data);
    },
  });
};
initUserInfo();

$("#resetBtn").click(function(e){
    e.preventDefault();
    initUserInfo();
})

$('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({
       type:'POST',
       url:'/my/userinfo',
       data:form.val("formUserInfo"),
       success:res =>{
        console.log(res);
        const { message, status}= res;
        if(status !== 0) return layer.msg(message)
        layer.msg("更新用户信息成功！");
            // 调用父页面渲染函数
            window.parent.getUserInfo()
    }
    })
})
