import { cleanup, fireEvent, render } from "@testing-library/react";
import { FC } from "react";
import { RateContext, RateContextProvider } from "./rateContext";

describe("Rate Context", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        cleanup();
    })

    const TestConsumer:FC = () => 
        <RateContextProvider>
            <RateContext.Consumer>
                { ({ratings, recentRatings, rateMovie}) => (
                <>
                    <span>{`All: ${JSON.stringify(ratings)}`}</span>
                    <span>{`Recent: ${JSON.stringify(recentRatings)}`}</span>
                    <button onClick={() => rateMovie(767, 4)}>Rate</button>
                </>
                )}
            </RateContext.Consumer>
        </RateContextProvider>

    it("reacts to rating a movie", () => {
        const { getByText } = render(<TestConsumer />);
        fireEvent.click(getByText("Rate"));

        expect(getByText('All: {"767":4}')).toBeTruthy();
    });

    it("saves and loads ratings from localStorage", () => {
        {
            const { getByText } = render(<TestConsumer />);
            fireEvent.click(getByText("Rate"));
            expect(getByText('All: {"767":4}')).toBeTruthy();
            cleanup();
        }

        const { getByText } = render(<TestConsumer />);
        expect(getByText('All: {"767":4}')).toBeTruthy();
    });

    it("stores recently Rated as long a context exists", () => {
        {
            const { getByText } = render(<TestConsumer />);
            fireEvent.click(getByText("Rate"));
            expect(getByText('Recent: {"767":4}')).toBeTruthy();
            cleanup();
        }

        const { getByText } = render(<TestConsumer />);
        expect(getByText('Recent: {}')).toBeTruthy();
    })
});