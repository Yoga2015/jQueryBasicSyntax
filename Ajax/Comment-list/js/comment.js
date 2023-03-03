// 获取 评论列表 数据     一进入页面就获取   并渲染到页面上
function getCommentList() {
  $.ajax({
    method: "GET",
    url: "http://www.liulongbin.top:3006/api/cmtlist",
    success: function (res) {
      if (res.status !== 200) {
        return alert('获取评论列表数据失败')
      }
      // console.log("获取数据成功");  // 这行比下一行先打印
      // console.log(res);   // 查看响应回来的数据格式 来 获取 想要的数据

      let rows = [];
      $.each(res.data, function (i, item) {
        let str = `<li class="list-group-item">
          <span class="badge" style="background-color: yellowgreen">评论时间：`+ item.time + `</span>
          <span class="badge" style="background-color: aqua" >评论人：`+ item.username + `</span>
          `+ item.content + `</li>`;

        rows.push(str);
      });
      $("#cmt-list").empty().append(rows.join(''));

    }
  })
};

getCommentList();

$(function () {
  // 1、监听 表单的提交
  $("#formAddCmt").submit(function (e) {
    // 2、阻止页面跳转
    e.preventDefault();
    // 3、获取 表单中的数据
    var data = $(this).serialize();
    // console.log(data);
    // 4、把 表单中的数据 通过 ajax 发给服务器
    $.post("http://www.liulongbin.top:3006/api/addcmt", data,
      function (res) {
        console.log(res);
        // 4.1、若发表评论失败，就弹出提示
        if (res.status !== 201) {
          return alert("发表评论失败");
        }
        // 4.2、若发表评论成功了，就刷新评论列表
        getCommentList();
        // 4.3重置表单(清空表单中的数据) ，通过调用 DOM元素的方法 reset() 来清空表单
        // 如果你想把一个 jQuery对象 转成 原生DOM元素，就在 jQuery对象 后加上[0]
        $("#formAddCmt")[0].reset()

      })
  })
})


