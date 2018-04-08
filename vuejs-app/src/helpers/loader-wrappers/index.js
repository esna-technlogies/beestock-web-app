// import store from '../../store'

export const loadComponentData = async (component) => {
  component.isPageDataLoading = true
  console.log('isPageDataLoading', true)
  await component.prepareComponentData()
  component.isPageDataLoading = false
  console.log('isPageDataLoading', false)
}

export const loadPageData = async (component) => {
  component.isPaginationDataLoading = true
  await component.preparePageData()
  component.isPaginationDataLoading = false
}
