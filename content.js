console.log("Hello Extension");

function getUserSelection() {
  console.log("up");
  if (window.getSelection) {
    console.log(window.getSelection().toString());
  }
}

document.addEventListener("mouseup", getUserSelection);
