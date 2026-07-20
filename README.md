# @ydmnypg/design-system

StudioYS 웹 앱에서 공통으로 사용하는 React/Tailwind UI 컴포넌트 패키지입니다.

## 요구 사항

- React 18 또는 19
- React DOM 18 또는 19
- Tailwind CSS 4

## 포함 컴포넌트

- `Button`, `IconButton`
- `Input`, `Textarea`, `Select`, `Checkbox`, `Field`
- `Card`, `SummaryCard`, `Badge`, `Section`
- `Dialog`
- `DataTable`
- `PageHeader`

## 설치

```bash
npm install @ydmnypg/design-system
```

React와 React DOM은 앱 프로젝트에서 직접 설치합니다.

```json
{
  "dependencies": {
    "@ydmnypg/design-system": "^0.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

## Tailwind 설정

이 패키지는 Tailwind class를 포함한 React 컴포넌트를 제공합니다. 앱 프로젝트의 CSS 엔트리 파일에 패키지 빌드 산출물을 source로 추가해야 합니다.

```css
@import "tailwindcss";
@source "../node_modules/@ydmnypg/design-system/dist";
```

## 사용법

```tsx
import { Button, Field, Input, Section } from "@ydmnypg/design-system";

export function ExampleForm() {
  return (
    <Section title="기본 정보">
      <Field label="이름" required>
        <Input placeholder="이름을 입력하세요" />
      </Field>
      <Button variant="primary">저장</Button>
    </Section>
  );
}
```

업무 화면의 페이지 제목과 설명, 주요 액션은 `PageHeader`로 구성합니다.

```tsx
<PageHeader title="계정 관리" description="관리자와 매니저 계정을 관리합니다.">
  <Button variant="primary">계정 등록</Button>
</PageHeader>
```

버튼과 폼 컨트롤은 관리 화면의 정보 밀도를 고려한 compact 타이포그래피를 기본값으로 사용하며, 클릭 영역 높이는 유지합니다.

공개 타입도 함께 제공합니다.

```tsx
import type { BadgeTone } from "@ydmnypg/design-system";

const tone: BadgeTone = "green";
```

## 로컬 개발

배포 전 로컬 앱에서 확인할 때는 앱 프로젝트의 `package.json`에 file dependency로 연결할 수 있습니다.

```json
"@ydmnypg/design-system": "file:../../packages/design-system"
```

로컬 패키지를 수정한 뒤에는 빌드 산출물을 갱신합니다.

```bash
npm run build
```

## 배포

배포 전에 포맷, 빌드, 패키징 구성을 확인합니다.

```bash
npm run format:check
npm run build
npm pack --dry-run
```

문제가 없으면 npm에 배포합니다. scoped public package이므로 첫 배포와 이후 배포 모두 `--access public`을 사용합니다.

```bash
npm login
npm version patch
npm publish --access public
```

## TypeScript 호환성

생성되는 declaration file은 `import * as React from "react"` 형태를 사용합니다. 따라서 소비 프로젝트가 `esModuleInterop`을 켜지 않아도 React 타입 import 문제 없이 사용할 수 있습니다.
