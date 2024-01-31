document.getElementById("makeCallButton").addEventListener("click", () => {
  (async () => {
    const response = await chrome.runtime.sendMessage({
      phoneNumber: 100
    }); // do something with response here, not outside the
    console.log(response);
  })();
});
