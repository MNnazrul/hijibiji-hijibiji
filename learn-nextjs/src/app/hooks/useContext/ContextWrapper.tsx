import { ThemeProvider } from "./ThemeContext";

function WrapContext({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default WrapContext;
