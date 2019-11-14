// Create a new instance. Use one instance for each camera
window.handsfree = new window.Handsfree({});
const $emoji = document.querySelector("#emoji");

const plugin = "emojify";

// Disable click and vert scroll
Handsfree.disable("vertScroll");
Handsfree.disable("click");

// Create a simple plugin that displays pointer values on every frame
Handsfree.use(plugin, (pointer, instance) => {
  let emoji = "😐";
  let isFlipped = false;
  let { state } = instance.head;

  if (state.pursed && state.mouthClosed) emoji = "😗";
  if (state.browsUp) emoji = "🙄";
  if (state.smile) emoji = "🙂";
  if (state.browsHuh && !state.pursed) {
    if (state.browRightUp) isFlipped = true;
    emoji = "🤨";
  }
  if (state.smirk && state.browsUp) {
    if (state.smileLeft) isFlipped = true;
    emoji = "😏";
  }
  if (state.browsDown) emoji = "😠";
  if (state.browsDown && state.pursed) emoji = "😡";
  if (state.eyesClosed) emoji = "😑";
  if (state.eyesClosed && state.pursed) emoji = "😙";
  if (state.eyesClosed && state.pursed && !state.mouthClosed) emoji = "😴";
  if (state.eyesClosed && state.smile) emoji = "😊";
  if (state.mouthOpen) emoji = "😃";
  if (state.mouthOpen && state.eyesClosed) emoji = "😫";
  if (state.mouthOpen && state.eyesClosed && state.browsUp) emoji = "😂";
  if (state.eyesClosed && state.browsHuh) {
    if (state.eyebrowLeftRight) isFlipped = true;
    emoji = "🤤";
  }
  if (!state.mouthClosed && state.pursed) emoji = "😮";
  if (!state.mouthClosed && state.pursed && state.browsUp) emoji = "😲";

  // Aplly transforms
  $emoji.style.transform = `perspective(1000px) rotateX(${-instance.head
    .rotation[0]}rad) rotateY(${
    instance.head.rotation[1]
  }rad) rotateZ(${-instance.head.rotation[2]}rad) scale(${
    isFlipped ? -1 : 1
  }, 1)`;

  // Show the emoji
  $emoji.innerText = emoji;
});
