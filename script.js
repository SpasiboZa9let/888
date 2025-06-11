
const MARKERS=[{x:.2,y:.83,img:'photo/1.jpg',text:'Воспоминание 1'},{x:.35,y:.70,img:'photo/2.jpg',text:'Воспоминание 2'},{x:.5,y:.583,img:'photo/3.jpg',text:'Воспоминание 3'},{x:.65,y:.467,img:'photo/4.jpg',text:'Воспоминание 4'},{x:.8,y:.383,img:'photo/5.jpg',text:'Воспоминание 5'}];
const panel=document.getElementById('memory-panel'),imgBox=document.getElementById('memory-img'),txtBox=document.getElementById('memory-text'),map=document.getElementById('map'),cont=document.getElementById('map-container');
const nodes=MARKERS.map(m=>{const el=document.createElement('div');el.className='marker';el.dataset.img=m.img;el.dataset.text=m.text;cont.appendChild(el);el.addEventListener('mouseenter',()=>{imgBox.src=m.img;txtBox.textContent=m.text;panel.classList.add('show');});el.addEventListener('mouseleave',()=>setTimeout(()=>panel.classList.remove('show'),300));return{el,m};});
function positionMarkers(){const W=map.clientWidth,H=map.clientHeight;nodes.forEach(({el,m})=>{el.style.left=m.x*W+'px';el.style.top=m.y*H+'px';});}
positionMarkers();window.addEventListener('resize',positionMarkers);
