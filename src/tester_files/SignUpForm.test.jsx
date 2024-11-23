import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

describe("SignUpForm Component", () => {
  it("renders the signup form", () => {
    render(<SignUpForm />);

    // Check for form elements
    expect(screen.getByPlaceholderText("GMU Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Send Verification Code")).toBeInTheDocument();
  });

  it("validates email and password inputs", async () => {
    render(<SignUpForm />);

    // Enter invalid email and click submit
    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), { target: { value: "invalid_email" } });
    fireEvent.click(screen.getByText("Send Verification Code"));

    // Check error message
    expect(await screen.findByText("Please enter a valid @gmu.edu email address.")).toBeInTheDocument();
  });

  it("submits valid email and passwords", async () => {
    render(<SignUpForm />);

    // Enter valid email and passwords
    fireEvent.change(screen.getByPlaceholderText("GMU Email Address"), { target: { value: "test@gmu.edu" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Strong@123" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "Strong@123" } });
    fireEvent.click(screen.getByText("Send Verification Code"));

    // Mock successful response
    await waitFor(() => expect(screen.getByText("Verification email sent. Please check your inbox.")).toBeInTheDocument());
  });
});
