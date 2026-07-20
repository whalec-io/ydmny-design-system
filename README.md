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
- `PageHeader`, `Typography`

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
@import "@ydmnypg/design-system/theme.css";
@source "../node_modules/@ydmnypg/design-system/dist";
```

## 테마

패키지는 기본 테마를 제공합니다. 앱의 CSS에서 `--ydmnypg-*` 변수를 재정의하면 모든 디자인 시스템 컴포넌트에 적용됩니다.

```css
:root {
  --ydmnypg-color-primary: #7c3aed;
  --ydmnypg-color-primary-hover: #6d28d9;
  --ydmnypg-color-text-primary: #111827;
  --ydmnypg-font-size-page-title: 20px;
  --ydmnypg-radius-md: 8px;
}
```

색상, 타이포그래피, radius의 기본 토큰 전체 목록은 `@ydmnypg/design-system/theme.css`에서 확인할 수 있습니다.

Button의 글자 크기는 크기 옵션과 관계없이 `--ydmnypg-font-size-button` 토큰을 사용하며 기본값은 `13px`입니다.

기본 theme color는 `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `inverse`입니다. 각 색상은 `--ydmnypg-color-{themeColor}`, `-hover`, `-subtle` 토큰으로 재정의할 수 있습니다.

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

## Button

새 Button API는 `themeColor`, `fillMode`, `size`, `rounded`를 조합합니다.

```tsx
<Button themeColor="primary">저장</Button>
<Button themeColor="success" fillMode="outline" size="large">
  승인
</Button>
<Button themeColor="error" fillMode="link" rounded="full" size="small">
  삭제
</Button>
```

- `themeColor`: `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `inverse`
- `fillMode`: `solid` (기본), `flat`, `outline`, `clear`, `link`
- `size`: `small`, `medium` (기본), `large`
- `rounded`: `small`, `medium` (기본), `large`, `full`

기존 `variant="primary|secondary|ghost|danger"`, `size="sm|md"` 사용도 계속 지원합니다. 기존 prop만 사용하거나 prop을 생략하면 이전 Button 스타일이 유지됩니다.

## 타이포그래피

의미 기반 `Typography` variant로 폰트 크기와 행간을 일관되게 적용합니다. 색상과 여백은 `className`으로 지정합니다.

```tsx
import { Typography } from "@ydmnypg/design-system";

<Typography as="h1" variant="page-title" className="text-gray-800">
  페이지 제목
</Typography>;

<Typography variant="description" className="text-gray-500">
  제목을 보완하는 설명입니다.
</Typography>;
```

지원 variant: `page-title` (18px), `section-title` (16px), `body` (14px), `description` (13px), `caption` (12px).

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
