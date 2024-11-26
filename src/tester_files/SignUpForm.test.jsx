import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../components/sign-up/SignUpForm.jsx";

// Mock the `fetch` API globally
global.fetch = jest.fn();

describe("SignUpForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );

  test("renders correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("GMU Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Send Verification Code")).toBeInTheDocument();
  });

  test("shows an error when invalid email is entered", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid @gmu.edu email address.")
      ).toBeInTheDocument();
    });
  });

  test("shows an error when passwords do not match", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
  });

  test("sends verification code successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Verification email sent." }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(
        screen.getByText("Verification email sent. Please check your inbox.")
      ).toBeInTheDocument();
    });
  });

  test("handles verification code submission successfully", async () => {
    // Mock email verification check
    global.fetch = jest.fn((url) => {
      if (url.endsWith("/verify-code")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              message: "Email verified successfully!",
            }),
        });
      }
      // Add mocks for other endpoints if necessary
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(
        screen.getByText("Verification email sent. Please check your inbox.")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Verification Code"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Verify Code"));

    await waitFor(() => {
      expect(screen.getByText("Email verified successfully!")).toBeInTheDocument();
    });
  });

  test("shows error when email is already registered", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({ message: "Email is already registered." }),
      });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(
        screen.getByText("Verification email sent. Please check your inbox.")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter Verification Code"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Verify Code"));

    await waitFor(() => {
      expect(screen.getByText("Email is already registered.")).toBeInTheDocument();
    });
  });

  test("handles server errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Server not reachable"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), {
      target: { value: "user@gmu.edu" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Send Verification Code"));

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred. Please try again.1")
      ).toBeInTheDocument();
    });
  });
});