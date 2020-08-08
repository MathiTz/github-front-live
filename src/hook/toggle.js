import React, { useState } from 'react';

export default function useToggle(initial) {
  const [value, setInitial] = useState(initial);
  return [value, () => setInitial(!value)];
}
