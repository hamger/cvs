module.exports = {
  title: 'CVS',
  description: 'tool for canvas',
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  base: '/vshow/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      ['/docs/index/', '快速开始'],
      ['/docs/cvs/', 'Cvs'],
      ['/docs/element/', 'Element'],
      {
        title: 'graphics',
        collapsable: false,
        children: [
          '/docs/graphics/Circle/',
          '/docs/graphics/Rect/',
          '/docs/graphics/Arc/',
          '/docs/graphics/Poly/',
          '/docs/graphics/Path/',
          '/docs/graphics/Img/',
          '/docs/graphics/Text/',
        ]
      }
    ]
  }
}
