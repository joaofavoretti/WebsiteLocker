
async function setup() {
  noCanvas();

  const disable_button = document.getElementById('disable_button');
  const disable_skip_button = document.getElementById('disable_skip_button');

  disable_button.addEventListener('click', async () => {
    const { disable_extension } = await new Promise((resolve) => chrome.storage.sync.get('disable_extension', (value) => resolve(value)));
    chrome.storage.sync.set({ disable_extension: !disable_extension }, () => {
      console.warn("setted", { disable_extension: !disable_extension })
    });
  });

  disable_skip_button.addEventListener('click', async () => {
    const { disable_skip } = await new Promise((resolve) => chrome.storage.sync.get('disable_skip', (value) => resolve(value)));
    chrome.storage.sync.set({ disable_skip: !disable_skip}, () => {
      console.warn("setted", { disable_skip: !disable_skip});
    });
  });

  const submit_button = document.getElementById('submit_button');
  const minutes_input = document.getElementById('minutes_input');

  submit_button.addEventListener('click', () => {
    chrome.storage.sync.set({ minutes: minutes_input.value }, () => {
      console.warn("setted", { minutes: minutes_input.value })
    })
  })
}


async function draw() {
  frameRate(10);

  const { disable_extension } = await new Promise((resolve) => chrome.storage.sync.get('disable_extension', (value) => resolve(value)));
  const { disable_skip } = await new Promise((resolve) => chrome.storage.sync.get('disable_skip', (value) => resolve(value)));

  if (disable_extension) disable_button.textContent = "Enable Extension";
  else disable_button.textContent = "Disable Extension"
  
  if (disable_skip) disable_skip_button.textContent = "Enable Skip";
  else disable_skip_button.textContent = "Disable Skip";
  
}
