const exportData = (data, fileType = 'csv') => {
  if (fileType === 'json') {
    data = JSON.stringify(data)
  }
  const exportedDataBlob = new Blob([data], { type: `text/${fileType};charset=utf-8` })
  const url = URL.createObjectURL(exportedDataBlob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `exported_data.${fileType}`)
  link.click()
}

export default exportData
