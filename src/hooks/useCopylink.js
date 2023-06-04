export default function(item){
        // 模拟 输入框
        var cInput = document.createElement("input");
        cInput.value = item;
        document.body.appendChild(cInput);
        cInput.select(); // 选取文本框内容
    
        // 执行浏览器复制命令
        // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
        // Input要在正常的编辑状态下原生复制方法才会生效
    
        document.execCommand("copy");
    
        openSuccess("复制成功");
        // 复制成功后再将构造的标签 移除
        document.body.removeChild(cInput);
    }
    // 成功弹窗
    const openSuccess = (value) => {
        ElMessage({
            message: value,
            type: "success",
        });
}