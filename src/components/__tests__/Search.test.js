import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Body from "../Body";
import { Provider } from "react-redux";
import store from "../../utils/store"
import { StaticRouter } from "react-router-dom/server"
import { RESTAURANT_DATA } from "../mocks/data";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json : () => {
            return Promise.resolve(RESTAURANT_DATA)
        },
    });
});

test("Shimmer should load on Homepage", () => {
    const body = render(
        <StaticRouter>
            <Provider store={store}>
                <Body />
            </Provider>
        </StaticRouter>
    );
    
    const shimmer = body.getByTestId("shimmer");
    expect(shimmer.children.length).toBe(20);
    // console.log(shimmer);
    // console.log(body);
});

test("Restaurants should load on Homepage", async () => {
    const body = render(
        <StaticRouter>
            <Provider store={store}>
                <Body />
            </Provider>
        </StaticRouter>
    );
    
    await waitFor(() => expect(body.getByTestId("search-btn")));

    const resList = body.getByTestId("res-list");
    expect(resList.children.length).toBe(20);

});

test("Search string(food) on Homepage", async () => {
    const body = render(
        <StaticRouter>
            <Provider store={store}>
                <Body />
            </Provider>
        </StaticRouter>
    );
    
    await waitFor(() => expect(body.getByTestId("search-btn")));

    const searchInput = body.getByTestId("search-input");
    fireEvent.change(searchInput, {
        target: {
            value: "biryani",
        },
    });
    
    const searchBtn = body.getByTestId("search-btn");
    fireEvent.click(searchBtn);

    const resList = body.getByTestId("res-list");
    expect(resList.children.length).toBe(3);
});