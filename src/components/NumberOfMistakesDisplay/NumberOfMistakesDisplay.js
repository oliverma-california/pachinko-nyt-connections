import React from "react";
import { range } from "../../lib/utils";
import { Circle, CircleSlash } from "lucide-react";
import { MAX_MISTAKES } from "../../lib/constants";
import { GameStatusContext } from "../../providers/GameStatusProvider";

function SingleMistakeDisplay({ isUsed }) {
  return (
    <div>
      {isUsed ? (
        <CircleSlash className="h-8 w-8 mt-1 stroke-neutral-400" />
      ) : (
        <img className="h-8 w-8 mt-1" src="https://media.discordapp.net/attachments/666450605564493828/1242054363057229884/pachinkoball.png?ex=664c70c4&is=664b1f44&hm=36a7818b54a8b91ccaf9547dbf91372b629c51f5da6570cfd275c2e1fc79deeb&=&format=webp&quality=lossless&width=700&height=700" />
      )}
    </div>
  );
}

function NumberOfMistakesDisplay() {
  const { numMistakesUsed } = React.useContext(GameStatusContext);
  // array size of number of guess. [1, 2, 3, 4]
  const mistakeRange = range(MAX_MISTAKES);
  return (
    <div className="flex flex-row gap-x-4 justify-center">
      <p className="text-2xl text-white font-playfair">Mistakes Remaining: </p>
      {mistakeRange.map((el) => (
        <SingleMistakeDisplay key={el} isUsed={el < numMistakesUsed} />
      ))}
    </div>
  );
}

export default NumberOfMistakesDisplay;
