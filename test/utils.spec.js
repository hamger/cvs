import { int } from '../src/utils'

describe('int', () => {
  it('int should return integer', () => {
    expect(int(2.56)).toBe(3)
  })
})
