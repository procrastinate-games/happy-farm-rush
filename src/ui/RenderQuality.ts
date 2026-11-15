// Keep display density separate from the 1000-unit simulation/view coordinate system.
export const MAX_RENDER_EDGE=4000;
const MAX_DPR=3;
export function renderSurface(cssWidth:number,worldHeight:number,dpr:number):{width:number;height:number;zoom:number}{
 const displayWidth=Math.max(1,cssWidth),height=Math.max(1,worldHeight);
 const density=Math.min(Math.max(1,dpr),MAX_DPR,MAX_RENDER_EDGE/Math.max(displayWidth,displayWidth*height/1000));
 const width=Math.max(1,Math.round(displayWidth*density));
 return {width,height:Math.min(MAX_RENDER_EDGE,Math.max(1,Math.round(height*width/1000))),zoom:width/1000};
}
export function assetDensity(screenWidth:number,dpr:number):number {
 return Math.max(2,Math.min(4,Math.ceil(Math.min(MAX_RENDER_EDGE,screenWidth*Math.min(MAX_DPR,Math.max(1,dpr)))/1000)));
}
