import { List } from "immutable";

export default function reducer(state, action) {
  const { type, payload } = action;

  if (type === "KEY_PRESS") {
    return onKeyPress(payload, state);
  }

  if (type === "CHANGE") {
    return onChange(payload, state);
  }

  if (type === "FOCUS") {
    return { ...state, focus: payload.index };
  }

  if (type === "LOAD_STORY") {
    return { ...payload.story };
  }

  return state;
}

function focusOnNext(state) {
  return {
    ...state,
    focus:
      state.content.length > state.focus + 1 ? state.focus + 1 : state.focus,
  };
}

function focusOnPrev(state) {
  return { ...state, focus: state.focus > 0 ? state.focus - 1 : state.focus };
}

function addNewMd(content, index, cursor) {
  const prevItem = content[index];
  let newContent = List(content);

  newContent = newContent.set(index, {
    ...prevItem,
    content:
      cursor === undefined
        ? prevItem.content
        : prevItem.content.substring(0, cursor),
  });

  newContent = newContent.insert(index + 1, {
    type: "md",
    content:
      cursor === undefined
        ? ""
        : prevItem.content.substring(cursor, prevItem.content.length),
  });

  return newContent.toJS();
}

function onKeyPress(payload, state) {
  const { key, cursorSelection } = payload;

  // key up/down
  if (key === 38) return focusOnPrev(state);
  else if (key === 40) return focusOnNext(state);

  //key enter
  if (key === 13) {
    const newState = {
      ...state,
      content: addNewMd(state.content, state.focus, cursorSelection),
    };
    return focusOnNext(newState);
  }

  //backspace key
  if (key === 8) {
    if (cursorSelection !== 0) return state;
    let item = state.content[state.focus];

    const prevItem = state.content[state.focus - 1];
    if (!prevItem || prevItem.type === "header") return state;

    let newState = {
      ...state,
      content: List(state.content).delete(state.focus).toJS(),
    };
    newState = focusOnPrev(newState);

    return {
      ...newState,
      content: List(newState.content)
        .set(newState.focus, {
          ...prevItem,
          content: prevItem.content + "" + item.content,
        })
        .toJS(),
    };
  }
  return state;
}

function onChange(payload, state) {
  let newContent = List(state.content);
  const item = state.content[state.focus];

  if (!payload.trim() && !item.content) return state;

  newContent = newContent.set(state.focus, { ...item, content: payload });
  return {
    ...state,
    content: newContent.toJS(),
  };
}
