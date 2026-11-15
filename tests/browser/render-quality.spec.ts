import {test,expect} from '@playwright/test';
import {newProgress} from '../../src/game/persistence/SaveManager';
import {GameSimulation} from '../../src/game/engine/GameSimulation';
import {LEVELS} from '../../src/game/config/levels';
import {emptyInventory} from '../../src/game/config/economy';
test('dense canvas, SVG textures and text stay sharp without changing hit targets',async({browser,baseURL},info)=>{
 for(const dpr of (info.project.name==='mobile-portrait'?[1,2,3]:[1,2])){
  const viewport=info.project.name==='desktop'?{width:1920,height:1080}:info.project.use.viewport!;
  const context=await browser.newContext({viewport,deviceScaleFactor:dpr,isMobile:info.project.name!=='desktop',hasTouch:info.project.name!=='desktop'});
  try{
   const page=await context.newPage(),errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
   const save=newProgress(),sim=new GameSimulation(LEVELS[19]);save.unlocked=20;sim.s.animals=[];sim.s.drops=[];sim.s.inventory=emptyInventory();sim.drop('egg',{x:510,y:420});save.active=sim.s;
   await page.addInitScript(raw=>localStorage.setItem('happy-farm-rush-v1',raw),JSON.stringify(save));
   await page.goto(`${baseURL}/?embed=1&renderer=canvas`);await page.getByRole('button',{name:'Продолжить день',exact:false}).first().click();await page.getByRole('button',{name:'Продолжить день',exact:false}).click();
   const canvas=page.locator('canvas[data-ready=true]');await expect(canvas).toBeVisible();
   await expect.poll(()=>canvas.evaluate((c:HTMLCanvasElement)=>c.width/c.getBoundingClientRect().width)).toBeGreaterThanOrEqual(dpr-.01);
   const quality=await canvas.evaluate(c=>JSON.parse(c.dataset.renderQuality??'{}'));
   expect(quality.wellTextureWidth).toBeGreaterThanOrEqual(320);expect(quality.textResolution).toBeGreaterThanOrEqual(Math.ceil(quality.zoom));
   const rect=(await canvas.boundingBox())!;
   await page.mouse.click(rect.x+rect.width*.51,rect.y+rect.height*420/650);await expect(page.locator('#storage')).toContainText('1/');
   const water=await page.locator('#water').innerText();await page.mouse.click(rect.x+rect.width*.5,rect.y+rect.height*440/650);await expect(page.locator('#water')).not.toHaveText(water);
   await page.screenshot({path:`screenshots/sharp-farm-${info.project.name}-dpr${dpr}.png`});
   if(info.project.name==='desktop'){await page.setViewportSize({width:1318,height:680});await expect.poll(()=>canvas.evaluate((c:HTMLCanvasElement)=>c.width)).toBe(1318*dpr);const resized=(await canvas.boundingBox())!,remaining=await page.locator('#water').innerText();await page.mouse.click(resized.x+resized.width*.6,resized.y+resized.height*450/650);await expect(page.locator('#water')).not.toHaveText(remaining);}
   await page.locator('.warehouse-control').click();await expect(page.getByRole('dialog')).toBeVisible();expect(errors).toEqual([]);
  }finally{await context.close();}
 }
});
