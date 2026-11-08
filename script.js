'use strict';
const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.nav-links');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(!event.target.closest('.nav'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',closeMenu);

const layerText={interface:'Django templates and HTMX connect each screen to the workflows behind it.',logic:'Django handles roles, seating, timed visits, bookings, and checkout rules.',data:'PostgreSQL stores the application records behind the workspace.'};
document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-layer]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('#layer-description').textContent=layerText[button.dataset.layer];}));

function applyFilter(filter){
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
 let count=0;document.querySelectorAll('.project').forEach(project=>{project.hidden=filter!=='all'&&project.dataset.category!==filter;if(!project.hidden)count++;});
 document.querySelector('.filter-status').textContent=`${count} projects shown.`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
function revealHashProject(hash,scroll){
 if(!hash.startsWith('#project-'))return;
 const target=document.getElementById(hash.slice(1));if(!target?.classList.contains('project'))return;
 if(target.hidden)applyFilter('all');
 if(scroll)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href^="#project-"]');
 if(!anchor||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const hash=anchor.getAttribute('href');
 revealHashProject(hash,false);
 if(location.hash===hash){event.preventDefault();revealHashProject(hash,true);}
});
addEventListener('hashchange',()=>revealHashProject(location.hash,true));
addEventListener('load',()=>revealHashProject(location.hash,true));

const dialog=document.querySelector('#project-dialog');
let projects;
let dialogTrigger;
async function showProject(button){
 button.disabled=true;
 try{
  if(!projects)projects=JSON.parse(document.querySelector('#project-data').textContent);
  const p=projects.find(item=>item.id===button.dataset.project);if(!p)throw new Error('Unknown project');
  for(const [id,text] of [['dialog-type',`${p.type} / ${p.status}`],['dialog-title',p.name],['dialog-description',p.description],['dialog-note',p.note]])document.getElementById(id).textContent=text;
  document.querySelector('#dialog-highlights').replaceChildren(...p.highlights.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  const flow=[];p.flow.forEach((text,index)=>{if(index){const arrow=document.createElement('b');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');flow.push(arrow);}const span=document.createElement('span');span.textContent=text;flow.push(span);});
  document.querySelector('#dialog-flow').replaceChildren(...flow);
  const links=[];
  if(p.repo){const link=document.createElement('a');link.href=p.repo;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`${p.repo_label} ↗`;link.className='button dark-button';links.push(link);}
  const contact=document.createElement('a');contact.href=`mailto:mohamedekramy2510@gmail.com?subject=${encodeURIComponent('About '+p.name)}`;contact.textContent='Ask me about this project ↗';contact.className='button';links.push(contact);
  document.querySelector('#dialog-links').replaceChildren(...links);dialogTrigger=button;button.disabled=false;dialog.showModal();document.body.classList.add('dialog-open');
 }catch{const feedback=document.querySelector('#project-feedback');feedback.hidden=false;feedback.textContent='Project notes could not open. Please try again, or email Mohamed using the Contact section.';}
 finally{button.disabled=false;}
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>showProject(button)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(dialogTrigger?.isConnected&&!dialogTrigger.closest('[hidden]'))dialogTrigger.focus();});
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});

document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('mohamedekramy2510@gmail.com');status.textContent='Email copied. Talk soon!';}catch{status.textContent='Select the email address to open your email app, or copy it manually.';}});
document.querySelector('#year').textContent=new Date().getFullYear();
let scrollFrame;function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.width=`${height>0?scrollY/height*100:0}%`;scrollFrame=null;}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateProgress);},{passive:true});updateProgress();
