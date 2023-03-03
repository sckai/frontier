<script setup lang="ts">
// compnents
import NodeTree from '@/components/NestedKeyValue/NodeTree.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
</script>

<template lang="pug">
#NodeTree
  ul(v-for="list in data"
    class="tree"
    :key="list.id")
    li
      details(open)
        summary(v-show="list.isNode") {{ `${list.name}` }}
        .content(v-show="!list.isNode") {{ `${list.name} : ` }}
          span {{ `${list.content}` }}
        NodeTree(v-if="list.childrens !== 0"
          :data="list.childrens")
</template>

<style lang="scss" scoped>
#NodeTree {
  font-weight: 600;
  .tree {
    --spacing: 1.2rem;
    --radius: 10px;
    --marker-bg-default: #ddd;
    --marker-bg-haschild: #6b9abb;
    line-height: 1.6rem;
  }

  .tree li {
    display: block;
    position: relative;
    padding-left: calc(2 * var(--spacing) - var(--radius) - 2px);
  }

  .tree ul {
    margin-left: calc(var(--radius) - var(--spacing));
    padding-left: 0;
  }

  .tree summary {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tree summary::marker,
  .tree summary::-webkit-details-marker {
    display: none;
  }

  .tree summary:focus {
    outline: none;
  }

  .tree summary:focus-visible {
    outline: 1px dotted #000;
  }

  .tree summary::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--spacing) / 2 - var(--radius) + 4px);
    right: calc(var(--spacing) - var(--radius) - 32px);
    width: calc(2 * var(--radius));
    height: calc(2 * var(--radius));
  }

  .tree summary::before {
    content: '[+]';
    z-index: 1;
    color: #fff;
    line-height: calc(2 * var(--radius));
    text-align: center;
  }

  .tree .content {
    white-space: nowrap;
  }

  .tree .content span {
    color: #fda4af;
  }

  .tree details[open] > summary::before {
    content: '[−]';
  }
}
</style>