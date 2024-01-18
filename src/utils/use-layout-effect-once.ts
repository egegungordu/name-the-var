import { EffectCallback, useLayoutEffect } from 'react';

export default function useLayoutEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, []);
};
