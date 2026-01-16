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

/* ❄️ FULL PAGE ANTI-GRAVITY + VORTEX SNOW */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flakes = Array.from({length:200},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*1.6+0.4,
  speed:Math.random()*0.35+0.15,
  angle:Math.random()*Math.PI*2,
  alpha:Math.random()*0.6+0.25
}));

function animateSnow(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();

    f.y -= f.speed;
    f.angle += 0.008;
    f.x += Math.cos(f.angle)*0.28;

    if(f.y < -10){
      f.y = canvas.height + 10;
      f.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(animateSnow);
}

animateSnow();
