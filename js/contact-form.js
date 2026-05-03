(function(){'use strict';
function init(){var f=document.getElementById('enquiry-form');if(!f)return;
var fl=['firstName','lastName','email','subject','message'];
fl.forEach(function(id){var el=document.getElementById(id);if(el){el.addEventListener('blur',function(){validate(id);});el.addEventListener('input',function(){clear(id);});}});
f.addEventListener('submit',function(e){e.preventDefault();submit(f,fl);});}
function validate(id){var el=document.getElementById(id);if(!el)return true;var v=el.value.trim(),m='';
if(!v)m='This field is required.';
else if(id==='firstName'||id==='lastName'){if(v.length<2)m='Must be at least 2 characters.';else if(!/^[a-zA-Z\s'-]+$/.test(v))m='Only letters allowed.';}
else if(id==='email'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='Please enter a valid email address.';}
else if(id==='subject'){if(v.length<3)m='Subject must be at least 3 characters.';}
else if(id==='message'){if(v.length<10)m='Message must be at least 10 characters.';}
err(id,m);return m==='';}
function err(id,m){var i=document.getElementById(id),e=document.getElementById(id+'-error');if(i){if(m)i.classList.add('invalid');else i.classList.remove('invalid');i.setAttribute('aria-invalid',m?'true':'false');}if(e)e.textContent=m||'';}
function clear(id){var i=document.getElementById(id),e=document.getElementById(id+'-error');if(i)i.classList.remove('invalid');if(e)e.textContent='';}
function submit(f,fl){var ok=true;fl.forEach(function(id){if(!validate(id))ok=false;});if(!ok){for(var i=0;i<fl.length;i++){var el=document.getElementById(fl[i]);if(el&&el.classList.contains('invalid')){el.focus();break;}}return;}
var s=document.getElementById('form-success');if(s){s.style.display='block';s.scrollIntoView({behavior:'smooth',block:'center'});}f.reset();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
