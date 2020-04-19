# rollup-plugin-clear

롤업이 번들링을 수행할 때 특정 디렉터리들을 초기화할 수 있도록 도와줍니다.

## 옵션

- targets: 필수 옵션입니다. 청소할 디렉터리들의 경로를 배열로 받습니다.
- watch : 선택 옵션입니다. `--watch 모드`에서 파일 변경 감지에 의해 재 컴파일이 될 때에도 초기화 작업을 수행할 지의 여부를 boolean 값으로 지정합니다. 기본값은 false 입니다.

## 설정 예시

해당 플러그인의 공식 저장소에 포함되어 있는 예시 코드입니다.

```js
// rollup.config.js
import clear from 'rollup-plugin-clear';

const config = {
  // ...
  plugins: [
    // ...
    clear({
      targets: ['some directory'],
      watch: true,
    }),
  ],
};

export default config;
```

## 공식 저장소

[DongShelton/rollup-plugin-clear: Rollup clean plugin](https://github.com/DongShelton/rollup-plugin-clear)
