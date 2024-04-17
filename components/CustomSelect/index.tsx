import Select, {
  ActionMeta,
  DropdownIndicatorProps,
  MenuListProps,
  SelectOptionActionMeta,
  components,
} from "react-select";
import { ICustomSelect, IOpt } from "../../interfaces/props.interface";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { selectStyles } from "@/utils/select.styles.util";

export default function CustomSelect({
  options,
  placeholder,
  dropDownColor,
  onSelect,
  prefillId,
  loadMore,
  inProgress,
  isAsync,
  isError,
  showBtn,
  name,
}: ICustomSelect) {
  const [value, setValue] = useState<IOpt | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const DropdownIndicator = (props: DropdownIndicatorProps) => (
    <components.DropdownIndicator {...props}>
      {isMenuOpen ? (
        <FiChevronUp size={20} color={dropDownColor && dropDownColor} />
      ) : (
        <FiChevronDown size={20} color={dropDownColor && dropDownColor} />
      )}
    </components.DropdownIndicator>
  );

  const MenuList = (props: MenuListProps) => (
    <components.MenuList {...props}>
      {props.children}
      {isError ? (
        <p style={{ fontSize: "12px", textAlign: "center" }}>
          an error occurred
        </p>
      ) : inProgress ? (
        <p style={{ fontSize: "12px", textAlign: "center" }}>...Loading</p>
      ) : (
        isAsync &&
        showBtn && (
          <button
            style={{ padding: "0 10px", fontSize: "12px", color: "GrayText" }}
            disabled={inProgress || isError}
            onClick={() => loadMore && loadMore((prev) => prev + 1)}
          >
            Load More
          </button>
        )
      )}
    </components.MenuList>
  );

  const handleOnChange = (newValue: IOpt, actionMeta: ActionMeta<IOpt>) => {
    const { name } = actionMeta;
    setValue(newValue);
    onSelect(newValue, name);
  };

  useEffect(() => {
    if (prefillId && options) {
      const selectedOpt = options.find((option) => option.value === prefillId);
      if (selectedOpt) setValue(selectedOpt);
    }
  }, [options, prefillId]);

  return (
    <Select
      id="selectId"
      instanceId={"instanceId"}
      options={
        options && options.sort((a, b) => a.label.localeCompare(b.label))
      }
      components={{ DropdownIndicator, MenuList }}
      value={value}
      name={name}
      isClearable
      styles={selectStyles(isMenuOpen, value !== null, "100%")}
      placeholder={placeholder}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      onChange={(newValue, actionMeta) =>
        handleOnChange(newValue as IOpt, actionMeta)
      }
    />
  );
}
