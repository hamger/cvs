module.exports = {
  title: 'CVS',
  description: 'a basic canvas framework for 2d drawing',
  configureWebpack: {
    resolve: {
      alias: {
        '#': '../../../src',
      }
    }
  },
  base: '/cvs/',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/hamger/cvs' },
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      ['/docs/start', '快速使用'],
      ['/docs/structure', '架构'],
      ['/docs/scene', '场景 Scene'],
      ['/docs/layer', '图层 Layer'],
      ['/docs/element', '元素 Element'],
      ['/docs/group', '组合 Group'],
      {
        title: 'elements',
        collapsable: false,
        children: [
          ['/docs/elements/circle', '圆形 Circle'],
          ['/docs/elements/rect', '矩形 Rect'],
          ['/docs/elements/path', '路径 Path'],
          ['/docs/elements/image', '图像 Image'],
          ['/docs/elements/text', '文本 Text']
        ]
      },
      ['/docs/track', '轨迹 Track'],
      {
        title: 'tracks',
        collapsable: false,
        children: [
          ['/docs/tracks/bezier', '曲线 Bezier'],
          ['/docs/tracks/round', '正圆 Round'],
          ['/docs/tracks/elliptic', '椭圆 Elliptic'],
        ]
      },
      ['/docs/timeline', '时间轴 Timeline'],
    ]
  }
}
