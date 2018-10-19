module.exports = {
  title: 'CVS',
  description: 'a basic canvas framework for 2d drawing',
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
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
      ['/docs/start', 'Start'],
      ['/docs/cvs', 'Cvs'],
      ['/docs/element', 'Element'],
      ['/docs/track', 'Track'],
      {
        title: 'graphics',
        collapsable: false,
        children: [
          '/docs/graphics/Circle',
          '/docs/graphics/Rect',
          '/docs/graphics/Arc',
          '/docs/graphics/Poly',
          '/docs/graphics/Path',
          '/docs/graphics/Img',
          '/docs/graphics/Text'
        ]
      },
      {
        title: 'Tracks',
        collapsable: false,
        children: [
          '/docs/tracks/bezier',
          '/docs/tracks/round',
          '/docs/tracks/elliptic',
          '/docs/tracks/parabola',
        ]
      }
    ]
  }
}
