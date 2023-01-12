import { KeyLIEvent } from "../components/type/type";
import { setStateString } from "../components/type/type";

export const useTabIndex = () => {
  // tabIndex logic
  const focusListSearch = (
    e: KeyboardEvent,
    focusItem: string,
    setSearchWord: setStateString
  ) => {
    if (e.code === "Enter") {
      setSearchWord(focusItem);
      document.getElementById("searchList")?.blur();
      document.getElementById("searchInput")?.focus();
    }
  };

  // tabIndex ArrowKey contral
  const focusContralArrow = (
    e: KeyLIEvent,
    index: number,
    listLength: number
  ) => {
    document.getElementById(`searchList${index}`)?.blur();
    if (e.code === "ArrowDown") {
      if (index === listLength - 1) {
        document.getElementById(`searchList${listLength - 1}`)?.focus();
      } else {
        document.getElementById(`searchList${index + 1}`)?.focus();
      }
    } else if (e.code === "ArrowUp") {
      if (index === 0) {
        document.getElementById(`searchList${0}`)?.focus();
      } else {
        document.getElementById(`searchList${index - 1}`)?.focus();
      }
    }
  };

  return { focusContralArrow, focusListSearch };
};
