export function ObjectToArray(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

export function getProjectList() {
  const list = getProjectObject();
  return ObjectToArray(list);
}

export function getProjectObject() {
  return JSON.parse(window.localStorage.getItem('data') || '{}');
}

export function setProjectObject(obj) {
  const list = getProjectObject();
  list[obj.name] = obj;
  window.localStorage.setItem('data', JSON.stringify(list));
}

export function deleteProjectObject(name) {
  const list = getProjectObject();
  delete list[name];
  window.localStorage.setItem('data', JSON.stringify(list));
}

export function getPageTypeData(type) {
  if (type === 'list') {
    return {
      searchFormColumns: [],
      tableColumns: [],
      tableButtons: [],
    };
  }
}

export function findRoute(id, routes, callback = () => {}) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].id === id) {
      callback(routes[i], routes, i);
      return routes[i];
    }
    if (routes[i].routes) {
      setRoute(id, routes[i].routes);
    }
  }
}
