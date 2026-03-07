import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArrowDownIcon from '../../assets/icons/icon-arrow-down.svg?react';

const DropdownContainer = styled.div`
  position: relative;
  width: 80px;
  height: 34px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.28;
  font-weight: 500;
  color: ${({ $isOpen }) =>
    $isOpen ? 'var(--grayScale-60)' : 'var(--grayScale-40)'};

  background-color: var(--grayScale-10);
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? 'var(--grayScale-60)' : 'var(--grayScale-40)'};
  border-radius: 8px;

  &:focus-visible {
    outline: 2px solid var(--blue-50);
    outline-offset: 2px;
  }
`;

const SelectedValue = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArrowIcon = styled.span`
  flex-shrink: 0;
  width: 14px;
  height: 14px;

  svg {
    width: 100%;
    height: 100%;

    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s ease-in-out;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 38px;
  left: 0;

  padding: 4px 0;
  width: 100%;

  background-color: var(--grayScale-10);
  border: 1px solid var(--grayScale-30);
  border-radius: 8px;
  box-shadow: 0 4px 4px 0 rgba(140, 140, 140, 0.25);
`;

const DropdownOption = styled.li``;

const DropdownOptionButton = styled.button`
  padding: 6px 16px;
  width: 100%;
  font-size: 14px;
  line-height: 1.28;
  font-weight: 500;
  color: ${({ $selected }) =>
    $selected ? 'var(--blue-50)' : 'var(--grayScale-50)'};
`;

function Dropdown({
  options = [
    { label: '이름순', value: 'name' },
    { label: '최신순', value: 'recent' },
  ],
  value = 'name',
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        type="button"
        onClick={handleToggle}
        $isOpen={isOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <SelectedValue>{selectedOption.label}</SelectedValue>

        <ArrowIcon $isOpen={isOpen}>
          <ArrowDownIcon />
        </ArrowIcon>
      </DropdownButton>

      {isOpen && (
        <DropdownMenu role="listbox">
          {options.map((option) => (
            <DropdownOption>
              <DropdownOptionButton
                type="button"
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                $selected={value === option.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </DropdownOptionButton>
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
