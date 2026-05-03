(function(){'use strict';
function setFooterYear(){var s=document.getElementById('current-year');if(s)s.textContent=new Date().getFullYear();}
function initNavToggle(){var t=document.querySelector('.nav-toggle'),m=document.querySelector('.nav-menu');if(!t||!m)return;t.addEventListener('click',function(){var o=m.classList.toggle('open');t.setAttribute('aria-expanded',String(o));});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setFooterYear();initNavToggle();});
else{setFooterYear();initNavToggle();}
})();
