## pages 

具有动态路由的页面：

Next.js 支持具有动态路由的页面，比如，创建一个命名为 `pages/posts/[id].js` 的文件，然后你就可以访问 `posts/1`，`posts/2` 等类似的路径进行访问。

### 预渲染

默认情况下，Next.js 将域渲染每个 page。

这意味着 Next.js 会预先为每个页面生成 HTML 文件，而不是由客户端 JavaScript 来完成，预渲染可以带来更好的性能和 SEO 效果。

每个生成的 HTML 文件都与该页面所需的最少 JavaScript 代码相关联。当浏览器加载一个 page 时，其 JavaScript 代码将运行并使页面完全具有交互性。

Next.js 具有两种形式的预渲染：
1. 静态生成（推荐）：HTML 在构建时生成，并在每次页面请求时重用
2. 服务器端渲染：在每次页面请求时重新生成 HTML

Next.js 允许你为每个页面**选择**预渲染的方式。

你可以创建一个“混合渲染”的 Next.js 应用程序：对多数页面使用“静态生成”，同时对其他页面使用“服务器端渲染”。

#### 生成不带数据的静态页面：

```js
function About() {
  return <div>About</div>
}

export default About
```

在这种情况下，Next.js 只需在构建时为每个页面生成一个 HTML 文件即可。

#### 需要获取数据的静态生成：

某些页面需要获取外部数据进行预渲染，有两种情况，一种或者两种都可能适用。

在每种情况下，你都可以使用 Next.js 所提供的以下函数：

1. 你的页面**内容**取决于外部数据：使用`getStaticProps`
2. 你的页面路径取决于外部数据：使用`getStaticPaths`(通常还要同时使用 `getStaticProps`)

> 场景1： 页面内容取决于外部数据
> 从 CMS 中获取博客文章列表
```js
function Blog({ posts }) {
  return (
    <ul>
      {
        posts.map(post => (
          <li>{post.title}</li>
        ))
      }
    </ul>
  )
}
export default Blog
```

要在预渲染时获取此数据，Next.js 允许你从同一文件`export(导出)`一个名为`getStaticProps`的`async(异步)`函数。
该函数在构建时被调用，并允许你在预渲染时将获取的数据作为 `props` 参数传递给页面。

```js
function Blog({ posts }) {
  // Render posts...
}

// 此函数在构建时被调用
export async function getStaticProps() {
  // 调用外部 API 获取博文列表
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```
