
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState } from 'react';

import Style from './style.module.scss';

type SegmentedInputProps = {
  disabled?: boolean;
  length: number;
  onSubmit: (value: string) => void;
}

const SegmentedInput: FC<SegmentedInputProps> = ({
  disabled,
  length,
  onSubmit,
}) => {
  const [value, setValue] = useState<string[]>([...Array(length)]);
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

    const newValue = [...value];
    newValue[index] = segmentValue;
    setValue(newValue);
  }

  const onKeyDown = (event: any, index: number) => {
    const { key, target: { value: segmentValue } } = event;
    if (key === 'Enter') {
      onSubmit(value.join(''));
    } else if (key === 'Backspace' && segmentValue.length === 0) {
      focusSegment(index - 1);
    }
  }

  return (
    <div className={Style.segmentHolder}>
      {
        [...Array(length)].map((_, i) => (
          <div
            key={i}
            className={Style.inputHolder}
            style={{
              maxWidth: `${100 / length}%`
            }}
          >
            <input
              type="text"
              maxLength={1}
              ref={segmentRefs[i]}
              placeholder='?'
              value={value && value[i] ? value[i] : ''}
              tabIndex={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, i)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e, i)}
              disabled={disabled}
            />
          </div>
        ))
      }
    </div>
  );

}


export { SegmentedInput };