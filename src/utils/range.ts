import { range } from "lodash";

export const generateArray = (start: number, end: number, count: number): number[] => {
  var step = (end - start) / (count - 1)
  var rt = []
  rt = rt.concat(range(start, end, step))
  if (rt.indexOf(end) < 0) {
    rt = rt.concat(end)
  }

  return rt.map(Math.floor)
}