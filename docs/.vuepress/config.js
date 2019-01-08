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
      // ['/docs/structure', '架构'],
      ['/docs/scene', '场景 Scene'],
      ['/docs/layer', '图层 Layer'],
      ['/docs/element', '元素 Element'],
      ['/docs/timeline', '时间轴 Timeline'],
      {
        title: 'elements',
        collapsable: false,
        children: [
          ['/docs/elements/path', '路径 Path'],
          ['/docs/elements/image', '图像 Image'],
          ['/docs/elements/text', '文本 Text'],
          ['/docs/elements/group', '组合 Group']
        ]
      },
      ['/docs/custom', '自定义元素'],
      // {
      //   title: 'tracks',
      //   collapsable: false,
      //   children: [
      //     ['/docs/tracks/bezier', '曲线 Bezier'],
      //     ['/docs/tracks/round', '正圆 Round'],
      //     ['/docs/tracks/ellipse', '椭圆 Ellipse']
      //   ]
      // }
    ]
  }
}
