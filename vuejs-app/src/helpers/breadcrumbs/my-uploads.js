export const myUploads = () => {
  const myUploadsCrumb = {
    name: 'MyUploads',
    title: 'My Uploads'
  }

  return [myUploadsCrumb]
}

export const myPhotos = () => {
  const myPhotosCrumb = {
    name: 'MyPhotos',
    title: 'My Photos'
  }

  return [
    ...myUploads(),
    myPhotosCrumb
  ]
}

export const myIllustrations = () => {
  const myIllustrationsCrumb = {
    name: 'MyIllustrations',
    title: 'My Illustrations'
  }

  return [
    ...myUploads(),
    myIllustrationsCrumb
  ]
}

export const myFootage = () => {
  const myFootageCrumb = {
    name: 'MyFootage',
    title: 'My Footage'
  }

  return [
    ...myUploads(),
    myFootageCrumb
  ]
}

export const myAudio = () => {
  const myAudioCrumb = {
    name: 'MyAudio',
    title: 'My Audio'
  }

  return [
    ...myUploads(),
    myAudioCrumb
  ]
}
