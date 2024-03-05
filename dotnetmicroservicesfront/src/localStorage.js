export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("cfstate");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("cfstate", serializedState);
    } catch {
      // ignore write errors
    }
  };
  

  export const loadProfileState = () => {
    try {
      const serializedState = localStorage.getItem("profile");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveProfileState = (state) => {
    try {
      if(state.token){
      const serializedState = JSON.stringify(state);
      localStorage.setItem("profile", serializedState);
      }
    } catch {
      // ignore write errors
    }
  };
  