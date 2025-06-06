import debounce from "../utils/debounce";

jest.useFakeTimers();

describe("debounce", () => {
  it("calls function after delay", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toBeCalled();
  });
});
