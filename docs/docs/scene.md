### Scene

创建一个场景对象

```js
let scene = new Scene(options);
```

### options

| options.key | value  | description                                    | default |
| ----------- | ------ | ---------------------------------------------- | ------- |
| containerId | String | 作为容器的 dom 元素的 Id，容器大小决定画布大小 | --      |

### 实例属性

| scene.key | value         | description             |
| --------- | ------------- | ----------------------- |
| container | DOM           | 作为图层容器的 dom 元素 |
| layers    | Array\<Layer> | 场景里的所有图层        |

### 实例方法

#### _async_ preload(obj)

- 描述：

  资源预加载

- 参数：

  - `{Object} obj` 表示资源路径的键值对

- 返回值：`{Object}` 表示资源的键值对

- 示例：
  ```js
  (async function() {
    let scene = new Scene({
      containerId: "container"
    });
    let layer = scene.layer();
    await layer.preload({
      safari: require("../../../static/safari.png")
    });
    layer.append(
      new Image({
        image: "safari",
        dx: 200,
        dy: 10
      })
    );
    layer.draw();
  })();
  ```

#### layer(opt)

- 描述：

  向场景中添加一个图层

- 参数：

  - `{Object} opt`

- 返回值：`{Layer}` 一个 [Layer 构造器](./layer.md)的实例

- 示例：
  ```js
  var layer = scene.layer({ zIndex: 1 });
  ```

#### remove(layer)

- 描述：

  从场景中去除一个图层

- 参数：

  - `{Layer} layer`

::: tip
支持不传参数，`scene.remove()`将删除所有的图层
:::

- 示例：
  ```js
  scene.remove(layer);
  ```
