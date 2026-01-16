/* CURSOR */
let x=0,y=0,cx=0,cy=0;
const glow=document.querySelector(".cursor-glow");
addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY});
(function loop(){
  cx+=(x-cx)*.1; cy+=(y-cy)*.1;
  glow.style.left=cx+"px"; glow.style.top=cy+"px";
  requestAnimationFrame(loop);
})();

/* REVEAL */
const io=new IntersectionObserver(e=>{
  e.forEach(v=>v.isIntersecting&&v.target.classList.add("visible"));
});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

/* COPY */
const toast=document.getElementById("toast");
document.querySelectorAll(".copy").forEach(e=>{
  e.onclick=()=>{
    navigator.clipboard.writeText(e.dataset.copy);
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),1200);
  };
});

/* SNOW */
const c=document.getElementById("snow"),ctx=c.getContext("2d");
function rs(){c.width=innerWidth;c.height=innerHeight}
rs();addEventListener("resize",rs);
let snow=[...Array(120)].map(()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.5+.5,s:Math.random()*.5+.2}));
(function fall(){
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle="rgba(255,255,255,.7)";
  snow.forEach(f=>{
    ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();
    f.y+=f.s;if(f.y>c.height){f.y=0;f.x=Math.random()*c.width}
  });
  requestAnimationFrame(fall);
})();

/* MUSIC */
const music=document.getElementById("bgMusic");
let started=false;
addEventListener("click",()=>{
  if(started) return;
  started=true;
  music.volume=0;
  music.play();
  let v=0;
  const f=setInterval(()=>{
    if(v>=0.4)clearInterval(f);
    music.volume=v;v+=0.02;
  },100);
},{once:true});

document.getElementById("muteBtn").onclick=()=>{
  music.muted=!music.muted;
};
