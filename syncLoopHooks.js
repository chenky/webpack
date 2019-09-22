class SyncLoopHooks{
    constructor(...args) {
        this.hooks = [];
    }
    tap(name, callback){
        let times = name.split(':')[1]
        if(Number.isInteger(Number(times))){
            while(times>0){
                this.hooks.push(callback)
                times--;
            } 
        } else {
            this.hooks.push(callback)
        }
    }
    call(name){
        // let [first, ...rest] = this.hooks
        // let prevReturnData = first.apply(this,args)
        let prevReturnData = name;
        this.hooks.forEach((item, index, arr)=>{
            let next;
            if(arr.length > index){
                next = arr[++index]
            }        
            if(next && item === next){
                item.apply(this, [prevReturnData])
            } else {
                prevReturnData = item.apply(this, [prevReturnData])
            }
        })
    }
}

let hooks = new SyncLoopHooks(['name'])
hooks.tap('vue:3', function(name){
    console.log('vue:'+name)
    return 'vue is ok'
})
hooks.tap('react:2',function(prevReturnData){
    console.log('react:'+prevReturnData)
    return 'react is ok'
})
hooks.tap('webpack',function(prevReturnData){
    console.log('webpack:'+prevReturnData)
    return 'webpack is ok'
})
hooks.call('test')