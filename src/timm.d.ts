declare module 'timm' {
  type Required<T> = {[K in keyof T]-?: NonNullable<T[K]>}
  type Key = number | string;
  type KeyOf<T> = keyof NonNullable<T>
  type Get<T, K extends KeyOf<T>> = NonNullable<T>[K]
  type Nullable = null | undefined;
  type Obj = {[K in keyof any]: any}
  type WithNewKey<T, K extends Key, V> = T extends Nullable ? FromKey<K, V> : T & {[K_ in K]: V}
  type FromKey<K extends Key, V> = K extends number ? V[] : {[K_ in K]: V}
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

  export function clone<T extends object>(obj: T): T;
  export function addLast<T>(array: ReadonlyArray<T>, val: ReadonlyArray<T> | T): Array<T>;
  export function addFirst<T>(array: ReadonlyArray<T>, val: ReadonlyArray<T> | T): Array<T>;
  export function removeLast<T>(array: ReadonlyArray<T>): ReadonlyArray<T>;
  export function removeFirst<T>(array: ReadonlyArray<T>): ReadonlyArray<T>;
  export function insert<T>(
    array: ReadonlyArray<T>,
    idx: number,
    val: ReadonlyArray<T> | T
  ): Array<T>;
  export function removeAt<T>(array: ReadonlyArray<T>, idx: number): Array<T>;
  export function replaceAt<T>(
    array: ReadonlyArray<T>,
    idx: number,
    newItem: T
  ): Array<T>;
  // TODO: maybe use UnionToIntersection
  export function getIn<
    T,
    K1 extends KeyOf<T>,
    K2 extends KeyOf<Get<T, K1>>,
    K3 extends KeyOf<Get<Get<T, K1>, K2>>
  >(obj: T, path: [K1, K2, K3]): Get3<T, K1, K2, K3>
  export function getIn<T, K1 extends KeyOf<T>, K2 extends KeyOf<Get<T, K1>>>(
    obj: T,
    path: [K1, K2]
  ): Get2<T, K1, K2>
  export function getIn<T, K1 extends keyof NonNullable<T>>(obj: T, path: [K1]): T extends Obj ? T[K1] : undefined;
  export function getIn(obj: object | Nullable, path: Array<Key>): any;
  export function set<T, K extends keyof T> (obj: T, key: K, val: T[K]): T
  export function set<T, K extends Key, V> (obj: T, key: K, val: V): WithNewKey<T, K, V>
  export function setIn<T, K1 extends keyof T> (obj: T, path: [K1], val: T[K1]): T
  export function setIn<T, K1 extends Key, V> (obj: T, path: [K1], val: V): WithNewKey<T, K1, V>
  export function setIn<T, K1 extends keyof T, K2 extends keyof T[K1]> (obj: T, path: [K1, K2], val: T[K1][K2]): T
  export function setIn<T, K1 extends keyof T, K2 extends Key, V> (obj: T, path: [K1, K2], val: V):
    T & {[K in K1]: WithNewKey<T[K1], K2, V>}
  export function setIn<T, K1 extends Key, K2 extends Key, V> (obj: T, path: [K1, K2], val: V):
    T extends Nullable ? FromKey<K1, FromKey<K2, V>> : WithNewKey<T, K1, FromKey<K2, V>>
  export function setIn<T>(
    obj: T,
    path: Array<Key>,
    val: any
  ): T;
  // NOTE: if key is number, and T extends Nullable, this func does NOT generate an array
  export function update<T>(
    obj: T,
    key: Key,
    fnUpdate: (prevValue: any) => any
  ): T;
  export function updateIn<T>(
    obj: T,
    path: Array<Key>,
    fnUpdate: (prevValue: any) => any
  ): T;
  export function merge<T>(
    value: T,
    ...rest: Array<T>
  ): T;
  export function merge<T1, T2>(
    a: T1,
    b: T2,
  ): Omit<T1, keyof T2> & T2;
  export function merge<T1, T2, T3>(
    a: T1,
    b: T2,
    c: T3,
  ): Omit<T1, keyof T2 | keyof T3> & Omit<T2, keyof T3> & T3;
  export function merge(
    a: object,
    b?: object,
    c?: object,
    d?: object,
    e?: object,
    f?: object,
    ...rest: Array<object>
  ): object;
  export function mergeDeep(
    a: object,
    b?: object,
    c?: object,
    d?: object,
    e?: object,
    f?: object,
    ...rest: Array<object>
  ): object;
  export function mergeIn<T extends object, K1 extends keyof T> (obj: T, path: [K1], val: T[K1]): T
  export function mergeIn<T extends object, K1 extends keyof T, V> (obj: T, path: [K1], val: V): Omit<T, K1> & {[K in K1]: Omit<T[K1], keyof V> & V}
  export function mergeIn<T extends object, K1 extends Key, V> (obj: T, path: [K1], val: V): WithNewKey<T, K1, V>
  export function mergeIn<T, K1 extends keyof T, K2 extends keyof T[K1]> (obj: T, path: [K1, K2], val: T[K1][K2]): T
  export function mergeIn<T, K1 extends keyof T, K2 extends Key, V> (obj: T, path: [K1, K2], val: V): T & {[K in K1]: WithNewKey<T[K1], K2, V>}
  export function mergeIn<T extends object>(
    a: T,
    path: Array<Key>,
    b?: object,
    c?: object,
    d?: object,
    e?: object,
    f?: object,
    ...rest: Array<object>
  ): T;
  export function omit(obj: object, attrs: Array<string> | string): object;
  export function addDefaults(
    a: object,
    b?: object,
    c?: object,
    d?: object,
    e?: object,
    f?: object,
    ...rest: Array<object>
  ): object;


  type ExtractNulls<T> = T extends null | undefined ? undefined : never

  type Get2<
    T,
    K1 extends keyof NonNullable<T>,
    K2 extends keyof Required<NonNullable<T>>[K1],
  > =
  T extends null | undefined ? undefined : ExtractNulls<T> |
  (NonNullable<T>[K1] extends null | undefined ? undefined : ExtractNulls<NonNullable<T>[K1]> | (
  NonNullable<NonNullable<T>[K1]>[K2]))
  type Get3<
    T,
    K1 extends keyof NonNullable<T>,
    K2 extends keyof Required<NonNullable<T>>[K1],
    K3 extends keyof Required<Required<NonNullable<T>>[K1]>[K2],
  > =
  T extends null | undefined ? undefined : ExtractNulls<T> |
  (NonNullable<T>[K1] extends null | undefined ? undefined : ExtractNulls<NonNullable<T>[K1]> | (
  NonNullable<NonNullable<T>[K1]>[K2] extends null | undefined ? undefined : ExtractNulls<NonNullable<NonNullable<T>[K1]>[K2]> | (
  NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>[K3])))
  // type Get4<
  //   T,
  //   K1 extends keyof NonNullable<T>,
  //   K2 extends keyof Required<NonNullable<T>>[K1],
  //   K3 extends keyof Required<Required<NonNullable<T>>[K1]>[K2],
  //   K4 extends keyof Required<Required<Required<NonNullable<T>>[K1]>[K2]>[K3]
  // > =
  // T extends null | undefined ? undefined : ExtractNulls<T> |
  // (NonNullable<T>[K1] extends null | undefined ? undefined : ExtractNulls<NonNullable<T>[K1]> | (
  // NonNullable<NonNullable<T>[K1]>[K2] extends null | undefined ? undefined : ExtractNulls<NonNullable<NonNullable<T>[K1]>[K2]> | (
  // NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>[K3])))
  // ? T[K1][K2][K3] : undefined : undefined : undefined;
}

type foo = {a: 1} | null | undefined

type bar<T> = T extends object ? T : never
type baz = bar<foo>
type Obj = {[K in keyof any]: any}
type Get<T, K extends keyof NonNullable<T>> = T extends import('timm').Obj ? T[K] : undefined
