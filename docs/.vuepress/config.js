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
      ['/docs/scene', 'Scene'],
      ['/docs/layer', 'Layer'],
      ['/docs/element', 'Element'],
      ['/docs/track', 'Track'],
      {
        title: 'Elements',
        collapsable: false,
        children: [
          '/docs/elements/circle',
          '/docs/elements/rect',
          '/docs/elements/path',
          '/docs/elements/img',
          '/docs/elements/text'
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
