document.getElementById("makeCallButton").addEventListener("click", () => {
  (async () => {
    const response = await chrome.runtime.sendMessage({
      phoneNumber: document.getElementById("makeCallInput").value
    });
    console.log(response);
  })();
});

document.getElementById("makeCallInput").addEventListener("keyup", e => {
  if (e.target.value === "") {
    document.getElementById("makeCallButton").disabled = true;
    return;
  } else {
    document.getElementById("makeCallButton").disabled = false;
  }

  if (e.key === "Enter" || e.keyCode === 13) {
    (async () => {
      const response = await chrome.runtime.sendMessage({
        phoneNumber: e.target.value
      });
      console.log(response);
    })();
  }
});

chrome.storage.local.get(["connection"]).then(result => {
  if (!result || !result.connection) {
    document.getElementById("missingInfos").style.display = "";
    document.getElementById("makeCallSpan").style.display = "none";
  } else {
    document.getElementById("missingInfos").style.display = "none";
    document.getElementById("makeCallSpan").style.display = "";
  }
});
