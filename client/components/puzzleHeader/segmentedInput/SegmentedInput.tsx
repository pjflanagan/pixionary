
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState } from 'react';
import { sum } from 'lodash';

import Style from './style.module.scss';

type SegmentedInputProps = {
  disabled?: boolean;
  correctWord: string;
  onSubmit: (value: string) => void;
}

// TODO: show correctness on submit

const SegmentedInput: FC<SegmentedInputProps> = ({
  disabled,
  correctWord,
  onSubmit,
}) => {
  const characterCount = correctWord.replace(' ', '').length;
  const [value, setValue] = useState<string[]>([...Array(characterCount)]);
  const segmentRefs = [...Array(characterCount)].map(() => createRef<HTMLInputElement>());

  const focusSegment = (segmentIndex: number) => {
    if (segmentRefs[segmentIndex]) {
      segmentRefs[segmentIndex].current.focus();
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { maxLength, value: segmentValue } = event.target;

    if (segmentValue.length >= maxLength) {
      if (index < characterCount) {
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

  const renderGap = (i: number) => {
    return (
      <div
        className={Style.segment}
        key={`gap-${i}`}
        style={{
          maxWidth: `${100 / characterCount}%`
        }}
      />
    )
  }

  const renderInputSegment = (i: number) => {
    return (
      <div
        key={`char-${i}`}
        className={Style.segment}
        style={{
          maxWidth: `${100 / characterCount}%`
        }}
      >
        <input
          type="text"
          maxLength={1}
          ref={segmentRefs[i]}
          value={value && value[i] ? value[i] : ''}
          tabIndex={0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, i)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e, i)}
          disabled={disabled}
        />
      </div>
    )
  }

  const renderSegments = () => {
    const segments = [];
    let characterIndex = 0;
    const segmentCharacters = correctWord.split('');
    segmentCharacters.forEach((character, i) => {
      if (character === ' ') {
        segments.push(renderGap(i));
        return;
      }
      segments.push(renderInputSegment(characterIndex));
      ++characterIndex;
    });
    return segments;
  }

  return (
    <div className={Style.segmentHolder}>
      {renderSegments()}
    </div>
  );

}


export { SegmentedInput };