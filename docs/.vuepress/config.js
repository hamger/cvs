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
    base: '/cvs/',
    themeConfig: {
        nav: [
            { text: 'Github', link: 'https://github.com/hamger/cvs' },
            { text: 'Home', link: '/' },
        ],
        sidebar: [
            ['/docs/start', 'Start'],
            ['/docs/cvs', 'Cvs'],
            ['/docs/element', 'Element'],
            {
                title: 'graphics',
                collapsable: false,
                children: [
                    '/docs/graphics/Circle',
                    '/docs/graphics/Rect',
                    '/docs/graphics/Arc',
                    '/docs/graphics/Poly',
                    '/docs/graphics/Animate',
                    '/docs/graphics/Img',
                    '/docs/graphics/Text',
                ]
            }
        ]
    }
};
