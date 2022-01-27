
import React, { createRef, FC, KeyboardEvent, ChangeEvent } from 'react';

type SegmentedInputProps = {
  disabled: boolean;
  value: string;
  placeholder: string;
  length: number;
  onSubmit: () => void;
  setValue: (newValue: string) => void;
}

const SegmentedInput: FC<SegmentedInputProps> = ({
  disabled,
  value,
  placeholder,
  onSubmit,
  setValue,
}) => {
  const segmentRefs = [...Array(length)].map(() => createRef<HTMLInputElement>());

  const focusSegment = (segmentIndex: number) => {
    if (segmentRefs[segmentIndex]) {
      segmentRefs[segmentIndex].current.focus();
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { maxLength, value: segmentValue } = event.target;

    if (segmentValue.length >= maxLength) {
      if (index < length) {
        focusSegment(index + 1);
      }
    }

    const newValue = value.split('');
    newValue[index] = segmentValue;
    setValue(newValue.join());
  }

  const onKeyDown = (event: any, index: number) => {
    const { key, target: { value: segmentValue } } = event;
    if (key === 'Enter') {
      onSubmit();
    } else if (key === 'Backspace' && segmentValue.length === 0) {
      focusSegment(index - 1);
    }
  }

  return (
    <>
      {
        [...Array(length)].map((_, i) => (
          <div
            key={i}
            style={{
              width: `calc(${100 / length}% - 8px)`
            }}
          >
            <input
              type="text"
              maxLength={1}
              ref={segmentRefs[i]}
              placeholder={placeholder[i]}
              value={value[i]}
              tabIndex={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, i)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e, i)}
              disabled={disabled}
            />
          </div>
        ))
      }
    </>
  );

}


export { SegmentedInput };