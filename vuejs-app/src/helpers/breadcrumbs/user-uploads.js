export const userUploads = () => {
  const userUploadsCrumb = {
    name: 'UserUploads',
    title: 'My Uploads'
  }

  return [userUploadsCrumb]
}

export const userPhotos = () => {
  const userPhotosCrumb = {
    name: 'UserPhotos',
    title: 'Photos'
  }

  return [
    ...userUploads(),
    userPhotosCrumb
  ]
}
