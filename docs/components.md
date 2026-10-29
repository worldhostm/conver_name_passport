# SDS 컴포넌트 목록

figma/sds(Simple Design System)에서 옮긴 컴포넌트와 props. 원본 규칙은 `docs/sds-agents.md`.
import 별칭은 `tsconfig.json`의 `paths`에 정의한다: `layout`, `primitives`, `compositions`, `icons`, `utils`, `hooks`.

- 스타일 진입점: `src/sds.css`(reset, responsive, theme, icons, `--global-*`). `app/layout.tsx`에서 `globals.css`보다 먼저 import.
- primitives·utils·hooks·Card는 모두 `"use client"`. layout(Flex, Grid, Section)은 서버 컴포넌트에서도 쓸 수 있다.
- 공통 표기: "+ div props"는 해당 HTML 요소의 모든 속성을 그대로 받는다는 뜻. "RAC"는 react-aria-components.

## layout (`src/ui/layout`)

| 컴포넌트 | props | 기본값 |
| --- | --- | --- |
| `Flex` | `alignPrimary`, `alignSecondary`: `start` \| `end` \| `center` \| `stretch` \| `space-between` · `direction`: `row` \| `row-reverse` \| `column` \| `column-reverse` · `gap`: `100`~`1600` 토큰 · `type`: `quarter` \| `third` \| `half` \| `auto` · `container?: boolean` · `wrap?: boolean` + div props | align `start`, direction `row`, type `auto` |
| `FlexItem` | `size?`: `full` \| `major` \| `minor` \| `half` \| `fill` · `className`, `children` (다른 div props는 무시됨, 원본 동작) | – |
| `Grid` | `columns?`, `rows?`: CSS 문자열 · `gap`, `columnGap`, `rowGap`: `100`~`1600` · `flow?`: `row` \| `column` \| `row dense` \| `column dense` · `container?` · `justifyItems`, `alignItems`: `start` \| `end` \| `center` \| `stretch` + div props | columns/rows `none`, justify/align `stretch` |
| `GridItem` | `column?`, `row?`, `area?`: CSS grid 값 + div props | – |
| `Section` | `elementType?`: `section` \| `header` \| `footer` · `padding`, `paddingTop?`, `paddingBottom?`: `600` \| `800` \| `1200` \| `1600` \| `4000` · `variant?`: `brand` \| `neutral` \| `stroke` \| `subtle` \| `image` · `src`(variant가 `image`일 때 필수) + 요소 props | elementType `section`, padding `600`, variant `subtle` |

## primitives (`src/ui/primitives`) — 요청한 7종

| 컴포넌트 | props | 비고 |
| --- | --- | --- |
| `Button` | `size?`: `small` \| `medium` · `variant?`: `primary` \| `neutral` \| `subtle` · `type?` · `href?` + RAC `Button` props(`onPress`, `isDisabled`, …) 또는 `href`가 있으면 RAC `Link` props | `href`가 있으면 `<a>`로 렌더 |
| `ButtonDanger` | `Button`과 같고 `variant?`: `danger-primary` \| `danger-subtle` | 파괴적 동작 전용 |
| `ButtonGroup` | `align?`: `start` \| `end` \| `center` \| `justify` \| `stack` + div props | |
| `Input` | RAC `Input` props(`placeholder`, `type`, `value`, `onChange`, …) | `RACTextField` 안에서 쓰거나 단독 사용 |
| `InputField` | `label?`, `description?`, `placeholder?`, `errorMessage?: string \| (validation) => string` + RAC `TextField` props(`value`, `onChange`, `isRequired`, `isInvalid`, `isDisabled`, `name`, …) | Label/Description/FieldError 포함 |
| `Text`, `TextSmall`, `TextSmallStrong` | `elementType?` · `lineHeight?`: `body` \| `single` · `lineClamp?: number` + RAC `Text` props | 기본 요소 p / small / small |
| `TextStrong`, `TextTitleHero`, `TextTitlePage`, `TextSubtitle`, `TextHeading`, `TextSubheading` | `elementType?` · `lineClamp?` + RAC `Text` props | 기본 요소 strong / h1 / h2 / p / h3 / p |
| `TextEmphasis`, `TextCode`, `TextInput` | `elementType?` + RAC `Text` props | |
| `TextLink` | `href`(필수) + a props | 내부적으로 `Link` |
| `TextPrice` | `currency`, `price`(둘 다 필수) · `label?` · `size?`: `small` \| `large` | size `large` |
| `TextList` | `title?: ReactNode` · `density?`: `default` \| `tight` + ul props | |
| `TextListItem` | li props | |
| `TextLinkList` | `TextList`와 동일 | |
| `TextContentHeading` | `heading`(필수), `subheading?` · `align?`: `start` \| `center` + div props | |
| `TextContentTitle` | `title`(필수), `subtitle?` · `align?` + div props | 모바일에선 TitlePage, 그 외 TitleHero(`useMediaQuery`) |
| `Tag` | `scheme?`: `brand` \| `danger` \| `positive` \| `warning` \| `neutral` · `variant?`: `primary` \| `secondary` · `onRemove?: (e: PressEvent) => void` + span props | onRemove가 있으면 X 버튼 표시 |
| `TagButton` | `scheme?`, `variant?` + `AnchorOrButtonProps` | 클릭 가능한 태그 |
| `TagToggle` | `iconStart?` · `textValue?` · `id` + RAC `Tag` props | `TagToggleList` 안에서 사용 |
| `TagToggleGroup` | RAC `TagGroup` props(`selectionMode`, `selectedKeys`, `defaultSelectedKeys`, `onSelectionChange`, `disallowEmptySelection`, …) | 자식으로 `Label` + `TagToggleList` |
| `TagToggleList` | RAC `TagList` props(`items`, `children`) | |
| `Accordion` | RAC `DisclosureGroup` props(`allowsMultipleExpanded`, `expandedKeys`, `defaultExpandedKeys`, `onExpandedChange`) | |
| `AccordionItem` | `title: string`(필수) · `id?` · `children` + RAC `Disclosure` props | 펼침 아이콘 `IconChevronDown`. 원본이 `isExpanded`, `isDisabled`를 받아서 버리므로 현재 효과 없음(SDS 버그, 그대로 둠) |
| `Tabs` | RAC `Tabs` props(`selectedKey`, `defaultSelectedKey`, `onSelectionChange`, `orientation`, `keyboardActivation`) | |
| `TabList` | RAC `TabList` props(`items`, `children`, `aria-label`) | |
| `Tab` | RAC `Tab` props(`id`, `isDisabled`, `href`) | |
| `TabPanel` | RAC `TabPanel` props(`id`) | |
| `Notification` | `variant?`: `message` \| `alert` · `icon?: ReactNode` · `isDismissible?: boolean` + div props | 닫기 버튼은 그려지지만 핸들러가 없음(원본 TODO) |

## primitives — 의존성으로 함께 옮긴 것

요청 목록에는 없지만 위 컴포넌트가 import하기 때문에 옮겼다.

| 컴포넌트 | 필요한 이유 | props |
| --- | --- | --- |
| `Fieldset`, `Legend`, `FieldGroup`, `Form`, `Field`, `Label`, `Description`, `FieldError`, `Keyboard`, `SharedFieldProps`(타입), `formEventTargetToFormData` | `InputField`가 Label/Description/FieldError/SharedFieldProps 사용 | `Form`: RAC `Form` props + `singleLine?` · `Label`: RAC `Label` props · `Description`, `Keyboard`: RAC `Text` props · `FieldError`: RAC `FieldError` props · 나머지는 해당 HTML 요소 props |
| `Icon` | 모든 아이콘의 기반 | `size?`: `14` \| `16` \| `20` \| `24` \| `32` \| `40` \| `48` · `className?` · `children` |
| `IconButton`, `DestructiveIconButton` | `Notification` 닫기 버튼 | `Button`/`ButtonDanger` props + `aria-label`(필수) |
| `Image`, `Picture`, `PictureSource` | `layout/Section`의 `variant="image"` | `Image`: `alt`(필수) · `src?` · `aspectRatio?`: `1-1` \| `16-9` \| `4-3` \| `fill` \| `natural` · `size?`: `small` \| `medium` \| `large` \| `fill` \| `natural` · `variant?`: `default` \| `rounded` + img props |
| `Link` | `TextLink` | `href`(필수) + a props |

## icons (`src/ui/icons`)

원본 280여 개 중 3개만 옮겼다. 모두 `IconProps`(`size?`, `className?`)를 받는다.

| 아이콘 | 사용처 |
| --- | --- |
| `IconChevronDown` | `AccordionItem` |
| `IconX` | `Tag` 삭제 버튼, `Notification` 닫기 |
| `IconShoppingBag` | `ProductPurchaseSection` |

## utils / hooks

| 이름 | 내용 |
| --- | --- |
| `AnchorOrButton` (`utils`) | `href`가 있으면 RAC `Link`, 없으면 RAC `Button`. props: `AnchorOrButtonProps` |
| `useMediaQuery` (`hooks`) | `{ isMobile, isTablet, isDesktop, isTabletUp, isTabletDown }`. 서버 렌더링에서는 모두 `false`(Next.js용으로 `getServerSnapshot` 추가) |
| `useCustomMediaQuery(query)` | 임의 미디어 쿼리 매칭 여부 |

## compositions (`src/ui/compositions`)

| 컴포넌트 | props | 비고 |
| --- | --- | --- |
| `Card` | `align?`: `start` \| `center` \| `end` · `direction?`: `horizontal` \| `vertical` · `interactionProps?: AnchorOrButtonProps` · `asset?: ReactNode` · `padding?`: `600` \| `800` · `variant?`: `default` \| `stroke` \| `brand` + div props | 모바일에선 항상 vertical. `interactionProps`가 있으면 카드 전체가 눌림 |

원본 `Cards.tsx`의 `PricingCard`, `ProductInfoCard`, `ReviewCard`, `StatsCard`, `TestimonialCard`는 Avatar·Image·data 모듈 의존성 때문에 옮기지 않았다.

## examples (`src/examples/ProductDetails`)

원본 `examples/ProductDetails.tsx`를 섹션으로 나눈 것. 새 CSS는 없다.

| 컴포넌트 | props | 구성 |
| --- | --- | --- |
| `ProductDetails` | `product?: ProductDetailsData`(기본 `SAMPLE_PRODUCT`) · `onAdd?` | `Section` > `Flex(type="half")` > 이미지 + `FlexItem(half)` > 정보·구매·아코디언 |
| `ProductImageSection` | `src`, `alt` | `Image(size="large", aspectRatio="4-3")` |
| `ProductInfoSection` | `name`, `price`, `currency`, `promo?`, `description` | `TextHeading` + `Tag`, `TextPrice`, `Text` |
| `ProductPurchaseSection` | `colors: string[]`, `quantities: string[]`, `defaultColor?`, `defaultQuantity?`, `onAdd?({ color, quantity })` | `TagToggleGroup`(단일 선택) ×2 + `Button` + `IconShoppingBag`. 원본의 `SelectField`는 Select primitive를 옮기지 않아 대체 |
| `ProductDetailsAccordion` | `sections: { title; items[] }[]` | `Accordion` > `AccordionItem` > `TextList` |
| `ProductDetailsData`(타입) | `name`, `price`, `currency`, `promo?`, `description`, `imageUrl`, `imageAlt`, `colors`, `quantities`, `details` | |

## SDS 원본과 달라진 점

- `useMediaQuery`: 서버 렌더링 대응(`matchMedia` 없으면 false, `getServerSnapshot`).
- `IconButton`: 원본이 ref 객체를 `{...ref}`로 spread하던 버그를 `ref={ref}`로 수정.
- `icons/index.ts`: 사용 중인 3개만 export.
- `index.css` 대신 `src/sds.css`: body/h1/p 요소 스타일은 제외(앱 `globals.css`와 충돌).
- `Button`, `AnchorOrButton`: react-aria-components 1.22의 `render` prop 타입 차이 때문에 분기별 캐스팅 추가(동작 동일).
- 남은 lint 경고 5개(Section의 미사용 `variant`, AccordionItem의 미사용 `isExpanded`/`isDisabled`, Image의 `<img>`)는 원본 코드 그대로다.
