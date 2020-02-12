import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Saa from './Saa';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
    act(() => {
        render(<Saa></Saa>, container)
    });
});

it("renders weather data", async () => {
    const fakeData = {
      temp: "25.0",
      weat: "Always Sunny",
      icon: "picture",
      city: 'Helsinki'
    };
  
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Saa />, container);
    });
  
    expect(container.textContent).toBe(fakeData.temp);
    expect(container.textContent).toBe(fakeData.weat);
    expect(container.textContent).toContain(fakeData.city);
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });