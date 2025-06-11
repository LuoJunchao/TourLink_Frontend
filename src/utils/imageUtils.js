const MAX_WIDTH = 1200 // 最大宽度
const MAX_HEIGHT = 675 // 最大高度
const QUALITY = 0.8 // 压缩质量

// 图片压缩
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    // 创建 FileReader 读取文件
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result

      img.onload = () => {
        // 创建 canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // 计算压缩后的尺寸
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width)
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height)
            height = MAX_HEIGHT
          }
        }

        // 设置 canvas 尺寸
        canvas.width = width
        canvas.height = height

        // 绘制图片
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)

        // 转换为 base64
        const base64 = canvas.toDataURL('image/jpeg', QUALITY)

        // 转换为 Blob
        const blobData = dataURItoBlob(base64)
        resolve({
          blob: blobData,
          base64,
          width,
          height
        })
      }

      img.onerror = (error) => {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}

// base64 转 Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

// 图片预览
export const previewImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        url
      })
    }
    img.onerror = (error) => {
      reject(error)
    }
  })
}