<script>
// 函数式组件，开销低，因为其只是一个函数，没有管理任何状态，没有监听任何传递给他的状态，没有生命周期方法。
// 无状态===无响应式数据，无实例===无this上下文
// <template functional></template>
export default {
  name: 'Render',
  functional: true,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    scope: Object,
    render: {
      type: Function,
      default: function() {}
    }
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>
