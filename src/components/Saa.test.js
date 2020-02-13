import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Saa from './Saa';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
    act(() => {
        render(<Saa></Saa>, container)
    });
});

//idis survoa fetchiin mockdataa ja kokeilla toimintaa ilman pääsy openweatheriin mutta...
//saada jotenkin kutsuttua tota searchWeather functionii, ku ei suostu settaa suoraan stateen...
xit("renders weather data", async () => {
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
      console.log(fakeData)
    await act(async () => {
      render(<Saa  />, container);
     
    });
    expect(container.querySelector("[data-testid='tempTest']").textContent).toEqual("Temperature: " + fakeData.temp);
    expect(container.querySelector("[data-testid='weatTest']").textContent).toBe("Weather: " + fakeData.weat);
    expect(container.querySelector("[data-testid='cityTest']").textContent).toContain(fakeData.city);
    global.fetch.mockRestore();
  });