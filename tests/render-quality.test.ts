import {it,expect} from 'vitest';
import {renderSurface,assetDensity,MAX_RENDER_EDGE} from '../src/ui/RenderQuality';
it('bounds large render surfaces without changing the world aspect ratio',()=>{
 for(const [width,height,dpr] of [[1920,650,2],[5120,650,3],[390,2400,3],[1000,10000,3]]){
  const surface=renderSurface(width,height,dpr);expect(surface.width).toBeLessThanOrEqual(MAX_RENDER_EDGE);expect(surface.height).toBeLessThanOrEqual(MAX_RENDER_EDGE);expect(surface.width).toBeGreaterThan(0);expect(Math.abs(surface.height/surface.zoom-height)).toBeLessThanOrEqual(1/surface.zoom);
 }
});
it('keeps native phone density and sufficient texture samples for a retina monitor',()=>{
 expect(renderSurface(390,1800,3).width).toBe(1170);expect(assetDensity(1920,2)).toBe(4);expect(assetDensity(844,3)).toBe(3);
});
