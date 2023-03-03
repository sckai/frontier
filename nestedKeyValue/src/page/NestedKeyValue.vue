<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
// import { debounce } from "@types/lodash"
import { debounce } from "lodash"

// componets
import NodeTree from '@/components/NestedKeyValue/NodeTree.vue'

let treeData: any = reactive([])
const treeHandle = ref(false)

const keyValueList: any = reactive([
  {
    id: '2412414112312',
    key: 'nav.header.content',
    value: '3D Fabric Creator'
  },
  {
    id: '1231231232131',
    key: 'nav.icon',
    value: 'Icon name'
  },
  {
    id: '123123asd1232131',
    key: 'nav.header.product',
    value: 'Product'
  },
  {
    id: '1231231232131asd',
    key: 'common.feature.experience',
    value: 'Try It Now!'
  },
  {
    id: '1231231232131asd',
    key: 'common.feature.chooseFabric',
    value: 'Choose Fabric'
  }
])

// mounted
onMounted(() => {
  HandleTreeData()
})


// function
const HandleTreeData = () => {
  treeHandle.value = false
  const tempArray: any = []

  for(let index = 0; index < keyValueList.length; index++) {
    const nodeCache = keyValueList[index].key.split('.')
    nodeCache.forEach((nodeIem: any, nodeIndex: number) => {
      const tempObj = {
        id: RandomId(),
        name: nodeIem,
        level: nodeIndex + 1,
        stratum: nodeCache,
        isNode: nodeCache.length === nodeIndex + 1 ? false : true,
        content: nodeCache.length === nodeIndex + 1 ? keyValueList[index].value : '',
        childrens: []
      }

      tempArray.push(tempObj)
    })
  }

  for (let tempIndex = 0; tempIndex < tempArray.length; tempIndex++) {
    if (treeData.length === 0) {
      treeData.push(tempArray[tempIndex])
      continue
    }
    if (tempArray[tempIndex].level === 1) {
      const hasNode = treeData.some((item: any) => { return item.name === tempArray[tempIndex].name })
      if (!hasNode) treeData.push(tempArray[tempIndex])
      continue
    }

    const findUpperLevel = tempArray[tempIndex].level - 1
    const findUpperName =  tempArray[tempIndex].stratum[tempArray[tempIndex].level - 2]

    for (let treeIndex = 0; treeIndex < treeData.length; treeIndex++) {
      findNode(treeData[treeIndex], tempArray[tempIndex], findUpperLevel, findUpperName)
      continue
    }
  }

  treeHandle.value = true
}

const findNode = (parentNode: any, node: any, findLevel: number, findUpperName: string) => {
  if (parentNode.level === findLevel && parentNode.name === findUpperName) {

    if (node.isNode) {
      const hasNode = parentNode.childrens.some((childrensItem: any, childrensIndex: number) => { return childrensItem.name === childrensItem.name })
      if (!hasNode) parentNode.childrens.push(node)
      return
    }

    const hasNode = parentNode.childrens.some((childrensItem: any, childrensIndex: number) => {
      return node.name === childrensItem.name 
    })
    if (!hasNode) parentNode.childrens.push(node)
    return
  }

  const childers = parentNode.childrens
  for (let childersIndex = 0; childersIndex < childers.length; childersIndex++) {
    findNode(childers[childersIndex], node, findLevel, findUpperName)
  }
}

// method
const RandomId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// evnet
const AddKeyValue = () => {
  const newId = RandomId()
  keyValueList.push({ id: newId, key: '', value: '' })
}

const DelKeyValue = (id: string) => {
  for(let index = 0; index < keyValueList.length; index++) {
    if (keyValueList[index].id === id) {
      keyValueList.splice(index, 1)
      break
    }
  }

  treeData = []
  HandleTreeData()
}

const InputKeyAndValue = debounce(function (event: any) {
  treeData = []
  HandleTreeData()
}, 250)
</script>

<template lang="pug">
#NestedKeyValue
  .title {{ `Nested Key-Value Pair Tree Viewer` }}
  .content
    .keyZone
      .addPair(@click="AddKeyValue")
        span {{ `＋Add New Pair` }}

      .list(v-for="list in keyValueList")
        .key
          input(type="text"
            v-model="list.key"
            placeholder="input key ex: nav.header.content)"
            maxlength="100"
            @input="InputKeyAndValue")
        .value
          input(type="text"
            v-model="list.value"
            placeholder="input value"
            maxlength="100"
            @input="InputKeyAndValue")
        .del(@click="DelKeyValue(list.id)")
          span {{ `-` }}
    .valueZone
      NodeTree(v-if="treeHandle"
        :data="treeData")
</template>

<style lang="scss" scoped>
#NestedKeyValue{
  background-color: #0f172a;
  height: 100vh;
  width: 100vw;
  padding: 32px;
  box-sizing: border-box;
  overflow: hidden;

  & .title {
    color: #e2e8f0;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  & .content {
    display: grid;
    grid-template-columns: 49% 49%;
    gap: 24px;
    margin: auto;
    & .keyZone, & .valueZone {
      border-radius: 4px;
      border: 1px solid #ffffff;
      height: calc(100vh - 132px);
    }

    & .keyZone{
      padding: 16px;
      overflow-y: auto;
      & .addPair {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        font-weight: 500;
        height: 48px;
        width: 136px;
        color: #1e1e1e;
        border: 1px solid #e2e8f0;
        background-color: #e2e8f0;
        margin-bottom: 8px;
        cursor: pointer;
      }

      & .list {
        display: grid;
        grid-template-columns: 1fr 1fr 48px;
        gap: 24px;
        margin-bottom: 16px;

        & .key, & .value {
          input {
            height: 32px;
            border: 1px solid #e2e8f0;
            background-color: #0f172a;
            color: #e2e8f0;
            padding: 0 8px 0 8px;
            width: 100%;
          }
        }

        & .del {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: auto;
          font-weight: 500;
          height: 32px;
          width: 36px;
          color: #1e1e1e;
          border: 1px solid #e2e8f0;
          background-color: #e2e8f0;
          cursor: pointer;
        }
      }

    }

    & .valueZone {
      padding: 16px;
      color: #e2e8f0;
      overflow-y: auto;
    }
  }
}
</style>