import { GridFSBucketReadStream } from 'mongodb';
import { writable } from 'svelte/store';


// this method of getting data is courtesy Tim Raderschad in his Svelte Summit presentation
// https://www.youtube.com/watch?v=IUHkSoBxyLM
// export function getData(url) {
//     const store = writable(new Promise(() => {}));
//     const load = async () => {
//         const response = await fetch(url);
//         const data = await response.json();
//         store.set(Promise.resolve(data));
//     }
//     load();
//     return store;
// }

//get all data

