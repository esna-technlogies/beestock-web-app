export const categories = () => {
  const categoriesCrumb = {
    title: 'Categories'
  }

  return [categoriesCrumb]
}

export const category = (title) => {
  const categoryCrumb = {
    name: 'Category',
    title: title
  }

  return [
    ...categories(),
    categoryCrumb
  ]
}

export const categoryPhotos = (title) => {
  const categoryPhotosCrumb = {
    name: 'CategoryPhotos',
    title: 'Photos'
  }
  return [
    ...category(title),
    categoryPhotosCrumb
  ]
}

export const categoryIllustrations = (title) => {
  const categoryIllustrationsCrumb = {
    name: 'CategoryIllustrations',
    title: 'Illustrations'
  }
  return [
    ...category(title),
    categoryIllustrationsCrumb
  ]
}

export const categoryFootage = (title) => {
  const categoryFootageCrumb = {
    name: 'CategoryFootage',
    title: 'Footage'
  }
  return [
    ...category(title),
    categoryFootageCrumb
  ]
}

export const categoryAudio = (title) => {
  const categoryAudioCrumb = {
    name: 'CategoryAudio',
    title: 'Audio'
  }
  return [
    ...category(title),
    categoryAudioCrumb
  ]
}

