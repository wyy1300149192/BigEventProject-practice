<template>
  <div>App 组件
    <ElementUsage></ElementUsage>
  </div>
</template>

<script>
import ElementUsage from '@/components/ElementUsage.vue'
export default {
  name: "App",
  components: {
    ElementUsage
  },
  methods: {
    fn () {
      console.log('ok')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
