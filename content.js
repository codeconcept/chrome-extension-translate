console.log("Hello Extension");

function getUserSelection() {
  console.log("up");
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
          console.log("traduction", res.list[0].destWord);
        }
      });
  }
}

document.addEventListener("mouseup", getUserSelection);
