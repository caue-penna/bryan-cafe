(function(){'use strict';
function escapeHTML(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
function loadMenu(){var l=document.getElementById('menu-loading'),e=document.getElementById('menu-error'),c=document.getElementById('menu-content');if(!c)return;
var x=new XMLHttpRequest();x.open('GET','data/menu.xml',true);x.responseType='document';x.overrideMimeType&&x.overrideMimeType('text/xml');
x.onload=function(){if(x.status>=200&&x.status<300)render(x.responseXML);else{if(l)l.style.display='none';if(e){e.style.display='block';e.textContent='Could not load menu (HTTP '+x.status+').';}}};
x.onerror=function(){if(l)l.style.display='none';if(e){e.style.display='block';e.textContent='Network error loading the menu.';}};
try{x.send();}catch(err){if(e){e.style.display='block';e.textContent='Error: '+err.message;}}}
function render(xml){var l=document.getElementById('menu-loading'),c=document.getElementById('menu-content');if(!xml){if(l)l.textContent='Menu unavailable.';return;}
var cats=xml.getElementsByTagName('category');if(cats.length===0){if(l)l.textContent='No menu items found.';return;}
var h='';for(var i=0;i<cats.length;i++){var cat=cats[i];h+='<div class="menu-category"><h2>'+escapeHTML(cat.getAttribute('name')||'Menu')+'</h2><div class="menu-grid">';
var items=cat.getElementsByTagName('item');for(var j=0;j<items.length;j++){var it=items[j],n=getText(it,'name'),d=getText(it,'description'),pe=it.getElementsByTagName('price')[0],p=pe?pe.textContent:'',cu=pe?(pe.getAttribute('currency')||'AUD'):'AUD',img=getText(it,'image');
h+='<article class="menu-item"><img src="images/'+escapeHTML(img)+'" alt="'+escapeHTML(n)+'" class="menu-item-image" onerror="this.style.display=\'none\'"><div class="menu-item-body"><h3 class="menu-item-name">'+escapeHTML(n)+'</h3><p class="menu-item-desc">'+escapeHTML(d)+'</p><div class="menu-item-price">'+escapeHTML(cu)+' '+escapeHTML(p)+'</div></div></article>';}
h+='</div></div>';}if(l)l.style.display='none';c.innerHTML=h;}
function getText(p,t){var e=p.getElementsByTagName(t)[0];return e?(e.textContent||''):'';}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadMenu);else loadMenu();
})();
