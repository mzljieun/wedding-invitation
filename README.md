# 승훈 · 지은 모바일 청첩장

GitHub Pages에 공개할 모바일 청첩장입니다.

- [설계문서 목차](docs/design.md)
- [프로젝트 작업 규칙](AGENTS.md)

현재는 기존 준비 페이지를 기준으로 React 전환을 준비하고 있습니다. 개발은 `develop`에서 진행하며 공개 페이지는 `main`이 관리합니다.

## 로컬 실행

Node.js 24와 npm을 사용할 수 있는 터미널에서 실행합니다.

```sh
npm ci
npm run dev
```

`npm ci`는 `package-lock.json`에 기록된 버전으로 설치합니다. `npm run dev`를 실행한 뒤 터미널에 표시되는 `/wedding-invitation/` 주소를 엽니다. `npm run build`는 배포 파일을 `dist/`에 만들고, `npm run preview`는 그 결과를 로컬에서 제공합니다.

개발 서버 주소 뒤에 `?preview=cover`를 붙이면 청첩장 표지, 초대 문구, 예식 일정, 사진 갤러리를 볼 수 있습니다. 일반 주소에는 준비 화면이 표시되며, 청첩장 미리보기는 배포용 빌드에 포함되지 않습니다.
