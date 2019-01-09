export const loadedResources = new Map()
export const loadedPromise = new Map()

export function loadTexture (key, texture, timeout = 30000) {
  if (!loadedResources.has(key)) {
    const promise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('load image timeout'))
      }, timeout)

      loadImage(texture).then(image => {
        resolve(image)
        loadedResources.set(key, image)
        clearTimeout(timer)
      })
    })
    loadedPromise.set(key, promise)
    return promise
  } else {
    return loadedPromise.get(key)
  }
}

export function loadImage (url) {
  return new Promise(function (resolve, reject) {
    const image = new Image()

    image.onload = function () {
      resolve(image)
    }

    image.onerror = function () {
      reject(new Error('Could not load image at ' + url))
    }

    image.src = url
  })
}
