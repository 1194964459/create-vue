<template>
  <div>
    <a-button style="margin-bottom: 50px; width:200px" @click="handleFold">折叠/展开</a-button>
  </div>

  <div class="list-module">
    <div class="list-item" v-for="item in state.treeData" @mouseover="handleMouseEnter($event, item)">
      <div key="item.key">{{item.title}}</div> 
      <template v-if="item.children?.length && activeKey==item.key">
          <sub-tree :treeInfo="item" :key="item.key"/>
      </template>
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
  })
    
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

  const handleFold = ()=>{
    console.log('handleFold')
    if(state.expandedKeys.length){
      state.expandedKeys = []
    }else {
      findFirstSiteModel()
    }
  }

const SubTree = {
  name: 'SubTree',
  mounted(){
    // console.error('mounted', this.idx)
  },
  computed:{

  },
  data(){
    return {
      idx: 0 // 迭代次数
    }
  },
  props: {
    treeInfo: {
      type: Object,
      default: () => ({}),
    },
    key: String
  },
  template: `
    <div key="treeInfo.key" class="sub-module" :style="getStyle">
      <div v-for="item in treeInfo.children" key="item.key"  @mouseover="handleMouseEnter($event, item)">  
        <div key="item.key" style="color:red;">
          {{ item.title }}
        </div>
        <template v-if="item.children.length">
          <sub-tree :menu-info="item" />
        </template>
      </div>
    </div>
  `,
  methods: {
    handleMouseEnter:function(e, item) {
      console.log('sub：', item)
     }
  }
};

  let activeLevel
  let activeKey = ref('')
  const handleMouseEnter = (e, item)=>{
    // e.stopPropagation()
    // console.error(e, '\n',item, '\n',  e.target.parentNode, '\n', e.target.parentNode.childNodes, '\n', e.target.parentNode.children)

    // console.log('item: ', item)    

    console.log('activeLevel: ', activeLevel)
    if(activeLevel){
      activeLevel.style.background = '#fff'
      let subList = document.getElementsByClassName('sub-list')[0]
      if(subList){
        activeLevel.removeChild(subList)
      }else{
        activeLevel = ''
      }
    }
    
    e.target.style.background="#3BB0FF"

    activeLevel = e.target
    activeKey.value = item.key

    // 追加子元素
    const parent = document.createElement('div')
    
    // const child_1 = document.createElement('div')
    // const des1 = document.createTextNode('Hello world')
    // child_1.appendChild(des1)
    // parent.appendChild(child_1)

    parent.setAttribute('style',
      `color: red; width:200px; position: absolute; top:0; left:200px; background: blue`
    )
    // parent.setAttribute('style',
    //   `color: red; width:200px; background: blue`
    // )
    parent.setAttribute('class', 'sub-list')

    // child.setAttribute('class', 'sub-list')
    e.target.appendChild( parent );
  }

  const createSubEle = (data)=>{
    const parent = document.createElement('div')
    if(data.children.length){
      data.children.forEach(ele => {
        const child = document.createElement('div')
        const text = document.createTextNode(ele.title)  // 
        child.appendChild(text)
        parent.appendChild(child)
      });
      return parent
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
  }
}

.sub-module{
  color: red; 
  width: 200px; 
  position: absolute; 
  top: 0; 
  left:200px;
}
</style>