import React from "react";
import BaseModal from "../BaseModal";

import { generateEmojiGrid } from "../../../lib/game-helpers";
import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";
import winJpg from "../../../win.jpg";

function GameWonModal({ open, submittedGuesses }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title="You won the game!"
      initiallyOpen={open}
      showActionButton={false}
    >
      <p className="text-lg">{"Great job, share your results!"}</p>
      <div className="items-center content-center justify-center">
        {/* the whitespace: pre style makes the emoji grid appear with new lines character */}
        <img className="h-80" src={winJpg} />
        <p className="text-lg text-blue-800"><u><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Click here to claim your $10 Steam gift card as a reward for winning</a></u></p>
      </div>
    </BaseModal>
  );
}

export default GameWonModal;
