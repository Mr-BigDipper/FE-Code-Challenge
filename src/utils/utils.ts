export function throttle(func: Function, wait: number) {
    // var timeout: NodeJS.Timeout | null ,context: any, args: IArguments;
    // return  () => {
    //   context = this;
    //   args = arguments;
    //     if (!timeout) {
    //         timeout = setTimeout(function() {
    //           timeout = null;
    //             func.apply(context, args)
    //         }, wait)
    //     }
    // }
}

/**
 * 按照相同属性分类
 * @param objectArray 
 * @param property 
 * @returns 
 */
export function groupBy(objectArray:any, property: string) {
    return objectArray.reduce(function (acc: any, obj: any) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }