const classData = function (data) {
  let result = []
  if (!data.length) return result
  data.forEach((element, index) => {
    result[index] = {}
    result[index].key = element.classId
    result[index].className = element.className
    result[index].classId = element.classId
    result[index].classCode = element.classCode
    result[index].description = element.description
    result[index].layer = element.subClasses === null ? 2 : 1
    if (element.subClasses) {
      result[index].children = classData(element.subClasses)
    }
  })
  return result
}

// 分类管理层级树数据
const levelTree = function (data) {
  let result = []
  if (!data.length) return result
  data.forEach((element, index) => {
    result[index] = {}
    if (element.regionName) {
      result[index].levelType = 0
      result[index].key = element.regionId + ''
      result[index].selectable = false
      result[index].title = element.regionName
    }
    if (element.buildingName) {
      result[index].levelType = 1
      result[index].key = element.regionId + '_' + element.buildingId
      result[index].selectable = true
      result[index].title = element.buildingName
    }
    if (element.blockName) {
      result[index].levelType = 2
      result[index].key =
        element.regionId + '_' + element.buildingId + '_' + element.blockId
      result[index].selectable = true
      result[index].title = element.blockName
    }
    if (
      (element.buildings && element.buildings.length) ||
      (element.blocks && element.blocks.length)
    ) {
      result[index].children = levelTree(element.blocks || element.buildings)
    }
  })
  return result
}

const getFirstBlock = function (data) {
  let blockArr = []
  data.forEach(region => {
    if (region.children) {
      region.children.forEach(building => {
        if (building.children) {
          blockArr.push(building.children[0].key)
        }
      })
    }
  })
  return blockArr.length ? blockArr[0] : ''
}

const getFirstBuilding = function (data) {
  let blockArr = []
  data.forEach(region => {
    if (region.children) {
      blockArr.push([region.id, region.children[0].key])
    }
  })
  return blockArr
}
export { classData, getFirstBlock, getFirstBuilding, levelTree }
