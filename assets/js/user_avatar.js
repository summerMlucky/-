// 1.1 获取裁剪区域的 DOM 元素
var $image = $("#image");
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: ".img-preview",
};

// 1.3 创建裁剪区域
$image.cropper(options);

$("#uploadBtn").on("click", function () {
  $("#file").click();
});
$("#file").on("change", function (e) {
  const files = e.target.files;
  //   console.log(files);
  if (files.length == 0) return layer.msg("请选择上传的文件");
  let file = files[0];
  console.log(file);
  // 2. 将文件，转化为路径
  let imgUrl = URL.createObjectURL(file);
  // 3. 重新初始化裁剪区域
  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgUrl) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

$("#sureBtn").on("click", function (e) {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL("image/png");
  $.ajax({
    type: "POST",
    url: "/my/update/avatar",
    data: {
      avatar: dataURL,
    },
    success: (res) => {
      const { message, status } = res;
      layer.msg(message);
      if (status !== 0) return;
      window.parent.getUserInfo()
    },
  });
});
