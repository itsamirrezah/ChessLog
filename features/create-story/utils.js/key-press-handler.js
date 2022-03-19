const preventDefaults = [13, 8];
export default function KeyPressHandler(
  allowKeys,
  dispatch,
  action,
  e,
  payload
) {
  if (!allowKeys.includes(e.keyCode)) return;
  if (preventDefaults.includes(e.keyCode)) e.preventDefault();
  //   if (!keyboardActions.includes(e.keyCode)) return;
  //   if (e.keyCode === 8 && e.target.value) return;
  //   if ([13, 8].includes(e.keyCode)) e.preventDefault();
  //   dispatch({
  //     type: "KEY_PRESS",
  //     payload: { key: e.keyCode, cursorSelection: e.target.selectionEnd },
  //   });
}
