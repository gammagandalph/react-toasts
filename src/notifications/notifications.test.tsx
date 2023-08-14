import { act, configure, fireEvent, render, renderHook, screen } from "@testing-library/react";
import useToast, { ToastProvider } from "./notificationContext";
import { ReactElement } from "react";

configure({ testIdAttribute: "id" });

function renderToaster() {
  const toastProviderWrapper = ({ children }: { children: ReactElement }) => (
    <ToastProvider>{children}</ToastProvider>
  );

  const { result } = renderHook(() => useToast(), { wrapper: toastProviderWrapper });

  return render(
    <div>
      <button
        onClick={() => result.current.addToast({ message: "message", severity: "info" })}
      >
        info
      </button>
    </div>
  );
}

test("toast is rendered", () => {
  renderToaster();

  const infoButton = screen.getByText("info");
  fireEvent.click(infoButton);

  expect(screen.getByText("message")).toBeInTheDocument();
});

test("toast is removed from DOM after default timeout", () => {
  jest.useFakeTimers();
  renderToaster();

  const infoButton = screen.getByText("info");
  fireEvent.click(infoButton);

  const messageElement = screen.getByText("message");

  act(() => jest.runAllTimers());

  expect(messageElement).not.toBeInTheDocument();
});

test("toast is removed from DOM after dismissal click", () => {
  renderToaster();

  const infoButton = screen.getByText("info");
  fireEvent.click(infoButton);

  const messageElement = screen.getByText("message");
  const removeButton = screen.getByTestId("removeButton");

  act(() => removeButton.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  expect(messageElement).not.toBeInTheDocument();
});
