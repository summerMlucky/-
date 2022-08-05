const form = layui.form;
let indexAdd = null;
let layerEdit = null;
const layer = layui.layer;
const initArtCateList = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    data: null,
    success: (res) => {
      // 调用 template
      //   console.log(res);
      const { message, status } = res;
      if (status !== 0) return layer.msg(message);
      //模板引擎
      const htmlStr = template("tpl-table", res);
      $("#tb").empty().html(htmlStr);
    },
  });
};

initArtCateList();

$("#addCateBtn").click(function (e) {
  // `layer.open()` 展示弹出层
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-add").html(),
  });
});

$("body").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: form.val("formAdd"),
    success: (res) => {
      //   console.log(res);
      const { message, status } = res;
      layer.msg(message);
      if (status !== 0) return;
      initArtCateList();
      layer.close(indexAdd);
    },
  });
});

$("#tb").on("click", ".btn-edit", function () {
  layerEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $("#dialog-edit").html(),
  });
  let id = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    // 要删除的分类 Id，注意：这是一个URL参数
    url: "/my/article/cates/" + id,
    success: (res) => {
      const { data, status, message } = res;
      if (status !== 0) return layer.msg(message);
      form.val("formEdit", data);
    },
  });

  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: form.val("formEdit"),
      success: (res) => {
        // console.log(res);
        const { data, message, status } = res;
        layer.msg(message);
        if (status !== 0) return;
        layer.close(layerEdit);
        initArtCateList();
      },
    });
  });
});

$("#tb").on("click", ".btn-delete", function () {
  let id = $(this).attr("data-id");
  // 提示用户是否删除
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
    $.ajax({
      type: "GET",
      url: "/my/article/deletecate/" + id,
      data: null,
      success: (res) => {
        const { data, message, status } = res;
        layer.msg(message);
        if (status !== 0) return;
        initArtCateList();
      },
    });
  });
});
