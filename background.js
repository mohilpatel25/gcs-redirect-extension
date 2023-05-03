chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    let query = null;
    for (const [key, value] of url.searchParams.entries()) {
      if (key == "q") {
        query = value;
        break;
      }
    }
    if (query && query.startsWith("gs://")) {
      query = query.replace(
        "gs://",
        "https://console.cloud.google.com/storage/browser/"
      );
      return { redirectUrl: query };
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);
