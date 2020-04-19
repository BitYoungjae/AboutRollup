# rollup-plugin-banner

롤업에서서는 설정 객체의 `output.banner` 속성을 이용해 별도의 플러그인을 활용하지 않고도 번들 파일에 주석과 같은 임의의 내용물을 삽입할 수 있습니다.

단, 별도의 uglify 플러그인을 함께 병용할 경우 `output.banner`을 통해 주석으로 삽입된 컨텐츠가 minify 과정에서 삭제되므로, 이를 예방하기 위해 별도의 플러그인을 사용해 `banner` 를 삽입할 수 있습니다.

## 설정 예시

해당 플러그인의 공식 저장소에 포함되어 있는 예시 코드입니다.

```js
import banner from 'rollup-plugin-banner';

export default {
  plugins: [
    banner('rollup-plugin-banner v<%= pkg.version %> by<%= pkg.author %>'),
  ],
};
```

## 옵션

banner(인자)의 인자 부분에 문자열을 남겨줄 경우 해당 문자열을 번들 파일의 상단에 삽입합니다.

별도의 옵션 객체를 사용해 별도의 파일에 저장된 텍스트 파일을 배너로써 사용할 수도 있습니다.

아래는 역시 해당 플러그인의 공식 저장소에 포함된 예시 코드입니다.

```js
banner({
  file: path.join(__dirname, 'banner.txt')，
  encoding: 'utf-8' // default is utf-8
})
```

## 공식 저장소

[yingye/rollup-plugin-banner: Rollup plugin to append content before js bundle.](https://github.com/yingye/rollup-plugin-banner)
