# rollup-plugin-app-utils

롤업 빌드시 활용할 수 있는 일반적인 유틸리티 플러그인을 제공합니다.

i18n 을 위한 유틸 플러그인 등 다양한 플러그인을 제공하지만, 유용한 것 몇 가지만 추려보겠습니다.

## 사용법

```js
import Utils from 'rollup-plugin-app-utils';
// or
import { emptyDirectories } from 'rollup-plugin-app-utils';
```

## emptyDirectories

롤업이 `dist 폴더`에 번들 파일을 쓰기에 앞서, `dist 폴더`를 초기화 합니다.
`rollup-plugin-clear` 와 하는 일이 동일합니다.

_watch 모드에서도 매 빌드시마다 정상 동작합니다._

```js
import { emptyDirectories } from 'rollup-plugin-app-utils';

export default {
  // ...
  plugins: [emptyDirectories(['./dist'])],
};
```

## prepareDirectories

빌드 시에 디렉터리를 동적으로 생성합니다.
번들 디렉터리 세팅을 빌드 과정 중에 진행하고 싶을 때 활용할 수 있습니다.

내부적으로 하는 일은 아주 간단합니다.
그냥 `mkdir -p` 를 통해 주어진 이름(들)의 디렉터리를 생성하는 것이 전부입니다.

활용법은 사용하기 나름인 것 같습니다.

디렉터리가 동적으로 생성되는 만큼, 빌드 과정 중 특정 state에 의존해 커스텀 디렉터리를 생성하고 관련된 동작을 연계할 수 있습니다.

아래의 예시와 같이 다른 유틸 플러그인들과 병용할 수 있습니다.
이 때, 각 유틸 플러그인은 동기적으로/순서대로 동작합니다.

```js
import { emptyDirectories, prepareDirectories } from 'rollup-plugin-app-utils';

export default {
  // ...
  plugins: [
    emptyDirectories(['./dist']),
    prepareDirectories(['./dist/static']),
  ],
};
```

## copyAssets

빌드 중에 정적 파일들의 복사를 수행합니다.

`cp -r` 과 하는 일이 동일하다고 볼 수 있겠습니다.

인자로써 `원본경로`와 `대상경로`를 각각 `키`와 `값`으로 갖는 설정 객체를 받습니다.

만약 원본 경로가 `특정 파일`을 가르킨다면, `대상경로`도 `파일 경로`가 되어야 합니다. `디렉터리 경로`가 될 수 없습니다.

```js
import { copyAssets } from 'rollup-plugin-app-utils';

export default {
  // ...
  plugins: [
    copyAssets({
      './public/images': './dist/images',
    }),
  ],
};
```

두번째 인자로써 필터링을 위한 함수를 받을 수 있습니다.

```js
const filterFunc = (src, dest) => {
  // filter logic..
  return true;
};
```

복사 과정을 수행할 때마다 이 함수가 호출됩니다.
원본 경로가 디렉터리일 경우 내부에 위치한 파일의 경로가 src 에 해당 파일이 복사될 경로가 dest에 할당되어 매번 호출됩니다.

함수의 호출 결과가 true 일 때만 복사를 수행하고 false일 경우 무시합니다.

## 공식 저장소

[Autodesk/rollup-plugin-app-utils: Provides common rollup build utils for i18n, prepare & clean directories, copy assets & html injects](https://github.com/Autodesk/rollup-plugin-app-utils)
