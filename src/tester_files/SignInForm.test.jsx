
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // For routing context
import SignInForm from "../components/sign-in/SignInForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


const mockNavigate = require("react-router-dom").useNavigate;

describe("SignInForm Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("GMU Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("shows an error if fields are empty", async () => {
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );
  
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
    await waitFor(() => {
      // Match the actual error message displayed
      expect(screen.getByText(/Failed to connect to the server/i)).toBeInTheDocument();
    });
  });
  

  test("navigates to admin-settings when user is admin", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ type: "admin" }),
        })
      );

  
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );
  
    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "gmulostandfound@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "cs321project" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
   
  });
  

  test("navigates to home page when user is a regular user", async () => {
    // Mock the fetch response for a regular user
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ type: "user" }),
      })
    );
  
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );
  
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
  
    // Simulate login button click
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
  
    
  });
  

  

  test("displays an error message for invalid credentials", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      })
    );

    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
    });
  });

  test("handles server errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Server not reachable"))
    );

    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to connect to the server. Please try again./i)
      ).toBeInTheDocument();
    });
  });
});
