import { render } from '@testing-library/react';
import App from "./App";







/** Tests in ImageCarusel.test.js */







test("Testing works!", () => {
  const { getByText } = render(<App />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
 // expect(getByText(/Your code/i)).toBeInTheDocument();
});

