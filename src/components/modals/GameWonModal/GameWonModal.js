import React from "react";
import BaseModal from "../BaseModal";

import { generateEmojiGrid } from "../../../lib/game-helpers";
import ShareScoreButton from "../../ShareScoreButton";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle";
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";

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
        <img className="h-80" src="https://media.discordapp.net/attachments/666450605564493828/1242061603923558420/IMG_1415.jpg?ex=664c7782&is=664b2602&hm=ea3b4adbe4b036414cf05a532496ea6c14ee289a91e2d618912924d9d11fea95&=&format=webp&width=1052&height=1402" />
        <p className="text-lg text-blue-800"><u><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Click here to claim your $10 Steam gift card as a reward for winning</a></u></p>
      </div>
    </BaseModal>
  );
}

export default GameWonModal;
