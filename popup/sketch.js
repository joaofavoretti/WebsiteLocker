
function setup() {
  noCanvas();

  const button = document.getElementById('asdfasdf');
  const minutes_input = document.getElementById('minutes_input');
  
  button.addEventListener('click', () => {
    chrome.storage.sync.set({ minutes: minutes_input.value }, () => {
      console.warn("setted", { minutes: minutes_input.value })
    })
  })
}


