"use client";

import { useMemo, useSyncExternalStore } from "react";

const breakpoints = {
  mobile: 375,
  tablet: 600,
  desktop: 1024,
};

// SDS 원본과의 차이: Next.js 서버 렌더링에서는 matchMedia가 없으므로
// 구독 없이 false를 돌려주고, 클라이언트에서 실제 값으로 바뀐다(getServerSnapshot).
export function useCustomMediaQuery(mediaQuery: string): boolean {
  const [subscribe, getSnapshot] = useMemo(() => {
    const mediaQueryList =
      typeof globalThis.matchMedia === "function" ? globalThis.matchMedia(mediaQuery) : null;

    function subscribe(onStoreChange: () => void) {
      if (!mediaQueryList) return () => {};
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    }

    const getSnapshot = () => mediaQueryList?.matches ?? false;

    return [subscribe, getSnapshot];
  }, [mediaQuery]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const useMediaQuery = () => {
  const isMobile = useCustomMediaQuery(
    `(max-width: ${breakpoints.tablet - 1}px)`,
  );
  const isTablet = useCustomMediaQuery(
    `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  );
  const isDesktop = useCustomMediaQuery(
    `(min-width: ${breakpoints.desktop}px)`,
  );
  const isTabletUp = useCustomMediaQuery(
    `(min-width: ${breakpoints.tablet}px)`,
  );
  const isTabletDown = useCustomMediaQuery(
    `(max-width: ${breakpoints.desktop - 1}px)`,
  );

  const matches = useMemo(() => {
    return {
      isMobile,
      isTablet,
      isDesktop,
      isTabletUp,
      isTabletDown,
    };
  }, [isMobile, isTablet, isDesktop, isTabletUp, isTabletDown]);

  return matches;
};
