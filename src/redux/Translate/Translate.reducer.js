const keys = {
  SET_MY_LANGUAGE: "SET_MY_LANGUAGE",
  SET_OTHER_LANGUAGE: "SET_OTHER_LANGUAGE",
  SET_RECORDER: "SET_RECORDER",
  SET_TEXT: "SET_TEXT",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  my_language: {
    code: "en-us",
    name: "English",
    direction: "ltr",
    voice: 81,
  },
  other_language: {
    code: "fr-fr",
    name: "French",
    direction: "ltr",
    voice: 132,
  },
  recorder: null, // me or other or null
  text: "",
};
// ###################################### Reducer ###################################### //
export const TranslateReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_MY_LANGUAGE:
      return { ...state, my_language: action.value };
    case keys.SET_OTHER_LANGUAGE:
      return { ...state, other_language: action.value };
    case keys.SET_RECORDER:
      return { ...state, recorder: action.value };
    case keys.SET_TEXT:
      return { ...state, text: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const SetMyLanguage = (lang) => {
  return async (dispatch) => {
    dispatch({
      type: keys.SET_MY_LANGUAGE,
      value: lang,
    });
  };
};

export const SetOtherLanguage = (lang) => {
  return async (dispatch) => {
    dispatch({
      type: keys.SET_OTHER_LANGUAGE,
      value: lang,
    });
  };
};

export const SetRecorder = (recorder) => {
  return async (dispatch) => {
    dispatch({
      type: keys.SET_RECORDER,
      value: recorder,
    });
  };
};

export const SetText = (text) => {
  return async (dispatch) => {
    dispatch({
      type: keys.SET_TEXT,
      value: text,
    });
  };
};
