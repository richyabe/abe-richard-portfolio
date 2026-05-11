// Cursor
const cur=document.getElementById("cur"),curR=document.getElementById("cur-r");
let mx=0,my=0,rx=0,ry=0;
document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+"px";cur.style.top=my+"px"});
(function animR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+"px";curR.style.top=ry+"px";requestAnimationFrame(animR)})();
document.querySelectorAll("a,button").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("hovering"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("hovering"));
});

// Particles
const ptcl=document.getElementById("ptcl");
for(let i=0;i<24;i++){const p=document.createElement("div");p.className="p";p.style.cssText=`left:${Math.random()*100}vw;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;bottom:-10px;animation-duration:${9+Math.random()*14}s;animation-delay:${Math.random()*18}s`;ptcl.appendChild(p)}

// Typing
const words=["Developer","Problem Solver","Creator","Builder","Frontend Dev"];
let wi=0,ci=0,del=false;
const tel=document.getElementById("typed");
function type(){
  const w=words[wi];
  if(del){tel.textContent=w.substring(0,ci-1);ci--}
  else{tel.textContent=w.substring(0,ci+1);ci++}
  let spd=del?75:140;
  if(!del&&ci===w.length){spd=2200;del=true}
  else if(del&&ci===0){del=false;wi=(wi+1)%words.length;spd=500}
  setTimeout(type,spd);
}
type();

// Nav scroll
const nav=document.getElementById("nav");
window.addEventListener("scroll",()=>{nav.style.background=window.scrollY>50?"rgba(6,7,15,0.98)":"rgba(6,7,15,0.9)"});

// Active nav
const secs=["hero","about","skills","projects","experience","captions","contact"];
window.addEventListener("scroll",()=>{
  let cur2="";
  secs.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-80)cur2=id});
  document.querySelectorAll(".nav-links a").forEach(a=>{a.classList.toggle("active",a.getAttribute("href")==="#"+cur2)});
});

// Mobile nav
function toggleMob(){document.getElementById("mob-nav").classList.toggle("open")}
function closeMob(){document.getElementById("mob-nav").classList.remove("open")}

// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(a=>{
  a.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(a.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth",block:"start"});closeMob()});
});

// Reveal
const rvObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("on"),i*60);rvObs.unobserve(e.target)}});
},{threshold:.08});
document.querySelectorAll(".rv").forEach(el=>rvObs.observe(el));

// Skill bars
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll(".sfill").forEach(b=>setTimeout(()=>{b.style.transform=`scaleX(${b.dataset.w/100})`},200));e.stopObserving&&e.stopObserving()}});
},{threshold:.3}).observe(document.querySelector(".skills-bars"));

// Counters
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll(".hstat-val").forEach(v=>{
        const t=+v.dataset.t,s=v.dataset.s;
        let st=null;
        const step=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/1400,1);v.textContent=Math.floor(p*t)+s;if(p<1)requestAnimationFrame(step)};
        requestAnimationFrame(step);
      });
    }
  });
},{threshold:.5}).observe(document.querySelector(".hero-stats"));

// Copy captions
function cp(txt,btn){
  navigator.clipboard.writeText(txt).then(()=>{
    const o=btn.textContent;btn.textContent="[ ✓ copied! ]";btn.style.borderColor="var(--blue)";btn.style.color="var(--blue)";
    setTimeout(()=>{btn.textContent=o;btn.style.borderColor="";btn.style.color=""},1800);
  }).catch(()=>{btn.textContent="[ select & copy ]";setTimeout(()=>{btn.textContent="[ copy caption ]"},2000)});
}

// Send via WhatsApp
function sendToWhatsApp(){
  const name = document.getElementById('wa-name').value.trim();
  const email = document.getElementById('wa-email').value.trim();
  const subject = document.getElementById('wa-subject').value.trim();
  const msg = document.getElementById('wa-msg').value.trim();
  const btn = document.getElementById('wa-send-btn');

  if(!name || !msg){
    btn.textContent = '⚠ Please fill Name & Message';
    btn.style.background = '#7a3a00';
    setTimeout(()=>{ btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Send via WhatsApp'; btn.style.background='#25d366'; }, 2500);
    return;
  }

  // Build WhatsApp message
  let waText = `Hello Abe! 👋\n\n`;
  waText += `*Name:* ${name}\n`;
  if(email) waText += `*Email:* ${email}\n`;
  if(subject) waText += `*Subject:* ${subject}\n`;
  waText += `\n*Message:*\n${msg}\n\n`;
  waText += `_Sent from your portfolio website_`;

  const encoded = encodeURIComponent(waText);
  const waURL = `https://wa.me/2347018586234?text=${encoded}`;

  // Open WhatsApp
  window.open(waURL, '_blank');

  // Button feedback
  btn.innerHTML = '✓ Opening WhatsApp...';
  btn.style.background = '#128c7e';
  setTimeout(()=>{
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Send via WhatsApp';
    btn.style.background = '#25d366';
  }, 3000);
}