# NextJs框架学习

基于目前最新版本NextJs-15.1.6官方文档的学习笔记



## NextJs是什么

​	Next.js 是一个用于构建全栈 Web 应用的 React 框架。你可以使用 React 组件来构建用户界面，而使用 Next.js 来实现额外的功能和优化。

​	在底层，Next.js 还抽象化并自动配置了 React 所需的工具，如打包、编译等。这使你可以专注于构建应用程序，而不需要花费时间进行配置。

​	无论你是个人开发者还是团队成员，Next.js 都能帮助你构建互动性强、动态且快速的 React 应用程序。



## Chapter 1

### 创建项目

​	官方推荐使用 **pnpm** 进行安装下载相关的包和依赖

​	全局安装pnpm命令：

```powershell
npm install -g pnpm
```

​	创建next项目命令：

```powershell
npx create-next-app@latest 
```



### 项目结构

​	![image-20250131134750937](../../../AppData/Roaming/Typora/typora-user-images/image-20250131134750937.png)



### 占位数据

​	在这个项目中在`app/lib/placeholder-data.ts`文件中提供了一些占位数据。文件中的每个 JavaScript 对象代表了数据库中的一个表。



### Typescript

​	通过使用Typescript可以保证参数的正确传递

```typescript
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};
```



### 启动开发服务器

​	安装项目的依赖包：

```powershell
pnpm i
```

​	打开开发服务器：

```powershell
pnpm dev
```





## Chapter 2

### 全局样式

​	在`/app/ui` `global.css`这个文件中可以为你所需要写的如何应用添加样式。

​	然后在对应的组件下引入，通常情况下，在top-level 组件引入是个更好的选择，因为top-level组件通常情况下是**根部局**

​	在`/app/layout.tsx` `global.css`引入global.css如下：

```tsx
import '@/app/ui/global.css';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```



### TailWind

​	NextJs中还将TailWind作为该框架的可选css框架。

​	在TailWind中元素的样式通过对className的改变而改变的。如adding `"text-blue-500"` will turn the `<h1>` text blue:

```html
<h1 className="text-blue-500">I'm blue!</h1>
```



### CSS模块

​	CSS 模块允许您通过自动创建唯一的类名来将 CSS 范围限定为组件，因此您也不必担心样式冲突。

​	使用案例如下：

​	在`/app/ui`下创建一个叫`home.module.css`如下：

```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

​	在`/app/page.tsx`下导入并在div标签的className中添加`styles.shape`

```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
 
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
    // ...
  )
}
```



### 使用`clsx`库切换类名

​	[`clsx`](https://www.npmjs.com/package/clsx) is a library that lets you toggle class names easily. 

​	[文档地址](https://github.com/lukeed/clsx)

​	具体代码如下：

```tsx
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```





## Chapter 3

在 Next.js 中优化字体和图片

#### 为什么优化字体？

- **Cumulative Layout Shift (CLS)**：字体加载延迟会导致页面布局的变化，影响用户体验。
- Next.js 使用 `next/font` 模块优化字体，避免额外的网络请求，从而提高性能。
- **优化方式**：在构建时下载字体并将其托管为静态资源，避免运行时加载导致的性能下降。

####  如何添加自定义字体？

- 在 

	```
	/app/ui/fonts.ts
	```

	 中导入自定义字体。例如，导入 Google 字体 

	```
	Inter
	```

	：

	```ts
	import { Inter } from 'next/font/google';
	export const inter = Inter({ subsets: ['latin'] });
	```

- 在 

	```
	/app/layout.tsx
	```

	 中，将字体应用到 

	```
	<body>
	```

	 元素：

	```tsx
	<body className={`${inter.className} antialiased`}>{children}</body>
	```

- 这样可以确保整个应用程序使用指定的字体。

####  添加二级字体

- 在 

	```
	/app/ui/fonts.ts
	```

	 中导入二级字体（如 

	```
	Lusitana
	```

	）：

	```ts
	import { Lusitana } from 'next/font/google';
	export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
	```

- 在 

	```
	/app/page.tsx
	```

	 中应用该字体：

	```tsx
	<p className={lusitana.className}>Your text here</p>
	```

- 这样你可以为不同的元素添加不同的字体和权重。

#### 为什么优化图片？

- 图片优化能够提高页面加载速度，减少布局偏移，并且避免在用户视口之外的图片延迟加载。

- Next.js 的 `<Image>` 组件

	：自动优化图片，支持：

	- 自动调整图片大小。
	- 默认延迟加载图片。
	- 根据浏览器支持的格式（如 WebP 和 AVIF）提供图片。

####  添加Desktop hero-image

- 使用 

	```
	<Image>
	```

	 组件导入并显示桌面版图片：

	```tsx
	<Image
	  src="/hero-desktop.png"
	  width={1000}
	  height={760}
	  className="hidden md:block"
	  alt="Screenshots of the dashboard project showing desktop version"
	/>
	```

- 设置宽度和高度，以防止布局偏移，同时确保图片在不同设备上响应式显示。

#### 添加Mobile hero-image 

- 同样使用 

	```
	<Image>
	```

	 组件添加移动版图片：

	```tsx
	<Image
	  src="/hero-mobile.png"
	  width={560}
	  height={620}
	  className="md:hidden"
	  alt="Screenshots of the dashboard project showing mobile version"
	/>
	```

- 使用 `md:hidden` 类来确保在桌面版上隐藏该图片，在移动设备上显示。

#### 常见问题和最佳实践

- True or False

	: 图片没有指定尺寸和网页字体是常见的布局偏移原因。

	- 答案：**True**。没有明确尺寸的图片和字体加载延迟常常导致页面布局变化。

通过这一章，你已掌握了如何在 Next.js 中优化字体和图片，提升网站性能并确保良好的用户体验。





## Chapter 4

### 嵌套路由

​	NextJs使用基于文件系统的路由，其中文件夹用于创建嵌套路由。每个文件夹代表一个路由片段，并映射到对应的URL片段上。如下图：![image-20250131142832902](../../../AppData/Roaming/Typora/typora-user-images/image-20250131142832902.png)

​	page.tsx是NextJs中的一个特殊文件，它需要导出一个React组件，并且是使路由可访问的必须文件。如下图：

![image-20250131143021387](../../../AppData/Roaming/Typora/typora-user-images/image-20250131143021387.png)



### 页面布局

​	通常在一个偏应用类型的网站中，其页面布局是有许多共同样式不需要重复渲染，因此只需讲共有的样式写在一个文件内就可以实现局部渲染。通常在一个总路由下创建`layout.tsx`文件进行页面的布局，如下：

在一个financial dashboard案例中在dashboard文件夹下创建`layout.tsx`

```tsx
import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

![image-20250131145500089](../../../AppData/Roaming/Typora/typora-user-images/image-20250131145500089.png)





## Chapter 5

### The `<Link>` component

​	在NextJs中可以使用`<Link/>`组件在应用的页面之间进行导航。该组件支持**客户端导航（client-side navigation）**，即使用JavaScript处理页面切换，而无需让浏览器重新加载整个页面。

​	具体使用方法如下：

​	在`/app/ui/dashboard/nav-links.tsx`中引入`Link`组件

```tsx
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';*****
 
// ...
 
export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          /*****/<Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link> /*****/
        );
      })}
    </>
  );
}
```



### 自动代码拆分（Automatic Code-Splitting）和预加载（Prefetching）

- 为了提升导航体验，Next.js **会根据路由段（route segments）自动拆分代码**，只加载当前访问页面所需的部分。与传统的 **React 单页应用（SPA）** 不同。在传统 React SPA 中，浏览器通常会在**首次加载时**加载整个应用的 JavaScript 代码，即使用户只访问了首页，所有的组件和页面代码都会被下载，导致加载时间变长。

- 按路由拆分代码意味着每个页面都是独立的。如果某个页面发生错误，应用的其他部分仍然可以正常运行，不会受到影响。此外，浏览器需要解析的代码更少，这使得应用运行得更快。
- 此外，在**生产环境**中，当 `<Link>` 组件出现在浏览器的**视口**（viewport）中时，Next.js **会在后台自动预加载该链接对应页面的代码**。这样，当用户真正点击链接时，目标页面的代码已经提前加载完成，从而实现**几乎即时的页面切换**！



### Pattern： Showing active links

​	要实现显示当前活动链接的模式（即让用户知道自己当前所在的页面），可以使用 Next.js 提供的 `usePathname()` hook。由于 `usePathname()` 是一个 React hook，因此需要将 `nav-links.tsx` 文件转换为 **客户端组件**。实现方法是在文件顶部添加 `"use client"` 指令。

​	代码如下：

```tsx
'use client';*****
 
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';*****
import clsx from 'clsx';*****
 
// ...
 
export default function NavLinks() {
  const pathname = usePathname();/******/
 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
         /******/ <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>/******/
        );
      })}
    </>
  );
}
```





## Chapter 6

设置 PostgreSQL 数据库与部署

####  推送项目到 GitHub

- 将项目推送到 GitHub，以便后续与数据库的连接与部署。
- 如果不熟悉 GitHub，可以使用 GitHub Desktop App 简化开发流程。

####  创建 Vercel 账户并连接 GitHub

- 访问 [Vercel 注册页面](https://vercel.com/signup) 创建账户，选择免费的 "hobby" 计划。
- 选择 "Continue with GitHub" 以连接 GitHub 和 Vercel 账户。

#### 连接并部署项目

- 在 Vercel 上导入 GitHub 仓库，命名项目后点击 "Deploy"。
- 每次推送主分支时，Vercel 会自动重新部署应用。开设 Pull Request 时，还可以获得即时预览链接。

####  创建 PostgreSQL 数据库

- 在 Vercel 项目面板中，选择 "Storage" 标签并点击 "Create Database"。
- 选择 PostgreSQL 提供商（如 Neon 或 Supabase），然后选择数据库所在区域。
- 创建数据库后，复制连接密钥并更新到 `.env.local` 文件中。
- 确保 `.env` 被列入 `.gitignore`，避免泄露数据库密钥。

#### 数据库初始化（Seeding）

- 使用提供的 API 在浏览器中运行数据库初始化脚本，将初始数据填充至数据库。
- 运行开发服务器并访问 `localhost:3000/seed` 以启动初始化过程。
- 初始化完成后，页面将显示 "Database seeded successfully"，然后可以删除初始化文件。

通过以上步骤，你将成功创建和链接 PostgreSQL 数据库，完成数据的初始化，并将项目部署到 Vercel 上。



## Chapter 7

数据获取与并行请求优化

####  数据获取方式

在构建应用时，有多种方式可以获取数据。常见的方式包括：

- **API层**：API充当应用代码与数据库之间的中介。适用于从第三方服务获取数据，或者在客户端获取数据时，通过API层避免暴露数据库的密钥。
- **数据库查询**：对于全栈应用，通常需要直接操作数据库，可以使用SQL或者ORM。通过SQL查询，可以直接从数据库获取需要的数据，避免客户端直接操作数据库。

#### 使用React Server组件获取数据

- **React Server组件**：React Server组件允许你在服务器端获取数据，可以直接查询数据库，而不需要额外的API层。这种方式节省了维护API层的代码，并且避免暴露数据库密钥给客户端。
- 优点:
	- 支持异步操作，可以直接使用 `async/await` 语法。
	- 数据请求仅在服务器端发生，减少了不必要的数据传输。
	- 可以直接查询数据库，不需要额外的API层。

####  SQL查询

SQL是查询关系型数据库的标准语言。在构建仪表盘应用时，使用SQL可以更精确地获取所需数据，避免不必要的数据传输和客户端的数据处理。

- 例如，使用 `postgres.js` 库来执行SQL查询，避免SQL注入攻击，并提高数据库查询效率。

#### 并行数据获取

通过并行数据获取，可以避免“请求瀑布效应”（Network Waterfall）。请求瀑布是指后一个请求需要等待前一个请求完成，导致请求依赖性链条，从而影响性能。

- **Promise.all**：使用 `Promise.all()` 可以同时发起多个请求，减少等待时间。例如，可以同时发起获取总收入、最新发票数量、客户数量等的请求。
- **请求并行的好处**：提高性能，避免请求依赖链条，所有请求可以并行处理，减少响应时间。

#### Waterfall模式

请求瀑布模式通常发生在数据请求顺序依赖的情况下。每个请求都需要等待前一个请求返回数据后才会开始。虽然这种模式在某些情况下很有用，但它会降低应用的性能。

**何时使用Waterfall模式**：在需要某个条件成立后才能发起下一个请求时。例如，先获取用户的ID，再获取用户的好友列表。

####  并行数据获取示例

```typescript
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`
      SELECT SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
             SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
      FROM invoices`;
    
    const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise]);

    const numberOfInvoices = Number(data[0].count ?? '0');
    const numberOfCustomers = Number(data[1].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('数据库错误:', error);
    throw new Error('无法获取卡片数据');
  }
}
```

#### 总结

- 使用React Server组件进行数据获取可以减少开发复杂度，避免在客户端暴露数据库信息。
- 使用SQL查询可以精确地从数据库中获取所需的数据，避免冗余的数据处理。
- 并行请求（例如使用`Promise.all()`）可以提高性能，避免请求瀑布效应。

这种并行获取数据的模式适用于大多数情况，尤其是当数据来源独立且没有顺序依赖时。





## Chapter 8

Next.js中的静态渲染与动态渲染

#### 静态渲染

- **定义：** 数据获取和渲染在构建时进行（即部署或重新验证数据时）。结果会被缓存，并在用户访问时提供。
- 优点：
	- **更快的网站**：预渲染的内容可以缓存并全球分发，从而提高页面加载速度。
	- **减少服务器负载**：缓存的内容不需要每次请求时重新动态生成，减少计算成本。
	- **SEO优势**：由于内容在页面加载时已可用，搜索引擎更容易抓取，从而提升SEO排名。
- **适用场景：** 适合用于静态或共享数据的页面（例如博客、产品页面），但不适用于需要频繁更新的个性化数据（如仪表板）。

#### 动态渲染

- **定义：** 内容在用户访问页面时（请求时）在服务器端进行渲染。
- 优点：
	- **实时数据**：适用于显示经常更新的数据的应用。
	- **用户特定内容**：可以更轻松地提供个性化内容（例如仪表板或用户资料），并根据用户交互更新数据。
	- **请求时信息**：可以访问只有在请求时才能获得的信息（如Cookies或URL查询参数）。

#### 模拟慢速数据获取

- **问题：** 在动态渲染中，应用的速度受限于最慢的数据请求。如果其中某个数据请求比其他请求慢，可能会导致页面加载缓慢。
- **解决方法：** 通过在`fetchRevenue()`函数中添加人工延迟，模拟一个慢速数据请求，观察应用如何受到影响。

总结：

- 静态渲染适用于不常变化的数据，而动态渲染更适合需要实时更新的数据或个性化内容。





## Chapter 9

Next.js流式加载与Suspense使用**

### 什么是流式加载（Streaming）

​	流式加载是一种数据传输技术，它允许将路由分解为更小的“块”，并在这些块准备好时从服务器流式传输到客户端。通过流式加载，可以避免慢速数据请求阻塞整个页面的加载，使得用户能够在页面数据尚未完全加载时就开始与页面交互。

### 如何使用 `loading.tsx` 和 Suspense 实现流式加载

- **在页面级别实现流式加载**：
	- 通过在 `/app/dashboard` 文件夹中创建 `loading.tsx` 文件，Next.js 会自动使用 React Suspense 来实现流式加载。`loading.tsx` 文件会为页面提供一个加载时的替代 UI。
	- 例如，`<SideNav>` 是静态内容，首先加载并展示，而动态内容（如卡片数据）则会延迟加载。
- **在组件级别实现流式加载**：
	- 你可以将流式加载应用于特定的组件，通过使用 `Suspense` 组件将组件包裹，并为每个动态加载的组件提供一个 `fallback`，如加载骨架图。

------

### 什么是加载骨架（Loading Skeleton）？

加载骨架是 UI 的简化版本，通常用作加载中的占位符，提示用户内容正在加载。常见的做法是将骨架组件放在 `loading.tsx` 文件中，这样在实际内容加载时，骨架会作为占位符先展示给用户。

```tsx
// /app/dashboard/loading.tsx
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
```

------

### Next.js路由分组（Route Groups）

路由分组允许你将文件按逻辑分组，而不影响 URL 路径结构。你可以使用圆括号（`()`）创建路由分组，这样分组中的文件不会影响 URL 结构。

**如何使用路由分组**：

1. 创建一个新文件夹，如 `/dashboard/(overview)`。
2. 将 `loading.tsx` 和 `page.tsx` 文件移入此文件夹中，确保只在 `/dashboard/overview` 页面中应用 `loading.tsx`。

------

### 设置 React Suspense 边界

Suspense 边界用于控制组件加载状态的显示方式。你可以将 Suspense 包裹在你希望延迟加载的组件周围，为它提供一个 `fallback` 组件。

- **流式加载特定组件**： 你可以将数据请求移动到组件内部，在组件内进行数据获取并使用 `Suspense` 包裹，避免阻塞页面的其他部分。以下是实现方式：

```tsx
// /app/dashboard/(overview)/page.tsx
import { Suspense } from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const cardData = await fetchCardData();

  return (
    <main>
      <div>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
```

- **流式加载多个组件**： 使用 `Suspense` 可以将多个组件分开加载，避免页面加载时的 UI 刷新或弹跳效果。

------

### 实践：流式加载 `LatestInvoices` 组件

1. 将 `fetchLatestInvoices()` 移到 `LatestInvoices` 组件内。
2. 使用 `Suspense` 包裹 `LatestInvoices` 组件，并为其提供一个加载骨架。

```tsx
// /app/ui/dashboard/latest-invoices.tsx
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    // 渲染最新发票内容
  );
}
// /app/dashboard/(overview)/page.tsx
<Suspense fallback={<LatestInvoicesSkeleton />}>
  <LatestInvoices />
</Suspense>
```

------

### 组件分组与设置 Suspense 边界

- **分组卡片组件**： 为避免多个卡片组件加载时的“跳动”效果，可以将它们包裹在一个包装组件内，并在包装组件中使用 `Suspense`。

```tsx
// /app/ui/dashboard/cards.tsx
import { fetchCardData } from '@/app/lib/data';

export default async function CardWrapper() {
  const cardData = await fetchCardData();
  return (
    <>
      <Card title="Collected" value={cardData.totalPaidInvoices} />
      <Card title="Pending" value={cardData.totalPendingInvoices} />
    </>
  );
}
```

------

### 总结

- **Suspense 边界的放置位置**：
	- 放置 Suspense 边界时，要考虑用户体验、数据请求的优先级以及是否存在慢速数据加载的情况。
	- 可以在页面级别或组件级别设置 Suspense 边界，甚至按页面分组进行流式加载。
- **流式加载的优势**：
	- 流式加载使得慢速数据请求不会阻塞整个页面加载，提升用户体验。
	- 你可以通过设置 Suspense 边界来控制哪些部分应优先加载，哪些部分稍后加载。





## Chapter 10

​	在本章中，您将学习如何将静态渲染、动态渲染和流式传输结合在同一路由中使用部分预渲染（Partial Prerendering，PPR）。

​	部分预渲染是Next.js 14中引入的一个实验性功能。随着该功能的稳定性进展，本页面的内容可能会有所更新。PPR仅在Next.js的canary版本（next@canary）中可用，而不适用于Next.js的稳定版本。我们目前不推荐在生产环境中使用部分预渲染。

要安装Next.js的canary版本，可以运行以下命令：

```bash
pnpm install next@canary
```

### 静态路由与动态路由

​	如今，大多数Web应用程序在构建时要么选择静态渲染，要么选择动态渲染，或者在特定路由上选择其中一种方式。而在Next.js中，如果您在路由中调用了动态函数（例如查询数据库），那么整个路由都会变为动态。

​	然而，大多数路由并不是完全静态或完全动态的。例如，考虑一个电商网站。您可能希望将大部分的产品信息页面进行静态渲染，但也希望动态地获取用户的购物车和推荐产品内容，以便展示个性化内容。

​	回到您的仪表盘页面，您认为哪些组件是静态的，哪些是动态的呢？

​	当您准备好时，点击下方按钮查看我们如何拆分仪表盘路由：

### 什么是部分预渲染？

​	Next.js 14引入了部分预渲染的实验性版本——一种新的渲染模型，允许您在同一路由中结合静态渲染和动态渲染的优点。例如：

部分预渲染的产品页面显示静态的导航和产品信息，并动态加载购物车和推荐产品。

当用户访问一个路由时：

- 提供静态的路由外壳，其中包括导航栏和产品信息，确保快速的初始加载。
- 外壳中留出位置，动态内容（如购物车和推荐产品）将在异步加载时填充。
- 异步内容将并行流式传输，减少页面的整体加载时间。



### 部分预渲染如何工作？

​	部分预渲染使用React的Suspense（您在前一章中学到的内容）来推迟应用程序部分内容的渲染，直到满足某些条件（例如数据加载完毕）。

​	Suspense回退机制与静态内容一起嵌入到初始HTML文件中。在构建时（或在重新验证期间），静态内容会被预渲染，创建静态外壳。动态内容的渲染则推迟到用户请求该路由时。

​	将组件包装在Suspense中并不会使组件本身变为动态组件，而是将Suspense作为静态代码和动态代码之间的边界。

### 如何实现部分预渲染

通过在`next.config.mjs`文件中添加`ppr`选项启用PPR：

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
```

`incremental`值允许您为特定路由采用PPR。

​	接下来，在您的仪表盘布局中添加`experimental_ppr`配置选项：

```tsx
import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental_ppr = true;

// ...
```

​	完成这些步骤后，您在开发环境中可能不会看到变化，但在生产环境中，您应能注意到性能提升。Next.js将预渲染路由中的静态部分，并将动态部分推迟到用户请求时再加载。

​	部分预渲染的一个优点是，您无需更改代码即可使用它。只要您使用Suspense来包装路由中的动态部分，Next.js会自动识别哪些部分是静态的，哪些是动态的。

​	我们相信部分预渲染有潜力成为Web应用程序的默认渲染模型，将静态站点和动态渲染的优点结合起来。然而，它仍然是实验性的。我们希望在未来稳定该功能，并将其作为Next.js构建的默认方式。

### 总结

回顾一下，您已经做了一些优化工作来提高应用程序中的数据获取效率：

- 在与应用程序代码位于同一地区的数据库中创建数据库，减少服务器和数据库之间的延迟。
- 使用React Server Components在服务器端获取数据。这允许您将昂贵的数据获取和逻辑保留在服务器上，减少客户端JavaScript包的大小，并防止数据库密钥暴露给客户端。
- 使用SQL仅获取所需的数据，减少每次请求传输的数据量，并减少转换数据所需的JavaScript代码。
- 在合理的情况下，使用JavaScript并行化数据获取。
- 实现流式传输，防止缓慢的数据请求阻塞整个页面，并允许用户在不等待所有内容加载的情况下与UI互动。
- 将数据获取下移到需要它的组件，从而隔离路由中哪些部分应该是动态的。





## Chapter 11

这章讲解了如何在 Next.js 中实现搜索和分页功能，下面是要点总结：

### 主要内容

- 使用 Next.js 提供的 API：`useSearchParams`、`usePathname` 和 `useRouter` 来管理搜索和分页。
- 使用 URL 查询参数来实现搜索和分页，保持 URL 状态同步，方便书签、分享和分析。

### 步骤解析

1. **捕获用户输入：**
	- 在 `<Search>` 组件中使用 `onChange` 事件来捕获搜索框中的值，并触发 `handleSearch` 函数。
2. **更新 URL 查询参数：**
	- 使用 `useSearchParams` 获取当前 URL 中的查询参数，并使用 `URLSearchParams` 更新搜索值。
	- 使用 `useRouter` 和 `replace` 方法更新 URL，从而不刷新页面。
3. **保持 URL 和输入框同步：**
	- 将 `defaultValue` 属性设置为 `searchParams.get('query')`，确保搜索框中的值和 URL 查询参数保持同步。
4. **更新表格数据：**
	- 在 `<Table>` 组件中接收 `query` 和 `currentPage` 作为 props，将它们传递给 `fetchFilteredInvoices` 函数，来获取符合条件的发票数据。
5. **防抖（Debouncing）：**
	- 在搜索框输入时，使用防抖（`use-debounce` 库）来限制更新频率，避免每个字符都触发一次查询，节省资源。
6. **分页功能：**
	- 在 `<Pagination>` 组件中，通过 `usePathname` 和 `useSearchParams` 获取当前页数，更新 URL 查询参数来实现分页导航。
	- 当用户进行搜索时，重置当前页为第一页。

### 关键点

- **使用 URL 查询参数**：这让搜索和分页功能更加简洁，同时支持书签、分享和分析。
- **服务端渲染（SSR）**：数据通过 URL 参数传递到服务器，服务器根据查询参数返回符合条件的数据。
- **防抖**：避免在用户每次输入时就进行数据库查询，提升性能。

### 完成的功能

- 在 `/dashboard/invoices` 页面实现了搜索和分页功能，URL 会根据用户的操作自动更新，且页面不会刷新。
- 通过防抖优化搜索功能，确保用户在停止输入后再进行查询。

这个实现的核心思想是通过 URL 来管理应用状态，这样可以简化客户端的状态管理，并充分利用 Next.js 的服务端渲染优势。





## Chapter 12