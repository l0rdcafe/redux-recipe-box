// @flow

const localStorageManager = {
  set: (obj: []) => {
    const currState = JSON.stringify(obj);
    localStorage.setItem("recipe-item", currState);
  },
  get: () => {
    const currState = localStorage.getItem("recipe-item");
    if (currState) {
      return JSON.parse(currState);
    }
    return currState;
  }
};

export default localStorageManager;
