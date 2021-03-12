const padding = 50;
const max_tries = 5;

async function setup() {
    console.log("<<Tab shortcuts>> Teste content");
    createCanvas(windowWidth, windowHeight).position(0, 0);

    const { minutes } = await new Promise((resolve) => chrome.storage.sync.get('minutes', (value) => resolve(value)));

    let div = select('ytd-app') || select('div');

    div.hide();

    const info_1 = createP('Are you sure you want to enter this page?')
        .style('font-size', '4rem')
        .style('color', 'white');
    info_1.position(windowWidth/3, windowHeight/4);

    const info_2 = createP(`If so, wait for ${(minutes ?? 10)} minutes!`)
        .style('font-size', '4rem')
        .style('color', 'white');
    info_2.position(windowWidth/3, windowHeight/3);

    const info_timer = createP()
        .style('font-size', '4rem')
        .style('color', 'white')
        .id('center_text');
    info_timer.position(windowWidth/2, windowHeight/2);

    let tries = 1;

    let x_random = random(padding, windowWidth - padding);
    let y_random = random(padding, windowHeight - padding);

    let action_button = createButton('Cannot wait, it is for study purposes')
        .mousePressed(() => {
            if (tries >= max_tries) {
                bringBackNormalPage();
                return;
            }
            tries++;
            x_random = random(padding, windowWidth - padding);
            y_random = random(padding, windowHeight - padding);
            action_button.position(x_random, y_random);
        });

    action_button.position(x_random, y_random);
        
    const wait_time_seconds = (minutes ?? 10) * 60;

    setInterval(bringBackNormalPage, wait_time_seconds * 1000);
    
    function bringBackNormalPage() {
        div.show();
        noCanvas();
        info_1.hide();
        info_2.hide();
        info_timer.hide();
        action_button.hide();
    }

}

function draw() {
    background('#303030');

    const p = document.getElementById('center_text');
    if(p) {
        const hours = Math.floor((millis() / (60 * 60 * 1000)) % 24);
        const minutes = Math.floor((millis() / (60 * 1000)) % 60);
        const seconds = Math.floor((millis() / (1000)) % 60);

        p.innerHTML = `${hours > 9 ? '' : 0}${hours}:${minutes > 9 ? '' : 0}${minutes}:${seconds > 9 ? '' : 0}${seconds}`;
    }
}
