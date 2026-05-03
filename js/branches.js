(function(){'use strict';
function escapeHTML(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
function isSafeMapsUrl(u){return /^https:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/i.test(u||'');}
function loadBranches(){var l=document.getElementById('branches-loading'),e=document.getElementById('branches-error'),c=document.getElementById('branches-content');if(!c)return;
var x=new XMLHttpRequest();x.open('GET','data/branches.xml',true);x.responseType='document';x.overrideMimeType&&x.overrideMimeType('text/xml');
x.onload=function(){if(x.status>=200&&x.status<300)render(x.responseXML);else{if(l)l.style.display='none';if(e){e.style.display='block';e.textContent='Could not load branches (HTTP '+x.status+').';}}};
x.onerror=function(){if(l)l.style.display='none';if(e){e.style.display='block';e.textContent='Network error.';}};
try{x.send();}catch(err){}}
function render(xml){var l=document.getElementById('branches-loading'),c=document.getElementById('branches-content');if(!xml){if(l)l.textContent='Branch data unavailable.';return;}
var bs=xml.getElementsByTagName('branch');if(bs.length===0){if(l)l.textContent='No branches found.';return;}
var h='<div class="branches-grid">';for(var i=0;i<bs.length;i++){var b=bs[i],n=gt(b,'name'),a=gt(b,'address'),p=gt(b,'phone'),he=b.getElementsByTagName('hours')[0],wd=he?gt(he,'weekdays'):'',we=he?gt(he,'weekends'):'',m=gt(b,'maps');
h+='<article class="branch-card"><h3>'+escapeHTML(n)+'</h3><p class="branch-info"><strong>Address:</strong> '+escapeHTML(a)+'</p><p class="branch-info"><strong>Phone:</strong> <a href="tel:'+escapeHTML(p.replace(/\s/g,''))+'">'+escapeHTML(p)+'</a></p><p class="branch-info"><strong>Mon–Fri:</strong> '+escapeHTML(wd)+'</p><p class="branch-info"><strong>Sat–Sun:</strong> '+escapeHTML(we)+'</p>';
if(isSafeMapsUrl(m))h+='<a class="branch-link" href="'+escapeHTML(m)+'" target="_blank" rel="noopener noreferrer">View on Google Maps &rarr;</a>';h+='</article>';}h+='</div>';
if(l)l.style.display='none';c.innerHTML=h;}
function gt(p,t){var e=p.getElementsByTagName(t)[0];return e?(e.textContent||'').trim():'';}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadBranches);else loadBranches();
})();
