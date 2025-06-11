
const EMOJIS=['🙂','😌','☁️','🫧','✨','🌸'];
function spawnEmoji(){const el=document.createElement('div');el.textContent=EMOJIS[Math.random()*EMOJIS.length|0];el.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:100vh;font-size:calc(4vw + 24px);opacity:.5;transition:transform 20s linear, opacity 20s linear;pointer-events:none;z-index:0;`;document.body.append(el);requestAnimationFrame(()=>{el.style.transform='translateY(-130vh)';el.style.opacity='0';});setTimeout(()=>el.remove(),21000);}
setInterval(spawnEmoji,2500);
