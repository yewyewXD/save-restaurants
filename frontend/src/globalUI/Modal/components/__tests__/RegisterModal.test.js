import { render, screen } from "@testing-library/react";
import HeroSection from "../../../../pages/Home/components/HeroSection";
// import RegisterModal from '../RegisterModal';

test("should render register button on hero section", () => {
  render(<HeroSection />);
  const registerButton = screen.getByTestId("register-btn");
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.textContent.toLowerCase()).toBe("register");
});
