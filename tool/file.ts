// 文件下载函数
export const fileDownload = (response: any) => {
  if (!response) return null
  const filename = response.headers['content-disposition']
  const blob = new Blob([response.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = decodeURIComponent(filename.split("filename*=utf-8''")[1])
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}

// 下非同源的图片等文件
export function noHomologyDownload(src: string, name?: string) {
  if (!src) return false

  const x = new XMLHttpRequest()
  // 禁止浏览器缓存；否则会报跨域的错误
  x.open('GET', src + '?t=' + new Date().getTime(), true)
  x.responseType = 'blob'
  x.onload = function () {
    const url = window.URL.createObjectURL(x.response)
    let a: HTMLAnchorElement | null = document.createElement('a')
    a.href = url
    a.download = name ?? src
    a.click()
    a = null
  }
  x.send()
}
// 同源下载
export function HomologyDownload(url: string, name?: string) {
  if (!url) return false

  let a: HTMLAnchorElement | null = document.createElement('a')
  a.target = '_blank'
  a.download = name ?? url
  a.href = url // 非同源地址会跳转新页面
  a.click()
  a = null
}

// 选择文件
export function selectFile({ multiple = false, accept = [] as string[] } = {}) {
  return new Promise<FileList>((resolve) => {
    let input: HTMLInputElement | null = document.createElement('input')
    input.type = 'file'
    input.accept = accept.toString()
    input.multiple = multiple

    input.click()

    const remove = () => {
      if (input) {
        input.removeEventListener('change', watchUpload, false)
        input = null
      }
    }

    const watchUpload = (e: Event) => {
      const file = (e.target as HTMLInputElement).files as FileList
      remove()
      resolve(file)
    }

    input.addEventListener('input', watchUpload, false)
  })
}
// 文件基础校验类
export const filesChecks = {
  // 文件数量限制
  len(files: FileList, max: number) {
    const len = files.length
    if (len > max) {
      return false
    } else return true
  },
  // 图片地址和是否本地图片
  async getImgSize(url: string | File, isLocal = true) {
    if (!url) return Promise.reject(new Error('图片地址不能为空'))
    const image = new Image()

    if (isLocal) image.src = (await this.getLocalImgUrl(url as File)) as string
    else image.src = url as string

    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        })
      }
      image.onerror = (imgEvent) => {
        reject(imgEvent)
      }
    })
  },
  // 获取本地图片url地址
  getLocalImgUrl(localFile: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target?.result)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsDataURL(localFile)
    })
  },
  // 图片像素校验,这是一个promise函数
  async imgPx({
    files,
    width = 375,
    height = 375,
    isLocal = true,
  }: {
    files: FileList
    width?: number
    height?: number
    isLocal?: boolean
  }) {
    try {
      if (!files.length) return Promise.reject(new Error('false'))

      for (let i = 0; i < files.length; i++) {
        const imgWh = await this.getImgSize(files[i], isLocal)
        if (imgWh.width < width || imgWh.height < height) return Promise.reject(new Error('false'))
      }
      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  // 文件大小限制,按Mb计算
  size(files: FileList, size: number) {
    for (let i = 0; i < files.length; i++) {
      if (size === 0 || files[i].size / 1024 / 1024 > size) return false
    }
    return true
  },
  // 文件类型限制
  /*
   * img: 'image/jpeg', 'image/png'
   * execl: xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
   * */
  type(files: FileList, type = ['image/jpeg', 'image/png']) {
    for (let i = 0; i < files.length; i++) {
      if (type.length < 1 || !type.includes(files[i].type)) return false
    }
    return true
  },
}
