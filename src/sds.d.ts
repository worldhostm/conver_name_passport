// SDS 원본 src/index.d.ts: style 객체에 CSS 커스텀 프로퍼티(--foo)를 쓸 수 있게 한다.
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
