import { MoreThan25Pipe } from './moreThan25.pipe';

describe('MoreThan25Pipe', () => {
  it('create an instance', () => {
    const pipe = new MoreThan25Pipe();
    expect(pipe).toBeTruthy();
  });
});
