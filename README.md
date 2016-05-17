# enumerateDevices-shim

> Enable a consistent use of `navigator.mediaDevices.enumerateDevices` on [browsers that support it](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices#Browser_compatibility).

But I thought [`adapter.js`](https://github.com/webrtc/adapter/search?utf8=%E2%9C%93&q=enumerateDevices) already polyfills this? They do, but this is for those who aren't already using adapter.js but want to polyfill `enumerateDevices`.

## Getting Started

Just install it from `npm` and require it in your app.

	npm install enumeratedevices-shim --save