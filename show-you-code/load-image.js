function loadImage(url) {
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== 'string') {
      reject('请填写正确的图片地址')
    }
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject('加载图片失败')
    }
    image.src = url
  })
}