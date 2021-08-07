import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import HeroSection from "../../../../pages/Home/components/HeroSection";
import RegisterModal from "../RegisterModal";

afterEach(() => {
  cleanup();
});

test("should render register button on hero section", () => {
  render(<HeroSection />);
  const registerButton = screen.getByTestId("register-btn");
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.textContent.toLowerCase()).toBe("register");
});

test("register modal should appear after clicking register button", () => {
  render(<HeroSection />);
  render(<RegisterModal />);
  const registerButton = screen.getByTestId("register-btn");
  fireEvent.click(registerButton);
  const registerModal = screen.getByTestId("register-modal");
  expect(registerModal).toBeInTheDocument();
});
