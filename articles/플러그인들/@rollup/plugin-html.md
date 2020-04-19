# @rollup/plugin-html

> Rollup 조직에서 자체 제작 및 관리하는 플러그인 입니다.

생성된 번들들을 포함하는 html 파일들을 생성합니다.

번들링된 결과물인 자바스크립트 파일과 css 파일들을 포함하는 html 파일들을 생성합니다.

## 간단 사용법

아래와 같이 아무런 인자 없이 사용 하더라도, 번들링의 결과물을 분석하여 `.js`와 `.css` 확장자를 가진 것들을 모두 포함하여 `html 파일`을 생성합니다.

`output.format` 속성이 `es` 혹은 `esm` 일 경우 생성되는 `script 태그`에 `type="module"` Attribute를 자동적으로 붙여줍니다.

```js
const html = require('@rollup/plugin-html');

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [html()],
};
```

## 옵션 객체

html 플러그인은 플러그인 함수의 인자로 옵션 객체를 받을 수 있습니다.

전달된 인자가 없을 경우 내부적으로 아래의 기본 설정 객체가 사용됩니다.

```js
const defaults = {
  attributes: {
    link: null,
    html: { lang: 'en' },
    script: null,
  },
  fileName: 'index.html',
  publicPath: '',
  template: defaultTemplate,
  title: 'Rollup Bundle',
};
```

### 옵션의 속성들

- attributes: `link`, `script`, `html` 태그에 대한 속성(Attributes) 정보를 담고 있는 객체입니다.
- attributes.link: `html 플러그인`은 `.css` 확장자를 가진 결과물들을 모두 `link 요소`들로 만들어 `head 요소` 내부에 삽입합니다. 이 `attributes.link` 속성에 객체를 할당하게 되면, 만들어지는 모든 `link 요소`들에 대해 `attributes.link 객체`의 `key`와 `value`를 그대로 HTML 요소의 `Attributes`로 변환하여 추가합니다.
- attributes.script: 위와 동일한 동작을 하지만, `.css` 파일들이 아닌 `.js` 파일들에 대해 `script 요소`로 변환한다는 차이점만 갖습니다. 생성된 `script 요소`들은 `attributes.script 객체`의 `key-value쌍` 을 그대로 갖는 `Attributes`를 포함합니다. 생성된 요소들은 모두 `body 요소`의 마지막 자식 요소로 포함됩니다.
- attributes.html: `html 요소`에 직접 추가될 `Attributes` 를 설정합니다. 해당 객체의 `key-value 쌍`을 그대로 추가합니다.
- fileName: 생성될 html 파일의 이름을 지정합니다.
- publicPath: 각 `link 요소`와 `script 요소`의 `src 속성` 앞 부분에 이 경로값을 덧붙입니다. 실제 경로상 위치와 외부에 공개되는 uri 상의 위치가 다를 경우 이 경로를 별도로 설정합니다.
- template: 렌더링 과정을 포함한 함수를 별도로 지정할 수 있습니다. 개인적인 생각이지만 굳이 이 것 까지 직접 작성하게되면 사실상 배보다 배꼽이 더 큰 경우가 되는 것 같습니다. 이 문서에서는 바로 다음 섹션에서 아주 간략하게만 다루도록 하겠습니다.
- title: 생성될 html 요소의 `title 요소`의 값을 지정합니다.

### template 함수

html 플러그인에서는 플러그인 사용자가 옵션 객체의 `template 속성`에 어떤 함수를 넘겨줌으로써, html 렌더링 과정을 직접 설정할 수 있습니다.

template 속성에 전달되는 함수는 아래와 같은 형태를 갖춰야 합니다.

```js
const template = ({ attributes, bundle, files, publicPath, title }) => { ... }
```

- attributes: 옵션 객체에 전달된 `attributes 속성`과 동일한 값을 갖습니다.
- bundle: 번들된 결과물에 대한 `AssetInfo` 혹은 `ChunkInfo` 객체를 갖습니다.
- files: 모든 `entry 파일`과 `asset 파일`들의 `AssetInfo` 또는 `ChunkInfo` 객체의 배열을 갖습니다.
- publicPath: 옵션 객체의 `publicPath` 옵션과 동일한 값입니다.
- title: 옵션 객체의 `title` 옵션과 동일한 값입니다.

기본값으로 아래와 같은 `defaultTemplate` 함수가 사용됩니다.

```js
const defaultTemplate = async ({ attributes, files, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join('\n');

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    ${links}
  </head>
  <body>
    ${scripts}
  </body>
</html>`;
};
```

여담이지만, 이 플러그인의 코드를 살펴보며 느낀점 중 아쉬웠던 점 하나가..
차라리 return 부분만 커스터마이징할 수 있는 형태였다면 더 좋았을텐데..라는 점이었습니다.

## 간단한 활용 예시

```js
// rollup.config.js
import html from '@rollup/plugin-html';
const isDevMode = true;

/** @type {import('rollup').RollupOptions} */
const option = {
  input: './src/sample3/index.js',
  output: {
    dir: './dist',
    format: 'esm',
  },

  plugins: [
    html({
      title: `영재의 웹페이지${isDevMode ? ' (개발모드)' : ''}`,
      attributes: {
        html: {
          lang: 'ko',
        },
      },
    }),
  ],
};

export default option;
```

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>영재의 웹페이지 (개발모드)</title>
  </head>
  <body>
    <script src="index.js" type="module"></script>
  </body>
</html>
```

## 공식 저장소

[plugins/packages/html at master · rollup/plugins](https://github.com/rollup/plugins/tree/master/packages/html)
