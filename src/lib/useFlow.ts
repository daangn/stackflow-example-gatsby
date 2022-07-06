import { useActions } from '@stackflow/react'
import { startTransition, useCallback, useMemo } from 'react'
import { TypeActivities } from '../stackflow'

export function useFlow() {
  const { push: _push, pop: _pop, replace } = useActions<TypeActivities>()

  const push: typeof _push = useCallback((...args) => {
    startTransition(() => {
      _push(...args)
    })
  }, [_push])

  const pop: typeof _pop = useCallback((...args) => {
    startTransition(() => {
      _pop(...args)
    })
  }, [_pop])

  return useMemo(() => ({
    push,
    pop,
    replace,
  }), [push, pop, replace])
}
