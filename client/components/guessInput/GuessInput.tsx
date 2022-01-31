
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState } from 'react';

import Style from './style.module.scss';
import { useEffectOnce } from 'react-use';

type GuessInputProps = {
  disabled?: boolean;
  correctWord: string;
  onCorrect: () => void;
  // TODO: onFail
}

// TODO: Show a guess count
// TODO: show a timer

/*

Remaining Guesses: 3         1:24

           _ _ _ _ _ _

*/

const GuessInput: FC<GuessInputProps> = ({
  disabled,
  correctWord,
  onCorrect,
  // onFail
}) => {
  const characterCount = correctWord.replace(' ', '').length;
  const [value, setValue] = useState<string[]>([...Array(characterCount)]);
  const segmentRefs = [...Array(characterCount)].map(() => createRef<HTMLInputElement>());

  const initInvalidSegments = [...Array(characterCount)].fill(false);
  const [invalidSegments, setInvalidSegments] = useState(initInvalidSegments);

  const setInvalidSegment = (index: number, isInvalid: boolean) => {
    invalidSegments[index] = isInvalid;
    setInvalidSegments([...invalidSegments]);
  }

  useEffectOnce(() => {
    segmentRefs[0].current.focus();
  });

  const validate = (): boolean => {
    const correctWordNoSpaces = correctWord.replaceAll(' ', '');
    let isValid = true;
    value.forEach((char, i) => {
      if (char.toUpperCase() !== correctWordNoSpaces[i].toUpperCase()) {
        setInvalidSegment(i, true);
        isValid = false;
      }
    });
    return isValid;
  }

  const handleSubmit = () => {
    if (validate()) {
      onCorrect();
    }
  }

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
    setInvalidSegment(index, false);
  }

  const onKeyDown = (event: any, index: number) => {
    const { key, target: { value: segmentValue } } = event;
    if (key === 'Enter') {
      handleSubmit();
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
          className={invalidSegments[i] ? Style.invalid : ''}
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
    // Info row
    <div className={Style.inputHolder}>
      {renderSegments()}
    </div>
    // Submit button
  );

}


export { GuessInput };