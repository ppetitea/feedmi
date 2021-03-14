const canHandleList = (model) => ({
  getLast: (list) => {
    const length = model.get(list).length;
    return length >= 1 ? model.get(list)[length - 1] : null;
  },
  getBy: (list, key, value) => {
    return model.find(list, (i) => i.equal(key, value));
  },
  delByIndex: (list, index) => {
    const next = model.filter(list, (item, i) => i !== index);
    return model.set(list, next);
  },
  delBy: (list, key, value) => {
    const next = model.filter(list, (item) => item.equal(key, value));
    return model.set(list, next);
  },
  modBy: (list, nextItem, key, value) => {
    // replace item by another item[key] === value or item[key] === nextItem[key]
    const next = model.map(list, (item) => {
      if (item.equal(key, value ? value : nextItem.get(key))) return nextItem;
      else return item;
    });
    return model.set(list, next);
  },
  swap: (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  },
});

export default canHandleList;
