
import { FC, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { PromptElement } from 'elements';
import { DailyScore, DailyGamePhase, didFail } from 'models';
import { getRandomFromArray } from 'utils';

const START_PROMPTS = [
  'Are you ready?',
  'Ready to play?',
];

const GUESS_PROMPTS = [
  'Who is this?',
  'Do you know who this is?',
  'Who is in the pixture?'
];

const DRAW_PROMPTS = [
  'Can you draw?',
  `Let's draw!`,
  'Time to paint'
];

const REVEAL_CORRECT_PROMPT = [
  'Right on! It was:',
  'You got it!'
]

const REVEAL_INCORRECT_PROMPT = [
  `Sorry 'bout it. The picture was:`,
  `Sorry sport, it was:`
];

type PromptComponentProps = {
  gamePhase: DailyGamePhase;
  score: DailyScore;
}

const PromptComponent: FC<PromptComponentProps> = ({
  gamePhase,
  score
}) => {

  const [prompt, setPrompt] = useState({
    text: ' ',
    color: undefined
  });

  useEffectOnce(() => {
    setPrompt({
      text: getRandomFromArray(START_PROMPTS),
      color: undefined
    });
  });

  useEffect(() => {
    switch (gamePhase) {
      case DailyGamePhase.GUESS: // -------------- 1. GUESS
        setPrompt({
          text: getRandomFromArray(GUESS_PROMPTS),
          color: undefined
        });
        break;
      case DailyGamePhase.REVEAL: // -------------- 2. REVEAL
        setPrompt({
          text: didFail(score) ? getRandomFromArray(REVEAL_INCORRECT_PROMPT) : getRandomFromArray(REVEAL_CORRECT_PROMPT),
          color: didFail(score) ? 'red' : 'green',
        });
        break;
      case DailyGamePhase.STATS: // -------------- 3. STATS
        break;
      case DailyGamePhase.DRAW: // -------------- 4. DRAW
        setPrompt({
          text: getRandomFromArray(DRAW_PROMPTS),
          color: undefined
        });
        break;
      case DailyGamePhase.THANKS: // -------------- 5. THANKS
        setPrompt({
          text: `Thanks for playing! See you tomorrow!`,
          color: undefined
        });
        break;
    }
  }, [gamePhase, score])


  return (
    <PromptElement
      color={prompt.color}
      text={prompt.text}
    />
  )
}

export { PromptComponent };
