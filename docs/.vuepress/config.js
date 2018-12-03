module.exports = {
  title: 'CVS',
  description: 'a basic canvas framework for 2d drawing',
  configureWebpack: {
    resolve: {
      alias: {
        '#': '../../../src'
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
      ['/docs/scene', '场景 Scene'],
      ['/docs/layer', '图层 Layer'],
      ['/docs/element', '元素 Element'],
      ['/docs/track', '轨迹 Track'],
      {
        title: 'shapes',
        collapsable: false,
        children: [
          ['/docs/shapes/circle', '圆形 Circle'],
          ['/docs/shapes/rect', '矩形 Rect'],
          ['/docs/shapes/path', '路径 Path'],
          ['/docs/shapes/image', '图像 Image'],
          ['/docs/shapes/text', '文本 Text']
        ]
      },
      {
        title: 'tracks',
        collapsable: false,
        children: [
          ['/docs/tracks/bezier', '曲线 Bezier'],
          ['/docs/tracks/round', '正圆 Round'],
          ['/docs/tracks/elliptic', '椭圆 Elliptic'],
          // '/docs/tracks/parabola',
        ]
      }
    ]
  }
}
