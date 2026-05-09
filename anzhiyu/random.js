var posts=["2024/04/09/buu_misc2/","2024/04/05/buu_misc1/","2025/04/08/html-study/","2024/11/20/buu_misc3/","2025/11/05/next主题美化/","2025/04/08/css-study/","2025/04/07/test/","2025/04/07/staller主题美化/","2025/04/10/js/","2025/04/07/xyctf_wp/","2025/06/08/基于Windows控制台的入侵检测系统配置/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };