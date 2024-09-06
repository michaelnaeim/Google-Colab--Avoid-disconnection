"use strict";

var intervalId = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function performClick() {
    var connectBtn = document
        ?.querySelector('#top-toolbar > colab-connect-button')
        ?.shadowRoot
        ?.querySelector('#connect');
    if (connectBtn === null || connectBtn === undefined) {
        return;
    }
    connectBtn.click();

    await sleep(500);

    var closeBtn = document?.querySelector('paper-icon-button[title=Close]');
    if (closeBtn === null || closeBtn === undefined) {
        return;
    }
    closeBtn.click();
}

chrome.runtime.onMessage.addListener(() => {
    if (intervalId === null) {
        performClick();
        intervalId = setInterval(performClick, 1000 * 60 * 1);
    } else {
        clearInterval(intervalId);
        intervalId = null;
    }
    return Promise.resolve(intervalId !== null);
});
