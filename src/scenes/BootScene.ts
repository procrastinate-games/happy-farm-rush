import Phaser from 'phaser';
import {assetDensity} from '../ui/RenderQuality';
import {animalArt,buildingArt,productArt,openFarmArt,treeArt,wellArt,warehouseArt,truckArt,grassArt,cageArt,cloudArt,dataUri} from '../assets/art';
import {ANIMALS} from '../game/config/animals';
import {PRODUCTS} from '../game/config/products';
import {BUILDINGS} from '../game/config/buildings';
import type {Building,Product,Species} from '../game/config/types';
export class BootScene extends Phaser.Scene {
 constructor(){super('Boot');}
 preload():void {
  const scale=assetDensity(Math.max(window.innerWidth,window.screen.width,window.screen.height),window.devicePixelRatio);this.registry.set('artScale',scale);
  for(const s of [...Object.keys(ANIMALS),'bear'] as (Species|'bear')[])for(let f=0;f<4;f++)this.load.svg(`${s}-${f}`,dataUri(animalArt(s,f)),{scale});
  for(const p of Object.keys(PRODUCTS) as Product[])this.load.svg(`product-${p}`,dataUri(productArt(p)),{scale});
  for(const b of Object.keys(BUILDINGS) as Building[])for(let l=1;l<=3;l++)this.load.svg(`building-${b}-${l}`,dataUri(buildingArt(b,l)),{scale});
  for(const [key,art] of Object.entries({'farm-open':openFarmArt(),tree:treeArt,well:wellArt,warehouse:warehouseArt,truck:truckArt,grass:grassArt,cage:cageArt,cloud:cloudArt}))this.load.svg(key,dataUri(art),{scale});
 }
 create():void {this.scene.start('Farm');}
}
