// __tests__/Adminmain.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Adminmain from "../Components/Pages/admin panel/main_admin";

// 🔹 Mock layout components
jest.mock("../Components/Pages/admin panel/admin_elements/sildebar", () => () => <aside>Mock Sidebar</aside>);
jest.mock("../Components/Pages/admin panel/admin_elements/header", () => () => <header>Mock Header</header>);
jest.mock("../Components/Pages/admin panel/admin_elements/Breadcrumb", () => () => <nav>Mock Breadcrumb</nav>);

// 🔹 Mock pages
jest.mock("../Components/Pages/admin panel/dashboard/dashboard", () => () => <div>Mock Dashboard</div>);
jest.mock("../Components/Pages/admin panel/users/Users", () => () => <div>Mock Users</div>);
jest.mock("../Components/Pages/admin panel/request/request", () => () => <div>Mock Request</div>);
jest.mock("../Components/Pages/admin panel/projects/ListProject", () => () => <div>Mock Projects</div>);
jest.mock("../Components/Pages/admin panel/eventCalendar/ListEventCalendar", () => () => <div>Mock EventCalendar</div>);
jest.mock("../Components/Pages/admin panel/newsletter/Newsletters", () => () => <div>Mock Newsletters</div>);
jest.mock("../Components/Pages/admin panel/learninghub/LearningHub", () => () => <div>Mock LearningHub</div>);
jest.mock("../Components/Pages/admin panel/eventvolunteer/EventVolunteer", () => () => <div>Mock EventVolunteer</div>);
jest.mock("../Components/Pages/admin panel/products/ListProducts", () => () => <div>Mock Products</div>);
jest.mock("../Components/Pages/admin panel/orders/Orders", () => () => <div>Mock Orders</div>);
jest.mock("../Components/Pages/admin panel/donation/Donation", () => () => <div>Mock Donation</div>);
jest.mock("../Components/Pages/admin panel/manageabout/ManageAbout", () => () => <div>Mock ManageAbout</div>);
jest.mock("../Components/Pages/admin panel/admin_elements/AccountManagement", () => () => <div>Mock AccountManagement</div>);
jest.mock("../Components/Pages/admin panel/manage-executive-members/ManageExecutiveMembers", () => () => <div>Mock ManageExecutiveMembers</div>);

describe("Adminmain", () => {
  test("renders layout with Sidebar, Header, and Breadcrumb", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Adminmain />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Mock Breadcrumb")).toBeInTheDocument();
  });

  test("renders Dashboard on root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Adminmain />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Dashboard")).toBeInTheDocument();
  });

  test("renders Users page when navigating to /users", () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <Adminmain />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Users")).toBeInTheDocument();
  });

  test("renders Projects page when navigating to /projects", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Adminmain />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Projects")).toBeInTheDocument();
  });

  test("redirects unknown routes to /admin (but no dashboard route exists)", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <Adminmain />
      </MemoryRouter>
    );

    // Layout is still there
    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock Header")).toBeInTheDocument();

    // Dashboard is NOT rendered because /admin route is missing
    expect(screen.queryByText("Mock Dashboard")).not.toBeInTheDocument();
  });

  test("renders ManageExecutiveMembers page", () => {
    render(
      <MemoryRouter initialEntries={["/manage-executive-members"]}>
        <Adminmain />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock ManageExecutiveMembers")).toBeInTheDocument();
  });
});
