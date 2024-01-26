/**
 * 根据 id 获取 amis 组件，用于混合模式开发。
 * @returns 匹配到 id 的 SchemaNode 或者 null
 */
export function getNodeById(id: string, node: any) {
  const reduce = [].reduce;
  function runner(result: any, node: any): any {
    if (result || !node) {
      return result;
    }
    // this is some ArrayLike Structure
    if (Array.isArray(node)) {
      return reduce.call(Object(node), runner, result);
    }
    // is this the proper node?
    if (node.id === id) {
      return node;
    }
    // process this nodes children
    return runner(null, node.body || node.items);
  }
  return runner(null, node);
}
