import { render, screen, cleanup } from "@testing-library/react";
import HeroSection from "../../../../pages/Home/components/HeroSection";
// import RegisterModal from '../RegisterModal';

afterEach(() => {
  cleanup();
});

test("should render register button on hero section", () => {
  render(<HeroSection />);
  const registerButton = screen.getByTestId("register-btn");
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.textContent.toLowerCase()).toBe("register");
});
