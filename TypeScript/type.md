### 对象中多属性同类型的定义

有一个对象它包含 5 个可选属性 `a`、`b`、`c`、`d`、`e`，他们的类型都为 `string`，大多数人的定义方式应该如下所示：

```javascript
type obj = {  a?:string;  b?:string;  c?:string;  d?:string;  e?:string; }
```

简写

```javascript
export type obj = { [P in 'a' | 'b' | 'c' | 'd' | 'e']?: string }
```



```javascript
/**
 * 
 * 导出了一个 defineConfig 的函数给开发者，其中有 a 和 b 字段是二选一的, foo 是可选的
 * 完成 UserConfig
 * 
 */

// type XOR<T, A, B> = T extends A ? A : B;
// type foo = {  [key: string]: never, a: boolean, };

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type UserConfig  = XOR<{ a: boolean}, { b: boolean }> & { foo?: string }

function defineConfig(t: UserConfig) {
  // 
}
// ok
defineConfig({ a: true })
defineConfig({ a: true, foo: 'aa' })
defineConfig({ b: true })

// error
defineConfig({ a: true, b: true })
defineConfig({ a: true, c: true })

// type MergeIntersection<T> = T extends object ? {
//   [K in keyof T]: T[K] extends object ? MergeIntersection<T[K]> : T[K]
// } : T
```

```javascript
/**
 * 
 * 导出了一个 defineConfig 的函数给开发者，其中有 a 和 b 字段是二选一的, foo 是可选的
 * 完成 UserConfig
 * 
 */
type UserConfig = {
  foo?:string,
  a:boolean,
  b:boolean,
  c: boolean;
}

{a:boolean} & {foo?: string} & {b:never, c : never}
{b:boolean} & {foo?: string};
{c:boolean} & {foo?: string};

type SetKeyNever<T, K extends keyof T> = {
  [x in K]?: never;
};

// type z = SetKeyNever<UserConfig, 'a' | 'b'>
type z = Pick<UserConfig, 'a' | 'b'>

type x = Exclude<'a' | 'v', 'a'>

type JustOne<T, K extends (keyof T)[] = [], Y extends keyof T = K[number]> = {
  [x in Y]: Pick<T, Exclude<keyof T, Exclude<Y, x>>> &
  SetKeyNever<T, Exclude<Y, x>>;
}[Y];

type n =  ['a', 'b','c'][number]

function defineConfig(t: JustOne<UserConfig, ['a', 'b','c']>) {
  // 
}
// ok
defineConfig({ a: true })
defineConfig({ a: true, foo: 'aa' })
defineConfig({ b: true })

// error
defineConfig({ a: true, b: undefined })
defineConfig({ a: true, c: true })

type z1 = JustOne<UserConfig, ['a', 'b','c']>

type MergeIntersection<T> = T extends object ? {
  [K in keyof T]: T[K] extends object ? MergeIntersection<T[K]> : T[K]
} : T

// 可视化
type p = MergeIntersection<z1>
```