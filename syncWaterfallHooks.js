// function SyncWaterfallHooks(...args){
//     this.hooks = []
// }
// SyncWaterfallHooks.prototype.tap = function(name, callback){
//     this.hooks.push(callback)
// }
// SyncWaterfallHooks.prototype.call = function(name){
//     let prevReturnData
//     this.hooks.forEach((item, index)=>{
//         if(index === 0){
//             prevReturnData = item.apply(this, [name])
//         } else {
//             prevReturnData = item.apply(this, [prevReturnData])
//         }        
//     })
// }

class SyncWaterfallHooks{
    constructor(...args) {
        this.hooks = []
    }
    tap(name, callback){
        this.hooks.push(callback);
    }
    call(...args){
        let [first, ...rest] = this.hooks
        let prevReturnData = first.apply(this,args)
        rest.reduce((prev, current)=>{
            return current.apply(this, [prev])
        }, prevReturnData)
    }
}


let hooks = new SyncWaterfallHooks(['name'])
hooks.tap('vue', function(name){
    console.log('vue:'+name)
    return 'vue is ok'
})
hooks.tap('react',function(prevReturnData){
    console.log('react:'+prevReturnData)
    return 'react is ok'
})
hooks.tap('webpack',function(prevReturnData){
    console.log('webpack:'+prevReturnData)
    return 'webpack is ok'
})
hooks.call('test')