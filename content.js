console.log("Hello Extension");

function getUserSelection() {
  if (window.getSelection) {
    const selection = window.getSelection().toString();
    console.log("selection", selection);

    const payload = {
      text: selection.trim(),
      src: "English",
      dest: "French",
      detected: "English",
      email: "ui@frengly.com",
      password: "ui123"
    };

    fetch("https://www.frengly.com/frengly/data/translate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(data => data.json())
      .then(res => {
        console.log("res", res);
        if (res.list && res.list.length > 0) {
          const translation = res.list[0].destWord;
          console.log("traduction", translation);
          insertHtmlAfterSelection(window.getSelection(), translation);
        }
      });
  }
}

// https://stackoverflow.com/questions/3597116/insert-html-after-a-selection
function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;
  let node;
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
    range = selectionObject.getRangeAt(0);
    expandedSelRange = range.cloneRange();
    range.collapse(false);

    // Range.createContextualFragment() would be useful here but is
    // non-standard and not supported in all browsers (IE9, for one)
    const el = document.createElement("div");
    el.innerHTML = ` [FR: ${translation} ] `;
    let frag = document.createDocumentFragment();
    let node;
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    selectionObject.empty();
  }
}

document.addEventListener("mouseup", getUserSelection);
