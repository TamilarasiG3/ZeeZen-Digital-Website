/* ═══════════════════════════════════════════
   Zeezen — Main Script
   Replace the 3 EmailJS values below before deploying
═══════════════════════════════════════════ */

// ── EmailJS Credentials ──────────────────────
// Replace these with your actual values from emailjs.com
const EMAILJS_PUBLIC_KEY  = "0cMtHLxFTn8MHfWtp";
    const EMAILJS_SERVICE_ID  = "service_au93wwg";
    const EMAILJS_TEMPLATE_ID = "template_frwhvdk";
    emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Main Logic ───────────────────────────────
/* cursor */
const cg=document.getElementById('cg');
document.addEventListener('mousemove',e=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px';},{passive:true});

/* progress */
const pb=document.getElementById('pb');
window.addEventListener('scroll',()=>{pb.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';},{passive:true});

/* nav */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('sc',window.scrollY>30),{passive:true});

/* active links */
const secs=document.querySelectorAll('section[id]');
const links=document.querySelectorAll('.nl a');
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){links.forEach(l=>l.classList.remove('ac'));const a=document.querySelector(`.nl a[href="#${e.target.id}"]`);if(a)a.classList.add('ac');}
  });
},{threshold:0.4}).observe&&secs.forEach(s=>new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('ac'));const a=document.querySelector(`.nl a[href="#${e.target.id}"]`);if(a)a.classList.add('ac');}});},{threshold:0.4}).observe(s));

/* hamburger */
const ham=document.getElementById('ham'),mob=document.getElementById('mob');
ham.addEventListener('click',()=>{const o=ham.classList.toggle('op');mob.classList.toggle('op',o);document.body.style.overflow=o?'hidden':'';});
function cm(){ham.classList.remove('op');mob.classList.remove('op');document.body.style.overflow='';}

/* reveal */
const rv=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');rv.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>rv.observe(el));

/* counters */
function aC(el){
  const t=+el.dataset.count,sf=el.dataset.suffix||'+',dur=1800,s=performance.now();
  const step=now=>{const p=Math.min((now-s)/dur,1),e2=1-Math.pow(1-p,4);el.textContent=Math.floor(e2*t)+sf;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}
new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){aC(e.target);}}),{threshold:.5}).observe&&
document.querySelectorAll('[data-count]').forEach(el=>new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){aC(e.target);new IntersectionObserver(()=>{}).observe(e.target);}}),{threshold:.5}).observe(el));

/* particles */
const pc=document.getElementById('pts');
for(let i=0;i<20;i++){const p=document.createElement('div');p.className='pt';const sz=Math.random()*3+1.5;p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${Math.random()*20}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*12}s;`;pc.appendChild(p);}

/* FAQ accordion */
function toggleFaq(q){
  const item=q.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* form */
function val(id,eid,fn){const el=document.getElementById(id);const ok=fn(el.value.trim());el.classList.toggle('err',!ok);document.getElementById(eid).classList.toggle('on',!ok);return ok;}
function handleSubmit(){
  const n=val('name','ne',v=>v.length>1);
  const e=val('email','ee',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const m=val('msg','me',v=>v.length>5);
  if(!n||!e||!m)return;
  const btn=document.getElementById('sb');
  btn.classList.add('loading');btn.disabled=true;
  const ob=document.getElementById('sendErrBanner');if(ob)ob.remove();
  emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
    from_name:document.getElementById('name').value.trim(),
    from_email:document.getElementById('email').value.trim(),
    message:document.getElementById('msg').value.trim(),
    to_email:'zee7zen@gmail.com',
  }).then(()=>{document.getElementById('fw').style.display='none';document.getElementById('fs').classList.add('on');})
  .catch(err=>{console.error(err);btn.classList.remove('loading');btn.disabled=false;const b=document.createElement('p');b.id='sendErrBanner';b.style.cssText='color:#f87171;font-size:.82rem;margin-top:14px;text-align:center;';b.textContent='Something went wrong. Please try again or email zee7zen@gmail.com directly.';btn.after(b);});
}
['name','email','msg'].forEach(id=>{
  document.getElementById(id).addEventListener('input',function(){this.classList.remove('err');const m={name:'ne',email:'ee',msg:'me'};document.getElementById(m[id]).classList.remove('on');});
});