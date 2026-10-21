(function(){
  var REPO="leekhiplus/VoxaZ-Studio";
  var y=document.getElementById("year"); if(y){y.textContent=new Date().getFullYear();}
  var box=document.getElementById("release-info");
  if(box && window.fetch){
    fetch("https://api.github.com/repos/"+REPO+"/releases/latest")
      .then(function(r){return r.ok?r.json():null;})
      .then(function(d){
        if(!d){return;}
        var apk=(d.assets||[]).filter(function(a){return /\.apk$/i.test(a.name);})[0];
        var date=d.published_at?new Date(d.published_at).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"}):"";
        var size=apk?(apk.size/1048576).toFixed(1)+" MB":"";
        var parts=[d.name||d.tag_name,date,size].filter(Boolean);
        if(parts.length){var txt="Latest build: "+parts.join(" · ");box.textContent=txt;var b2=document.getElementById("release-info2");if(b2){b2.textContent=txt;}}
        if(apk){document.querySelectorAll("[data-apk]").forEach(function(a){a.href=apk.browser_download_url;});}
      }).catch(function(){});
  }
})();
