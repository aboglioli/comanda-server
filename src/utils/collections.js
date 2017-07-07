function makeTree(collections) {
  return collections.reduce((arr, el) => {
    if(el.parent) {
      const parent = collections.find(p => p._id.equals(el.parent));

      if(!parent['children'] || !Array.isArray(parent['children'])) {
        parent['children'] = [];
      }

      parent.children.push(el);

      return arr;
    }

    delete el.parentId;

    return [...arr, el];
  }, []);
}

module.exports = {
  makeTree
};
