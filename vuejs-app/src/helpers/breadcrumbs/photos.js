export const photos = () => {
  const photosCrumb = {
    name: 'Photos',
    title: 'Photos'
  }

  return [photosCrumb]
}

export const photo = (title) => {
  const photoCrumb = {
    name: 'Photo',
    title: title
  }

  return [
    ...photos(),
    photoCrumb
  ]
}
