
/**
 * group target objectArray by property
 * @param objectArray  target data
 * @param property  groupBy property
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