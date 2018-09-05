import { delBlank } from '../src/utils'

describe('delBlank', () => {
  it('delBlank should delete needless blank', () => {
    expect(delBlank('l   ea rner ')).toBe('l ea rner')
  })
})
