const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const penColor = document.querySelector('#penColor');
const penWidth = document.querySelector('#penWidth');
const btnSave = document.querySelector('.save');
const btnClear = document.querySelector('.clear');
const output = document.querySelector('.output');
const mLoc = {
  draw: false,x:0,y:0,lastX:0,lastY:0
};
canvas.style.border = '1px solid black';
btnSave.addEventListener('click',saveImg);
btnClear.addEventListener('click',clearCanvas);

canvas.addEventListener('mousemove',(e)=>{
  mLoc.lastX = mLoc.x;
  mLoc.lastY = mLoc.y;
  //console.log(e);
  mLoc.x = e.clientX;
  mLoc.y = e.clientY;
  draw();
})

canvas.addEventListener('mousedown',(e)=>{
  mLoc.draw =true;
})
canvas.addEventListener('mouseup',(e)=>{
  mLoc.draw =false;
})
canvas.addEventListener('mouseout',(e)=>{
  mLoc.draw =false;
})

function saveImg(){
  const dataURL = canvas.toDataURL();
  console.log(dataURL);
  const img = document.createElement('img');
  output.prepend(img);
  img.setAttribute('src',dataURL);
  const link = document.createElement('a');
  output.append(link);
  let fileName = Math.random().toString(16).substr(-8)+'.png'
  link.setAttribute('download',fileName);
  link.href = dataURL;
  link.click();
  output.removeChild(link);
}
function clearCanvas(){
  let temp = confirm('clear canvas?');
  if(temp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
}

function draw(){
if(mLoc.draw){
  ctx.beginPath();
  ctx.moveTo(mLoc.lastX,mLoc.lastY);
  ctx.lineTo(mLoc.x,mLoc.y);
  ctx.strokeStyle = penColor.value;
  ctx.lineWidth = penWidth.value;
  ctx.stroke();
  ctx.closePath();
}}