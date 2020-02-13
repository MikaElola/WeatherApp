import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CityList from './CityList';

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

it("renders userList data", () => {
    const fakeData = [{
      temp: "25.0",
      weat: "Always Sunny",
      icon: "picture",
      city: 'Helsinki'
    }];
  

    act( () => {
      render(<CityList userList={fakeData} />, container);
    });
  
    expect(container.querySelector("[data-testid='tempTest']").textContent).toContain(fakeData[0].temp);
    expect(container.querySelector("[data-testid='cityTest']").textContent).toContain(fakeData[0].city);
  });
