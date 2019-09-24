class AsyncSeriesWaterfallHooks{
  constructor(...args) {
      this.hooks = [];
      // this.promiseHooks = [];
  }
  tapAsync(name, callback){
      this.hooks.push(callback);
  }
  callAsync(name, callback){      
    let index=0
    let results = []
    let next = (res)=>{
      results.push(res)
      if(index===this.hooks.length){
        callback(results);
        return
      }
      let current = this.hooks[index++];
      current(res, next);
    }
    next(name);
  }
  // tapPromise(name, callback){
  //   this.promiseHooks.push(callback);
  // }
  // callPromise(name){
  //   // return new Promise((resolve, reject)=>{
  //     return this.promiseHooks.reduce((prev, next)=>{
  //       return prev.then((value) => {
  //         return next(name);
  //       })
  //     }, Promise.resolve())
  //   //   resolve();
  //   // })
  // }
}

let hooks = new AsyncSeriesWaterfallHooks(['name'])
hooks.tapAsync('vue', function(name, resolve){
  setTimeout(()=>{
    console.log('vue:'+ name);
    resolve('vue is ok');
  }, 3000)
})
hooks.tapAsync('react',function(name, resolve){
  setTimeout(()=>{
    console.log('react:'+ name);
    resolve('react is ok');
  }, 2000)
})
hooks.tapAsync('webpack',function(name, resolve){
  setTimeout(()=>{
    console.log('webpack:'+ name);
    resolve('webpack is ok');
  }, 1000)
})
hooks.callAsync('test', (results)=>{
  console.log('all done:'+results)
})

// hooks.tapPromise('vue', function(name){
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       console.log('vue:'+ name);
//       resolve();
//     }, 1000)
//   })  
// })
// hooks.tapPromise('react',function(name){
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       console.log('react:'+ name);
//       resolve();
//     }, 1000)
//   }) 
// })
// hooks.tapPromise('webpack',function(name){
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       console.log('webpack:'+ name);
//       resolve();
//     }, 1000)
//   }) 
// })
// hooks.callPromise('test')
// .then(()=>{
//   console.log('all done')
// })