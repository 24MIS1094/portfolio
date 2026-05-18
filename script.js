/* Cinematic Intro Sequence */
window.addEventListener('DOMContentLoaded',()=>{
  const overlay=document.getElementById('intro-overlay');
  const profile=document.getElementById('intro-profile');
  const name=document.getElementById('intro-name');
  const surname=document.getElementById('intro-surname');
  if(!overlay)return;
  setTimeout(()=>{
    profile.style.opacity=1;
    profile.style.transform='scale(1)';
  },700);
  setTimeout(()=>{
    name.style.opacity=1;
    surname.style.opacity=1;
  },1700);
  setTimeout(()=>{
    overlay.style.opacity=0;
    overlay.style.pointerEvents='none';
    setTimeout(()=>overlay.style.display='none',700);
  },3200);
});
/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
    }

  });
},{threshold:0.25});

document.querySelectorAll(".reveal").forEach(sec=>{
  observer.observe(sec);
});

/* ❄️ SNOW */
const canvas=document.getElementById("snow");
const ctx=canvas.getContext("2d");

function resize(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

const flakes=[...Array(200)].map(()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*1.6+.4,
  v:Math.random()*.35+.15,
  a:Math.random()*Math.PI*2,
  o:Math.random()*.6+.3
}));

(function snow(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.fillStyle=`rgba(255,255,255,${f.o})`;
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y-=f.v;
    f.a+=0.008;
    f.x+=Math.cos(f.a)*0.28;
    if(f.y<-10){
      f.y=canvas.height+10;
      f.x=Math.random()*canvas.width;
    }
  });
  requestAnimationFrame(snow);
})();

/* PDF OPEN */
function openPDF(path){
  window.open(path,"_blank");
}
