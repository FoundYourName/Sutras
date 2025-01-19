//收藏本站
function dr_add_favorite(url, title) {
    try {
        window.external.addFavorite(url, title)
    } catch(e) {
        try {
            window.sidebar.addPanel(title, url, "")
        } catch(e) {
           alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}


//设为首页
function dr_set_homepage(url) {
    if ($.browser.msie) {
        document.body.style.behavior = "url(#default#homepage)";
        document.body.setHomePage(url)
    } else {
		 alert("设置首页失败，您需要手动设置为首页");
    }
}


//保存到桌面
function toDesktop(url,title){
try {
    var WshShell = new ActiveXObject("WScript.Shell");
    var oUrlLink =          WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop")     + "\\" + title + ".url");
    oUrlLink.TargetPath = url;
    oUrlLink.Save();
    }  
catch(e)  {  
          alert("保存到桌面失败，您需要手动保存到桌面");  
}
}   