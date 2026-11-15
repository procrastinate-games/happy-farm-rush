import {test,expect} from '@playwright/test';
test('embedded menu and farm fit the player without hiding controls',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 if(info.project.name==='mobile-portrait')await page.setViewportSize({width:360,height:640});
 await page.goto('/?embed=1&lang=en&renderer=canvas');
 await expect(page.locator('body')).toHaveClass(/embedded/);
 expect(await page.locator('.masthead').evaluate(e=>e.getBoundingClientRect().height)).toBeLessThanOrEqual(56);
 expect(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.getByRole('button',{name:'Let’s get growing',exact:false}).first().click();await page.getByRole('button',{name:'Let’s get growing',exact:false}).click();
 await expect(page.locator('canvas[data-ready=true]')).toBeVisible();
 const canvas=(await page.locator('canvas').boundingBox())!,size=page.viewportSize()!;
 expect(canvas.width).toBeGreaterThan(size.width*.9);expect(canvas.height).toBeGreaterThan(size.height*.5);
 expect(canvas.y+canvas.height).toBeLessThanOrEqual(size.height-55);
 for(const selector of ['.well-control','.warehouse-control','.truck-control','.farm-stats [data-action=pause]']){
  const r=(await page.locator(selector).boundingBox())!;expect(r.y).toBeGreaterThanOrEqual(0);expect(r.y+r.height).toBeLessThanOrEqual(size.height+1);
  expect(Math.min(r.x+r.width,canvas.x+canvas.width)-Math.max(r.x,canvas.x)>1&&Math.min(r.y+r.height,canvas.y+canvas.height)-Math.max(r.y,canvas.y)>1).toBe(false);
 }
 const water=await page.locator('#water').innerText();await page.mouse.click(canvas.x+canvas.width*.5,canvas.y+canvas.height*.55);await expect(page.locator('#water')).not.toHaveText(water);
 await page.locator('.warehouse-control').click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.screenshot({path:`screenshots/embed-market-${info.project.name}.png`});
 await page.reload();await page.getByRole('button',{name:'Continue your day',exact:false}).first().click();await page.getByRole('button',{name:'Resume your day',exact:false}).click();
 await expect(page.locator('canvas[data-ready=true]')).toBeVisible();await page.screenshot({path:`screenshots/embed-farm-${info.project.name}.png`});expect(errors).toEqual([]);
});

test('real iframe automatically uses compact UI and late-game animal market',async({page,baseURL},info)=>{
 if(info.project.name==='desktop')await page.setViewportSize({width:1318,height:680});
 const {newProgress}=await import('../../src/game/persistence/SaveManager');const {GameSimulation}=await import('../../src/game/engine/GameSimulation');const {LEVELS}=await import('../../src/game/config/levels');
 const save=newProgress();save.unlocked=20;save.settings.language='en';save.active=new GameSimulation(LEVELS[19]).s;save.active.coins=1000;
 await page.addInitScript(raw=>localStorage.setItem('happy-farm-rush-v1',raw),JSON.stringify(save));
 await page.route('**/iframe-host',route=>route.fulfill({contentType:'text/html',body:`<style>body{margin:0}iframe{border:0;width:100vw;height:100dvh}</style><iframe name="farm" src="${baseURL}/?lang=en&renderer=canvas"></iframe>`}));
 await page.goto('/iframe-host');const frame=page.frameLocator('iframe');await expect(frame.locator('body')).toHaveClass(/embedded/);
 await frame.getByRole('button',{name:'Continue your day',exact:false}).first().click();await frame.getByRole('button',{name:'Resume your day',exact:false}).click();
 await expect(frame.locator('canvas[data-ready=true]')).toBeVisible();await frame.locator('[data-action=animals]').click();await frame.getByRole('button',{name:'Buy Cow',exact:true}).click();
 await expect(frame.locator('.animal-wallet')).toContainText('460');await frame.getByRole('button',{name:'Resume day',exact:true}).click();
 await expect.poll(()=>frame.locator('canvas').getAttribute('data-structure-bounds')).not.toBeNull();
 const structures=await frame.locator('canvas').evaluate(c=>JSON.parse(c.dataset.structureBounds??'[]'));expect(structures.length).toBeGreaterThanOrEqual(16);
 await page.screenshot({path:`screenshots/embed-iframe-${info.project.name}.png`});
});

test('sandboxed portal frame remains playable when storage is denied',async({page,baseURL},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 // A deliberately opaque frame needs CORS-enabled fixture assets before storage behavior can be exercised.
 await page.route('**/assets/**',async route=>{const response=await route.fetch();await route.fulfill({response,headers:{...response.headers(),'access-control-allow-origin':'*'}});});
 await page.route('**/sandbox-host',route=>route.fulfill({contentType:'text/html',body:`<style>body{margin:0}iframe{border:0;width:100vw;height:100dvh}</style><iframe sandbox="allow-scripts" src="${baseURL}/?lang=en&renderer=canvas"></iframe>`}));
 await page.goto('/sandbox-host');const frame=page.frameLocator('iframe');await frame.locator('.hero-actions .primary').click();await frame.locator('[data-action=begin]').click();await expect(frame.locator('canvas[data-ready=true]')).toBeVisible();
 await expect(frame.locator('.warehouse-control')).toBeVisible();await frame.locator('.warehouse-control').click();await expect(frame.getByRole('dialog')).toBeVisible();await page.screenshot({path:`screenshots/embed-sandbox-${info.project.name}.png`});expect(errors).toEqual([]);
});
