export const preloadDataMap: {
  [activityId: string]:
    | { _t: "pending"; promise: Promise<any> }
    | { _t: "ok"; data: any };
} = {};

export function readPreloadData<T>(preloadRef?: any): T {
  const preloadData = preloadDataMap[preloadRef.activityId];

  switch (preloadData._t) {
    case "pending":
      throw preloadData.promise;
    case "ok":
      return preloadData.data;
  }
}
