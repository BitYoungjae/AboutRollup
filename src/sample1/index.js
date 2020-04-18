import { increase, num } from './someModule';

console.log(num); // 0
increase(10);
console.log(num);

import('./anotherModule');
