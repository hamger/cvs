import { Scene, Path } from '#'
let scene = new Scene({
  containerId: 'container'
})
let layer = scene.layer()
const dotSpeed = 1.5
const dotCount = 2
for (let i = 0; i < dotCount; i++) {
  let r = Math.random() * 30 + 10
  let ele = new Path({
    d: {
      type: 'circle',
      cx: Math.random() * (layer.width - 2 * r) + r,
      cy: Math.random() * (layer.height - 2 * r) + r,
      r: r,
    },
    zIndex: Math.random() * dotCount,
    fill: `rgba(${Math.random() * 255}, ${Math.random() *
      255}, ${Math.random() * 255}, ${Math.random()})`
  })
  ele.track('custom', {
    xa: (Math.random() * 2 - 1) * dotSpeed,
    ya: (Math.random() * 2 - 1) * dotSpeed,
    duration: Infinity,
    loop: function (p) {
      const x = this.$ele.attr('x') + this.xa
      const y = this.$ele.attr('y') + this.ya
      const radii = this.$ele.attr('r')
      this.xa *= x > layer.width - radii || x < radii ? -1 : 1
      this.ya *= y > layer.height - radii || y < radii ? -1 : 1
      this.$ele.attr({ x: x, y: y })
    }
  })
  layer.append(ele)
}

layer.animate()
