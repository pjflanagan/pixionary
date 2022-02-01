
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState } from 'react';

import Style from './style.module.scss';
import { useCounter, useEffectOnce } from 'react-use';
import { ButtonElement, ButtonRowElement } from 'elements';

type GuessInputProps = {
  disabled?: boolean;
  correctWord: string;
  onCorrect: () => void;
  onIncorrect: () => void;
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
  onIncorrect
}) => {
  const characterCount = correctWord.replace(' ', '').length;
  const [value, setValue] = useState<string[]>([...Array(characterCount)]);
  const segmentRefs = [...Array(characterCount)].map(() => createRef<HTMLInputElement>());
  const [tries, { dec }] = useCounter(3);

  const initInvalidSegments = [...Array(characterCount)].fill(false);
  const [invalidSegments, setInvalidSegments] = useState(initInvalidSegments);

  useEffectOnce(() => {
    segmentRefs[0].current.focus();
  });

  const setInvalidSegment = (index: number, isInvalid: boolean) => {
    invalidSegments[index] = isInvalid;
    setInvalidSegments([...invalidSegments]);
  }

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
    const correctWordNoSpaces = correctWord.replaceAll(' ', '');
    if (correctWordNoSpaces.length !== value.length) {
      return false;
    }
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
    <>
      <div className={Style.inputHolder}>
        {renderSegments()}
      </div>
      <ButtonRowElement>
        <ButtonElement onClick={handleSubmit} label="Guess" type='primary' />
      </ButtonRowElement>
    </>
  );

}


export { GuessInput };