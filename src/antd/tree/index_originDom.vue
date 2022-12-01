<template>
  <div>
    <a-button style="margin-bottom: 50px; width:200px" @click="handleFold">折叠/展开</a-button>
  </div>

  <div class="list-module">
    <div class="list-item" v-for="region in state.treeData" @mouseover="handleMouseEnter($event, region)">
      {{region.title}}
    </div>
  </div>
  
  <a-divider />
  <a-tree
    v-model:expandedKeys="state.expandedKeys"
    v-model:selectedKeys="state.selectedKeys"
    :tree-data="state.treeData"
  >
    <template #title="{ title, key }">
        <div style="width:200px">
          {{ title }}
        </div>
    </template>
  </a-tree>
</template>
<script setup lang="ts">
  import { defineComponent, ref, watch, reactive, onMounted } from 'vue';
  import MockData from './mock.js';
  import { levelTree } from './classData.js'
  const state = reactive({
    treeData: levelTree(MockData),
    expandedKeys: [],
    selectedKeys: [],
    formVisible: false,
    modeEditing: false,
    mode: {},
    currentNode: {},
    basicMode: '',
    modeBlock: '', // blockId
    modeBlockKey: '', // region_build_block 格式组成的
    // modeType: MODE_TYPE.BASIC_MODE,
  })
    
  // console.error('mock： ', MockData)
  console.log('treeData ', state.treeData)


  // const expandedKeys = ref<string[]>([ '0-0-1','0-0-0']);   // 点击左侧展开、伸缩按钮
  // const checkedKeys = ref<string[]>(['0-0-0']);  // 点击checkbox
  // const selectedKeys = ref<string[]>(['0-0-0']);   // 点击tree node 的某一项（不是checkbox、展开按钮）

  watch(state.expandedKeys, () => {
    console.log('expandedKeys', state.expandedKeys);
  });
  watch(state.selectedKeys, () => {
    console.log('selectedKeys', state.selectedKeys);
  });
  // watch(checkedKeys, () => {
  //   console.log('checkedKeys', checkedKeys);
  // });
  const handleFold = ()=>{
    console.log('handleFold')
    if(state.expandedKeys.length){
      state.expandedKeys = []
    }else {
      findFirstSiteModel()
    }
  }

  let activeLevel = ref('')

  const handleMouseEnter = (e, region)=>{
    // e.stopPropagation()
    // console.error(e, '\n',region, '\n',  e.target.parentNode, '\n', e.target.parentNode.childNodes, '\n', e.target.parentNode.children)

    console.error('region: ', region)    

    console.log('activeLevel: ', activeLevel.value)
    if(activeLevel.value){
      activeLevel.value.style.background = '#fff'
      let subList = document.getElementById('sub-list')
      if(subList){
        activeLevel.value.removeChild(subList)
      }else{
        activeLevel.value = ''
      }
    }
    
    e.target.style.background="#3BB0FF"

    activeLevel.value = e.target

    // 追加子元素
    const parent = document.createElement('div')
    
    const child_1 = document.createElement('div')
    const des1 = document.createTextNode('Hello world')
    child_1.appendChild(des1)
    child.appendChild(child_1)


    // const child_2 = document.createElement('div')
    // const des2 = document.createTextNode('.....')
    // child_2.appendChild(des2)
    // child.appendChild(child_2)


    parent.setAttribute('style',
      `color: red; width:200px; position: absolute; top:0; left:200px; background: blue`
    )
    parent.setAttribute('id', 'sub-list')



    // child.setAttribute('class', 'sub-list')
    e.target.appendChild( parent );
  }

  const createSubEle = (data)=>{
    const parent = document.createElement('div')
    if(data.children.length){
      data.children.forEach(ele => {
        const child_1 = document.createElement('div')
        const des1 = document.createTextNode(ele.title)  // 
        child_1.appendChild(des1)
      });
    }else{
      return;
    }
  }


  const findFirstSiteModel = () => {
    for (const node of state.treeData) {
      if (!node.children) continue
      const child = node.children.find(
        childNode => childNode.children?.length
      )
      if (!child) continue
      const { key } = child.children[0]
      const [, , siteModel] = key.split('_')
      state.expandedKeys = [node.key, child.key]
      state.selectedKeys = [key]
      // emit('select', siteModel, key)
      break
    }
  }

  onMounted(async () => {
    findFirstSiteModel()
  })

</script>

<style lang="scss" scoped>
.ant-tree-list{
  width: 100% !important;
}

.list-module{
  background-color: #fff;
  width:200px; 

  .list-item{
    position: relative;
    height: 30px;
    width: 100%;

    // .sub-list{
    //   color: red; 
    //   width: 200px; 
    //   position: absolute; 
    //   top: 0; 
    //   left: 200px; 
    //   background: blue;
    // }
  }
}

</style>