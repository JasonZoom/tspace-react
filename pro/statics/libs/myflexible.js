var pdr = window.devicePixelRatio;
var html = document.documentElement;
flexweb(pdr);
function flexweb(pdr){
	var winwidth = window.innerWidth;
	var size = 0;
	var metastr = "";
	var viewportMeta = getViewportMeta();
	size = winwidth/10;
	if(pdr==1){
		metastr='width=device-api,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
	}else{
		metastr='width=device-api,initial-scale='+1/pdr+', maximum-scale='+1/pdr+', minimum-scale='+1/pdr+', user-scalable=no';
	}
	viewportMeta.setAttribute('content',metastr);
	html.style.fontSize=size+'px';
	html.setAttribute('data-dpr',pdr);
}
function getViewportMeta(){
	var meta = document.getElementsByTagName("meta");
	var len = meta.length;
	for(var i =0;i<len;i++){
		if(meta[i].getAttribute("name")=="viewport"){
			return meta[i];
		}
	}
}
window.addEventListener("resize",function(){
	flexweb(pdr);
})
