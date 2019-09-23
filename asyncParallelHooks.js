class AsyncParallelHooks{
  constructor(props) {
    this.hooks = [];
  }
  tapAsync(name, callback){
    this.hooks.push(callback); 
  }
  callAsync(...args){
    let finalCallback = args.pop();

    let index=0;
    let results = []
    let done = (j,res)=> {
      results[j] = res
      index++
      if(index===this.hooks.length){
        finalCallback(results);
      }
    }

    this.hooks.forEach((item, index)=>{
      let tempIndex = index;
      // item(args, ((index)=>{
      //   return (res)=>{
      //     done(index, res);
      //   }
      // })(index))
      item.apply(this, [args, (res)=>{done(tempIndex, res)}])
    })
  }
}

let hooks = new AsyncParallelHooks();
hooks.tapAsync('vue', (name, resolve)=>{
  setTimeout(()=>{
    console.log('vue:'+name);
    resolve('vue resolve');
  }, 2000)
})
hooks.tapAsync('react', (name, resolve)=>{
  setTimeout(()=>{
    console.log('react:'+name);
    resolve('react resolve');
  }, 1000)
})
hooks.callAsync('test', (...results)=>{
  console.log('end')
  console.log(...results)
})