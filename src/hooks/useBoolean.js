import { useRef, useState } from "react";

const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useRef({
    toggle: () => setValue((b) => !b),
    on: () => setValue(true),
    off: () => setValue(false),
  });

  return [value, updateValue.current];
};
export default useBoolean;
