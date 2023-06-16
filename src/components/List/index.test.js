import { render, screen } from "@testing-library/react";
import List from ".";

describe("[Component : List]", () => {
  it("should render the list provided", () => {
    const data = {
      id: "2",
      name: "New Employee Onboarding",
      children: [
        {
          id: "8",
          name: "Onboarding Materials",
        },
        {
          id: "9",
          name: "Training",
        },
      ],
    };

    render(<List data={data} />);

    expect(screen.getByText("New Employee Onboarding")).toBeInTheDocument();
    expect(screen.getByText("Onboarding Materials")).toBeInTheDocument();
    expect(screen.getByText("Training")).toBeInTheDocument();
  });

  it("should not render anything when data is empty", () => {
    const data = {
      id: "2",
      name: "New Employee Onboarding",
    };
    render(<List data={data} />);

    expect(screen.getByText("New Employee Onboarding")).toBeInTheDocument();
    expect(screen.queryByText("Onboarding Materials")).not.toBeInTheDocument();
    expect(screen.queryByText("Training")).not.toBeInTheDocument();
  });

  it("should render nested childrens", () => {
    const data = {
      id: "3",
      name: "Office Events",
      children: [
        {
          id: "6",
          name: "2018",
          children: [
            {
              id: "10",
              name: "Summer Picnic",
            },
            {
              id: "11",
              name: "Valentine's Day Party",
            },
            {
              id: "12",
              name: "New Year's Party",
            },
          ],
        },
        {
          id: "7",
          name: "2017",
          children: [
            {
              id: "13",
              name: "Company Anniversary Celebration",
            },
          ],
        },
      ],
    };
    render(<List data={data} />);

    expect(screen.getByText("Summer Picnic")).toBeInTheDocument();
  });
});
