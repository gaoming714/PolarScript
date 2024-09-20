chrome.scripting.getExecutingScript().args[0]; // 获取DataURL
const targetElement = document.querySelector('.my-image'); // 替换成你要替换的元素选择器
targetElement.src = dataUrl;