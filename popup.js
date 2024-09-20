document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    var pictureIndex = parseInt(document.getElementById('pictureIndex').value);  // 获取下拉菜单的值
    // 如果 pictureIndex 为 -1，生成 1-14 的随机数
    if (pictureIndex === -1) {
        console.log(pictureIndex)
        pictureIndex = Math.floor(Math.random() * 15);
        console.log("Picture index was 0, replaced with random value:", pictureIndex);  // 调试信息
    }
    if (file) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const imageData = reader.result;

        // 发送图片数据到当前页面
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: displayImageOnPage,
            args: [imageData, pictureIndex]
          });
        });
      };

      reader.readAsDataURL(file);
    }
  });

  function displayImageOnPage(imageData, pictureIndex) {
    // 获取所有符合条件的 <picture> 标签
    const pictureTags = document.querySelectorAll('picture.bili-video-card__cover');
    console.log("Found picture tags: ", pictureTags.length);  // 调试信息
    console.log("Using picture index: ", pictureIndex);  // 调试信息

    if (pictureTags.length >= 0) {
      // 获取第三个 <picture> 标签
      const thirdPictureTag = pictureTags[pictureIndex];

    // 直接修改 <picture> 的 innerHTML，替换为新的 <img> 标签
    thirdPictureTag.innerHTML = `<img src="${imageData}" style="width: 100%; height: auto;" />`;

    console.log("Updated the picture tag with new img element.");  // 调试信息
  } else {
    console.error("Less than three <picture> tags found.");
  }
  }