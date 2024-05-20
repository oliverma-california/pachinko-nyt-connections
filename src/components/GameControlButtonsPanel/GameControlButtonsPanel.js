import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Shuffle, Undo, SendHorizontal } from "lucide-react";
import {
  isGuessCorrect,
  isGuessRepeated,
  shuffleGameData,
} from "../../lib/game-helpers";

import { GameStatusContext } from "../../providers/GameStatusProvider";
import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";

function GameControlButtonsPanel({
  shuffledRows,
  setShuffledRows,
  setGridShake,
}) {
  const {
    isGameOver,
    guessCandidate,
    setGuessCandidate,
    submittedGuesses,
    setSubmittedGuesses,
    solvedGameData,
    setSolvedGameData,
  } = React.useContext(GameStatusContext);
  const { gameData, categorySize } = React.useContext(PuzzleDataContext);
  const { toast } = useToast();

  function deselectAll() {
    setGuessCandidate([]);
  }

  function submitCandidateGuess() {
    // check that its a valid guess by size
    if (guessCandidate.length !== categorySize) {
      return;
    }
    // check that the guess hasnt already been submitted previously
    if (isGuessRepeated({ submittedGuesses, guessCandidate })) {
      toast({
        label: "Notification",
        title: "Repeated Guess",
        description: "You previously made this guess!",
      });

      return;
    }
    // add guess to state
    setSubmittedGuesses([...submittedGuesses, guessCandidate]);
    // check if the guess is correct
    const {
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
      correctImageSrc,
    } = isGuessCorrect({
      guessCandidate,
      gameData,
    });

    // if the guess is correct:
    // set it as solved in game data
    if (isCorrect) {
      setSolvedGameData([
        ...solvedGameData,
        {
          category: correctCategory,
          words: correctWords,
          difficulty: correctDifficulty,
          imageSrc: correctImageSrc,
        },
      ]);
      setGuessCandidate([]);
    } else {
      // Shake the grid to give feedback that they were wrong
      setGridShake(true);
      if (isGuessOneAway) {
        toast({
          label: "Notification",
          title: "Close Guess",
          description:
            "You were one guess away from correctly guessing a category!",
        });
      }
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        className="h-14 text-2xl bg-[url('https://t4.ftcdn.net/jpg/01/84/26/95/360_F_184269531_YBEiKECRlGl0Y6Gnwhb2pB1lLhCD0cVO.jpg')]"
        disabled={isGameOver}
        variant="secondary"
        onClick={() =>
          setShuffledRows(shuffleGameData({ gameData: shuffledRows }))
        }
      >
        <Shuffle className="h-8 w-8 mr-2" strokeWidth={1} />
        <p className="select-none font-sedan-sc">Shuffle</p>
      </Button>
      <Button
        className="h-14 text-2xl bg-[url('https://t4.ftcdn.net/jpg/01/84/26/95/360_F_184269531_YBEiKECRlGl0Y6Gnwhb2pB1lLhCD0cVO.jpg')]"
        size="deselectallsize"
        disabled={isGameOver}
        variant="secondary"
        onClick={deselectAll}
      >
        <Undo className="h-8 w-8 mr-2" strokeWidth={1} />
        <p className="select-none font-sedan-sc">Deselect All</p>
      </Button>
      <Button
        className="h-14 text-2xl bg-[url('https://t4.ftcdn.net/jpg/01/84/26/95/360_F_184269531_YBEiKECRlGl0Y6Gnwhb2pB1lLhCD0cVO.jpg')]"
        variant="submit"
        onClick={submitCandidateGuess}
        disabled={isGameOver || guessCandidate.length !== categorySize}
      >
        <SendHorizontal className="h-4 w-4 mr- stroke-black" strokeWidth={1} />
        <p className="select-none font-sedan-sc text-black">Submit</p>
      </Button>
    </div>
  );
}

export default GameControlButtonsPanel;
