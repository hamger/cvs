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
<<<<<<< HEAD
      // {
      //   title: 'Animate',
      //   collapsable: false,
      //   children: ['/docs/animateRound/animatePath', '/docs/animateRound/animateColor']
      // },
=======
>>>>>>> bf07908f51315883808f5aaacaae328a7c1884e9
      {
        title: 'Tracks',
        collapsable: false,
        children: ['/docs/tracks/bezier']
      }
    ]
  }
}
