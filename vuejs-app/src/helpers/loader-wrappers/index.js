export const loadComponentData = async (component) => {
  component.isPageDataLoading = true
  await component.prepareComponentData()
  component.isPageDataLoading = false
}

export const loadPageData = async (component) => {
  component.isPaginationDataLoading = true
  await component.preparePageData()
  component.isPaginationDataLoading = false
}

