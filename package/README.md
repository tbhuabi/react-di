React 支持依赖注入库
=======================

## 安装
```
npm install @tanbo/react-di reflect-metadata
```

## 使用

在根组件提供顶级上下文，如：


新建一个全局类
```ts
// # user.ts
import { Injectable } from '@tanbo/di';

@Injectable()
export class User {
  name = '张三'
  show() {
    console.log('用户类')
  }
}
```
在根组件提供全局上下文
```tsx
import 'reflect-metadata'
import { RootInjectorContext, Provider } from '@tanbo/react-di';

import { User } from './user'

function App() {
  // rootContext 也可以直接是一个 Injector 类的实例
  const rootContext: Provider[] = [
    User
  ]

  return (
    <RootInjectorContext context={rootContext}>
      <div>
        <Home/>
      </div>
    </RootInjectorContext>
  )
}
```
在子组件使用上下文

```tsx
// # home.tsx
import { useInjectContext } from '@tanbo/react-di';

import { User } from './user'

export function Home(props) {
  const [injector, Context] = useInjectContext()
  // const [injector, Context] = useInjectContext([
  // 这里还可以传入新的 provider，以供下层使用
  // ])
  
  const user = injector.get(User)
  
  user.show()
  
  return (
    <div>
      用户名是：{user.name}
      <Context>
        {props.children}
      </Context>
    </div>
  )
}

```
