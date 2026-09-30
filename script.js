const scenes=[...document.querySelectorAll('.scene')];
const dots=document.getElementById('dots');
const progress=document.getElementById('progress');
const pauseBtn=document.getElementById('pause');
const restartBtn=document.getElementById('restart');

let i=0, playing=true, timer=null;
const duration=3800;

scenes.forEach((_,n)=>{
  const d=document.createElement('div');
  d.className='dot'+(n===0?' active':'');
  dots.appendChild(d);
});

function typeInto(el,text,speed=55){
  if(!el) return;
  el.textContent='';
  let n=0;
  const t=setInterval(()=>{
    el.textContent=text.slice(0,++n);
    if(n>=text.length) clearInterval(t);
  },speed);
}

function restartPlane(){
  const p=document.querySelector('.real-plane');
  if(!p) return;
  p.style.animation='none';
  void p.offsetWidth;
  p.style.animation='flyPlane 4s cubic-bezier(.2,.65,.25,1) forwards';
}

function sceneSpecific(n){
  if(n===0) restartPlane();

  if(n===1){
    typeInto(document.getElementById('peopleType'),'Hotel à Hammamet pour 2 adultes',50);
  }

  if(n===2){
    typeInto(document.getElementById('hotelType'),'Hammamet • 2 adultes • 2 nuits',55);
  }

  if(n===4){
    typeInto(document.getElementById('fromField'),'Tunis (TUN)',70);
    setTimeout(()=>typeInto(document.getElementById('toField'),'Paris (PAR)',70),450);
    setTimeout(()=>typeInto(document.getElementById('dateField'),'12 Octobre 2026',65),900);
    setTimeout(()=>typeInto(document.getElementById('travField'),'2 voyageurs',65),1350);
  }

  if(n===3){
    let k=0;
    const slides=[...document.querySelectorAll('.slide')];
    slides.forEach((s,x)=>s.classList.toggle('show',x===0));
    window._slideInt && clearInterval(window._slideInt);
    window._slideInt=setInterval(()=>{
      k=(k+1)%slides.length;
      slides.forEach((s,x)=>s.classList.toggle('show',x===k));
    },900);
  } else {
    window._slideInt && clearInterval(window._slideInt);
  }
}

function animateProgress(){
  progress.style.transition='none';
  progress.style.width='0%';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    progress.style.transition=`width ${duration}ms linear`;
    progress.style.width='100%';
  }));
}

function go(n){
  i=(n+scenes.length)%scenes.length;
  scenes.forEach((s,x)=>s.classList.toggle('active',x===i));
  [...dots.children].forEach((d,x)=>d.classList.toggle('active',x===i));
  sceneSpecific(i);
  clearTimeout(timer);

  if(playing){
    animateProgress();
    timer=setTimeout(()=>go(i+1),duration);
  }
}

pauseBtn.onclick=()=>{
  playing=!playing;
  pauseBtn.textContent=playing?'Pause':'Lecture';
  if(playing) go(i);
  else{
    clearTimeout(timer);
    progress.style.transition='none';
  }
};

restartBtn.onclick=()=>{
  playing=true;
  pauseBtn.textContent='Pause';
  go(0);
};

go(0);
