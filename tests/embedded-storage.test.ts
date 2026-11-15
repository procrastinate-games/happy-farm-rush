import {it,expect} from 'vitest';
import {SaveManager} from '../src/game/persistence/SaveManager';
it('boots with exportable in-memory progress when an iframe blocks the storage getter',()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'localStorage');
 Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('Access is denied for this document');}});
 try{const manager=new SaveManager();expect(manager.progress.unlocked).toBe(1);expect(manager.save()).toBe(false);expect(manager.error).toContain('Saving is unavailable');expect(JSON.parse(JSON.stringify(manager.progress)).version).toBe(1);}finally{if(descriptor)Object.defineProperty(globalThis,'localStorage',descriptor);else Reflect.deleteProperty(globalThis,'localStorage');}
});
