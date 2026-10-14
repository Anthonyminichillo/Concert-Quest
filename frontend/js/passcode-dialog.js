// Opens the <dialog id="passcode-dialog"> and resolves with the passcode the
// user typed, or null if they cancelled (Cancel button or Escape).
export function askPasscode() {
  const dialog = document.getElementById("passcode-dialog");
  const form = dialog.querySelector("form");

  form.reset();
  // returnValue keeps the last button's value, and Escape doesn't change it.
  dialog.returnValue = "";
  dialog.showModal();

  return new Promise((resolve) => {
    dialog.addEventListener(
      "close",
      () => {
        const confirmed = dialog.returnValue === "confirm";
        resolve(confirmed ? form.elements.passcode.value : null);
      },
      { once: true }
    );
  });
}
