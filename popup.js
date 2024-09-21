document.getElementById('uploadButton').addEventListener('click', () => {
  const fileInput = document.getElementById('imageInput')
  const file = fileInput.files[0]
  const titleInput = document.getElementById('titleInput')
  const title = titleInput.value
  var pictureStr = document.getElementById('pictureIndex').value  // 获取用户定义位置的值
  // 如果 pictureIndex 为 -1，生成 1-14 的随机数
  if (pictureStr === undefined || pictureStr === "") {
    pictureIndex = Math.floor(Math.random() * 15)
    console.log("Picture index was 0, replaced with random value:", pictureIndex)  // 调试信息
  }
  else {
    pictureIndex = parseInt(pictureStr)
  }
  if (file) {
    const reader = new FileReader()

    reader.onloadend = function () {
      const imageData = reader.result

      // 发送图片数据到当前页面
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: changeImage,
          args: [imageData, pictureIndex]
        })
      })
    }

    reader.readAsDataURL(file)
  }
  if (title) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: changeTitle,
              args: [title, pictureIndex]
            })
          })
  }
})

function changeImage(imageData, pictureIndex) {
  // 获取所有符合条件的 <picture> 标签
  const pictureTags = document.querySelectorAll('picture.bili-video-card__cover')
  console.log("Found picture tags: ", pictureTags.length)  // 调试信息
  console.log("Using picture index: ", pictureIndex)  // 调试信息


    const targetPictureTag = pictureTags[pictureIndex]

    // 直接修改 <picture> 的 innerHTML，替换为新的 <img> 标签
    targetPictureTag.innerHTML = `<img src="${imageData}" style="width: 100% height: auto" />`

    console.log("Updated the picture tag with new img element.")  // 调试信息

}

function changeTitle(titleData, pictureIndex) {
  // 获取所有符合条件的 <title> 标签
  const titleTags = document.querySelectorAll('.bili-video-card__info--tit')
  console.log("Found title tags: ", titleTags.length)  // 调试信息
  console.log("Using title index: ", pictureIndex)  // 调试信息


    console.log(titleTags)
    console.log(pictureIndex)
    const targettitleTag = titleTags[pictureIndex]

    // 直接修改 <title> 的 innerHTML，替换为新的 <img> 标签
    targettitleTag.innerHTML = `<em class="keyword">${titleData}</em>`

    console.log("Updated the title tag with new img element.")  // 调试信息

}

document.getElementById('resetButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id)
  })
})

// goto
document.getElementById('gotoBilibili').addEventListener('click', () => {
  chrome.tabs.update({ url: 'https://www.bilibili.com' });
});
document.getElementById('gotoXigua').addEventListener('click', () => {
  chrome.tabs.update({ url: 'https://www.ixigua.com' });
});
document.getElementById('gotoXiaohongshu').addEventListener('click', () => {
  chrome.tabs.update({ url: 'https://www.xiaohongshu.com' });
});

// upload
const fileInput = document.querySelector("#file-js-example input[type=file]")
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector("#file-js-example .file-name")
    fileName.textContent = fileInput.files[0].name
  }
}