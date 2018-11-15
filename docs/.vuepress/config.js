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
        title: 'Elements',
        collapsable: false,
        children: [
          '/docs/elements/Circle',
          '/docs/elements/Rect',
          '/docs/elements/Arc',
          '/docs/elements/Poly',
          '/docs/elements/Path',
          '/docs/elements/Img',
          '/docs/elements/Text'
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
          // '/docs/tracks/color',
        ]
      }
    ]
  }
}
