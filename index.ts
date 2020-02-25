// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>Window.postMessage() with token example: opener</h1>`;

/*
 * In window A's scripts, with A being on <https://typescript-sipd27.stackblitz.io>:
 */
var windowUrl = "https://typescript-sipd27.stackblitz.io";
var token = uuidv4();
function openWindow() {
  var popup = window.open(`${windowUrl}?token=${token}`);
  window["popup"] = popup;
  var data = {
    token: token,
    message: "hello! My URL is " + window.location.href
  };
  setTimeout(() => {
    popup.postMessage(data, windowUrl);
  }, 1000);
  //popup.postMessage(data, windowUrl);
}
window["openWindow"] = openWindow;

function receiveMessage(event) {
  if (event.origin !== windowUrl) return;
  if (event.data && event.data.token !== token) return;
  //do something...
  console.log(event.data);
}
window.addEventListener("message", receiveMessage, false);

function uuidv4() {
  return (<any>[1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}