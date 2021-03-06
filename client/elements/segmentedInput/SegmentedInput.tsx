
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState, useEffect } from 'react';

import Style from './style.module.scss';
import { useEffectOnce, useSetState } from 'react-use';
import { ButtonElement, ButtonRowElement } from 'elements';
import classNames from 'classnames';

type Validity = 'error' | 'warn' | 'valid';

type GuessInputProps = {
  correctWord: string;
  onCorrect: () => void;
  onIncorrect: () => void;
  disabled: boolean;
}

// TODO: break this into <Segment /> and pass in data
const SegmentedInput: FC<GuessInputProps> = ({
  correctWord,
  onCorrect,
  onIncorrect,
  disabled,
}) => {
  const characterCount = correctWord.replace(' ', '').length;
  const [value, setValue] = useState<string[]>([...Array(characterCount)]);
  const segmentRefs = [...Array(characterCount)].map(() => createRef<HTMLInputElement>());
  const [isCorrect, setIsCorrect] = useState(false);

  const initInvalidSegments = [...Array(characterCount)].fill(false);
  const [invalidSegments, setInvalidSegments] = useState(initInvalidSegments);

  const [isErrorAnimation, setIsErrorAnimation] = useState(false);

  useEffectOnce(() => {
    segmentRefs[0].current.focus();
  });

  const setInvalidSegment = (index: number, isInvalid: boolean) => {
    invalidSegments[index] = isInvalid;
    setInvalidSegments([...invalidSegments]);
  }

  const validate = (): Validity => {
    const correctWordNoSpaces = correctWord.replaceAll(' ', '');
    let validity: Validity = 'valid';
    value.forEach((char, i) => {
      if (!char) {
        // if there is no character, don't penalize, just mark it an error
        setInvalidSegment(i, true);
        validity = 'warn';
      } else if (char.toUpperCase() !== correctWordNoSpaces[i].toUpperCase()) {
        setInvalidSegment(i, true);
        if (validity !== 'warn') {
          validity = 'error';
        }
      }
    });
    return validity;
  }

  const handleSubmit = () => {
    const validity = validate();
    if (validity === 'valid') {
      setIsCorrect(true);
      onCorrect();
    } else if (validity === 'error') {
      onIncorrect();
      setIsErrorAnimation(true);
    }
  }

  const focusSegment = (segmentIndex: number) => {
    if (segmentRefs[segmentIndex]) {
      segmentRefs[segmentIndex].current.focus();
    }
  }

  // Events

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

  // Render

  const renderGap = (i: number) => {
    return (
      <div
        className={Style.segment}
        key={`gap-${i}`}
        style={{
          width: '4px'
        }}
      />
    )
  }

  const renderInputSegment = (i: number) => {
    const segmentClassName = classNames(Style.segment, {
      [Style.victoryAnimation]: isCorrect
    });
    const inputClassName = classNames({
      [Style.correct]: isCorrect,
      [Style.invalid]: invalidSegments[i],
    });
    return (
      <div
        key={`char-${i}`}
        className={segmentClassName}
        style={{
          maxWidth: `${100 / characterCount}%`
        }}
      >
        <input
          type="text"
          maxLength={1}
          ref={segmentRefs[i]}
          value={value && value[i] ? value[i] : ''}
          className={inputClassName}
          tabIndex={0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, i)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e, i)}
          disabled={isCorrect || disabled}
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

  const className = classNames(Style.inputHolder, {
    [Style.invalidAnimation]: isErrorAnimation
  });

  return (
    <>
      <div className={className} onAnimationEnd={() => setIsErrorAnimation(false)}>
        {renderSegments()}
      </div>
      {
        !disabled && <ButtonRowElement>
          <ButtonElement onClick={handleSubmit} label="Guess" type='primary' />
        </ButtonRowElement>
      }

    </>
  );

}


export { SegmentedInput };